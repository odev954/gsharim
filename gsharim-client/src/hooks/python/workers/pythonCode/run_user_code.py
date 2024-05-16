import ast
import json

class PythonRunException(Exception):
    """
    this is a regular exception, it exists because raising a basic exception is bad practice.
    """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

class InsertAwaitBeforeInput(ast.NodeTransformer):
    call_function_code = '''
import inspect
from pyodide.ffi import JsProxy
import traceback
import types
def __call_function__(func, *args):
    line_number = inspect.getframeinfo(inspect.currentframe().f_back).lineno
    # this is a function added by pythonRunner.worker, it sends a message to the hook "usePython" to set the current active line
    __UsePythonSetLineNumber__(line_number)
    try:
        return_value =  func(*args)
        if isinstance(return_value, JsProxy):
                return_value = return_value.to_py()
        return return_value
    except Exception as e:
        if(e.__traceback__.tb_next is not None):
            raise e
        # removing the "__call_function__.locals()." from the error message if needed
        if str(e).startswith("wrapped_code.<locals>"):
            error_message = ".".join(str(e).split(".")[2:])
        else:
            error_message = str(e)
        tb = types.TracebackType(None, e.__traceback__.tb_frame, e.__traceback__.tb_lasti, traceback.extract_stack()[-2].lineno)
        raise Exception(error_message).with_traceback(tb)
'''
    def __init__(self):
        super().__init__()
        self.call_function_code_ast = ast.parse(self.call_function_code)
        self.call_function_ast = self.call_function_code_ast.body[-1]

    def visit_Call(self, node):
        self.generic_visit(node)
        if isinstance(node.func, ast.Name) and node.func.id == "input":
            return ast.Await(value=node)
        call_name_ast = ast.Name(id=self.call_function_ast.name, ctx=ast.Load())
        call = ast.Call(func=call_name_ast, args=[node.func, *node.args], keywords=[])
        return call

    def fix_code(self, parsed_code):
        fixed_code = self.visit(parsed_code)
        fixed_code.body = self.call_function_code_ast.body + fixed_code.body
        return fixed_code

class CodeVerboseAdder(ast.NodeTransformer):
    def __init__(self, delay):
        """
        This class addes the verbose mode by making different nodes in the code wait a given amount of time.
        the function __waitDelay__ is injected from js, and waits a given amount of ms.
        By addimng calls to this function, we make the code pause in desired locations, and becuase it is a function call, the next ast.NodeTransofrmer
        will add a call there that will tell send a message to the hook usePython at which line we are.
        by contrilling the lineno of these calls we can make the code pause and highlight each line.
        This code also makes sure that "complicated lines" will not wait twice.
        """
        super().__init__()
        self.delay = delay
        self.wrap_iterator_code = """
def __add_ignore_set_current_line__(func):
    func.__ignore_set_current_line__ = True
    return func

async def __wrap_iterrator_with_function__(iterator, func, ignore_first):
    is_first = True
    for value in iterator:
        if not (is_first and ignore_first):
            await func()
        is_first = False
        yield value
"""
    def fix_code(self, node):
        """
        This function addes the functions __add_ignore_set_current_line__ and __wrap_iterrator_with_function__ to the body of the code to be used inside.
        """
        fixed_code = self.visit(node)
        fixed_code.body = ast.parse(self.wrap_iterator_code).body + fixed_code.body
        return fixed_code

    def fix_imports(self, node):
        self.generic_visit(node)
        function_call = ast.Call(func=ast.Name("__waitDelay__", ctx=ast.Load()), args=[ast.Constant(value = self.delay)], keywords=[])
        function_call.lineno = node.lineno
        delay_node = ast.Expr(function_call)
        delay_node.lineno = node.lineno
        return [delay_node , node]

    def visit_Import(self, node):
        return self.fix_imports(node)

    def visit_ImportFrom(self, node):
        return self.fix_imports(node)

    def visit_Assign(self, node):
        return self.statement_visit(node)

    def visit_Return(self, node):
        return self.statement_visit(node)

    def statement_visit(self, node):
        """
        add a call to __waitDelay__ before this statement, but if the statement has a function call inside, don't.
        """
        self.generic_visit(node)
        if self.has_call_child(node):
            return node
        function_call = ast.Call(func=ast.Name("__waitDelay__", ctx=ast.Load()), args=[ast.Constant(value = self.delay)], keywords=[])
        function_call.lineno = node.lineno
        delay_node = ast.Expr(function_call)
        delay_node.lineno = node.lineno
        return [delay_node, node]

    def visit_Expr(self, node):
        """
        expression is like a statemnet, but returns a value, like a function call.
        wrap it with a subscript.
        """
        self.generic_visit(node)
        if self.has_call_child(node): # we don't want to wait twice if this is an expression that has a function call inside of it
            return node
        subscript = self.wrap_in_subscript(node.value)
        new_expression = ast.Expr(value=subscript)
        new_expression.lineno = node.lineno
        return new_expression

    def visit_Call(self, node):
        self.generic_visit(node)
        return self.wrap_in_subscript(node)

    def visit_If(self, node):
        """
        wrap the condition with a call to __waitDelay__.
        If the there is an else statement, add to the else statement a delay as well.
        """
        self.generic_visit(node)
        node_with_wrapped_condition = self.wrap_condition(node)
        # if there is an elseif that means that there is a condition, and that means that a __waitDelay__ will be added there allready
        if len(node.orelse) > 0 and not isinstance(node.orelse[0], ast.If):
            function_call = ast.Call(func=ast.Name("__waitDelay__", ctx=ast.Load()), args=[ast.Constant(value = self.delay)], keywords=[])
            function_call.lineno = node.orelse[0].lineno - 1
            function_call_expression = ast.Expr(value = function_call)
            function_call_expression.lineno = node.orelse[0].lineno - 1
            node.orelse = [function_call_expression] + node.orelse
        return node_with_wrapped_condition

    def visit_While(self, node):
        """
        wrap the condition with a wait, this way every time it is checked the code will stop and wait there.
        """
        self.generic_visit(node)
        return self.wrap_condition(node)

    def visit_For(self, node):
        """
        This functions is a bit complicated
        The way a foor loop works, is it gets and iterator, and does an iteration for each value in the iterator.
        We want to add a call to the wait function at each iterator iteration.
        When we add a call to a function, the next ast.NodeTransformer will add a call there that will send to the hook usePython
        that we are at the current line.
        If we add the attribute __ignore_set_current_line__ to the function, it will not tell the ide the current line.
        We created a helper function that creates a new iterator that calls the wait function before yielding the values from the previous iterator.
        Now the new iterator is async, so we transform the for loop to an async foor loop.
        To make the wait function highlight the current line in the foor lop and not the line in the helper function,
        we pass a function that is defined locally, and has the smae lineno as the for loop, and that function calls the wait.
        This function has the attribute of __ignore_set_current_line__, so when it is called in the helper function it will not tell it to change the current
        line number to the line number in the helper function.
        """
        self.generic_visit(node)

        wait_delay_function = ast.Name("__waitDelay__", ctx=ast.Load())
        wait_delay_args = [ast.Constant(value=self.delay)]
        wrapper_function = ast.Name("__wrap_iterrator_with_function__", ctx=ast.Load())
        empty_args = ast.arguments(posonlyargs=[], args=[], kwonlyargs=[], kw_defaults=[], defaults=[])
        inline_function_body_expr = ast.Expr(value=ast.Call(wait_delay_function, args=wait_delay_args))
        inline_function = ast.AsyncFunctionDef(name="__call_waitDelay_here__",
            args=empty_args,
            body=[inline_function_body_expr],
            decorator_list=[
                ast.Name(id="__add_ignore_set_current_line__", ctx=ast.Load())
            ],
          )
        inline_function.lineno = node.lineno
        ignore_first = ast.Constant(value=self.has_call_child(node.iter))
        new_iter = ast.Call(wrapper_function, args=[node.iter, ast.Name("__call_waitDelay_here__", ctx=ast.Load()), ignore_first])

        wrapped_iterator = new_iter
        target = node.target
        body = node.body
        orelse = node.orelse
        new_for_node = ast.AsyncFor(target=target, iter=wrapped_iterator, body=body ,orelse=orelse)
        new_for_node.lineno = node.lineno
        return [inline_function, new_for_node]

    def visit_Continue(self, node):
        return self.statement_visit(node)

    def visit_Break(self, node):
        return self.statement_visit(node)

    def has_call_child(self, node):
        """
        returns if a node has a child with a function call or not.
        used to determind if some nodes need to wait or not, becuase if they have a child
        which is a function call, then it will wait and there is not need to wait twice.
        """
        if isinstance(node, ast.Call):
            return True
        for child in ast.iter_child_nodes(node):
            if(self.has_call_child(child)):
                return True
        return False

    def visit_FunctionDef(self, node):
        # this is because we cannot add async calls to build-in functions because they are not async :(
        should_visit_function = not (node.name.startswith("__") and node.name.endswith("__"))
        if should_visit_function:
            self.generic_visit(node)
        return node

    def wrap_in_subscript(self, node):
        """
        take a node that has a value, and return
        [__waitDelay__(), value][1]
        this creates a new node, which has the smae propeties and values as the original node, but every time it is computed, it will make the code wait.
        """
        function_call = ast.Call(func=ast.Name("__waitDelay__", ctx=ast.Load()), args=[ast.Constant(value = self.delay)], keywords=[])
        function_call.lineno = node.lineno
        subscript = ast.Subscript(value=ast.List(elts=[function_call, node], ctx=ast.Load()), slice=ast.Constant(value=1), ctx=ast.Load())
        subscript.lineno = node.lineno
        return subscript

    def wrap_condition(self, node):
        """
        takes a condition and returns
        __waitDelay__() || conditions, which has the smae properties as the original conditions, becuase the function __waitDelay__() returns None.
        but every time the condition is computed, the code will stop and wait.
        """
        condition = node.test
        new_condition = self.wrap_in_subscript(condition)
        node.test = new_condition
        return node

class AwaitRemover(ast.NodeTransformer):
    def visit_Await(self, node):
        return node.value

class AutoAwaitAdder(ast.NodeTransformer):
    set_current_line_call_function_code = '''
import inspect
from pyodide.ffi import JsProxy
import traceback
import types
async def __call_function__(func,update_current_line, *args):
    line_number = inspect.getframeinfo(inspect.currentframe().f_back).lineno
    # this is a function added by pythonRunner.worker, it sends a message to the hook "usePython" to set the current active line
    if update_current_line and not hasattr(func, '__ignore_set_current_line__'):
        __UsePythonSetLineNumber__(line_number)
    try:
        if inspect.iscoroutinefunction(func) or isinstance(func, JsProxy):
            return_value = await func(*args)
            if isinstance(return_value, JsProxy):
                return_value = return_value.to_py()
        else:
            return_value = func(*args)
        return return_value
    except Exception as e:
        if(e.__traceback__.tb_next is not None):
            raise e
        # removing the "__call_function__.locals()." from the error message if needed
        if str(e).startswith("wrapped_code.<locals>"):
            error_message = ".".join(str(e).split(".")[2:])
        else:
            error_message = str(e)
        tb = types.TracebackType(None, e.__traceback__.tb_frame, e.__traceback__.tb_lasti, traceback.extract_stack()[-2].lineno)
        raise Exception(error_message).with_traceback(tb)
'''

    def __init__(self, update_use_python_current_line=True):
        super().__init__()
        self.update_use_python_current_line = update_use_python_current_line
        self.call_function_code_ast = ast.parse(self.set_current_line_call_function_code)
        self.call_function_ast = self.call_function_code_ast.body[-1]

    # wrap function call with the function __call_function__
    def visit_Call(self, node):
        self.generic_visit(node)
        call_name_ast = ast.Name(id=self.call_function_ast.name, ctx=ast.Load())
        update_current_line = ast.Constant(value=self.update_use_python_current_line) # this option allows for later features to run the ast modifier on code that will not update the current line in the hook usePython
        call = ast.Call(func=call_name_ast, args=[node.func, update_current_line, *node.args], keywords=[])
        return ast.Await(value=call)

    def visit_FunctionDef(self, node):
        self.generic_visit(node)
        if node.name.startswith("__") and node.name.endswith("__"):
            return node
        new_node = ast.AsyncFunctionDef(name=node.name,
                                        args=node.args,
                                        body=node.body,
                                        decorator_list=node.decorator_list)
        return new_node

    def fix_code(self, parsed):

        fixed_code = self.visit(parsed)
        fixed_code.body = self.call_function_code_ast.body + fixed_code.body
        return fixed_code

def fix_code(code):
    parsed = ast.parse(code)
    if auto_await:
        if verbose_delay is not None:
            verbose_adder = CodeVerboseAdder(verbose_delay)
            verbose_adder.fix_code(parsed)

        await_remover = AwaitRemover()
        await_remover.visit(parsed)

        code_fixer = AutoAwaitAdder()
        fixed_code = code_fixer.fix_code(parsed)
    else:
        fixed_code = InsertAwaitBeforeInput().fix_code(parsed)

    # put fixed_code in a func
    args = ast.arguments(args=[],
                            defaults=[],
                            kw_defaults=[],
                            kwarg=None,
                            kwonlyargs=[],
                            posonlyargs=[],
                            vararg=None
                            )
    new_function_body = fixed_code.body
    if user_prefix is not None:
        new_function_body = ast.parse(user_prefix).body + new_function_body
    if user_suffix is not None:
        new_function_body = new_function_body + ast.parse(user_suffix).body
    new_function = ast.AsyncFunctionDef("wrapped_code", args=args, body=new_function_body, decorator_list=[])
    fixed_code.body = [new_function]
    ast.fix_missing_locations(fixed_code)
    return fixed_code


async def main():
    exception = None
    try:
        code_ast = fix_code(code_to_run)
        compiled_code = compile(code_ast, filename="<ast>", mode="exec")
        exec(compiled_code, globals())
        await globals()["wrapped_code"]()

    except SyntaxError as e:
        # if the end_offset is unknown, them mark the entire line.
        end_offset = e.end_offset if e.end_offset > e.offset else -1
        exception = json.dumps({
           "lineno": e.lineno,
            "end_lineno": e.end_lineno,
            "offset": e.offset,
            "end_offset": end_offset,
            "msg": e.msg
        })
    except Exception as e:
        stack_trace = e.__traceback__
        while stack_trace.tb_next is not None:
            stack_trace = stack_trace.tb_next
        exception_line = stack_trace.tb_lineno
        exception = json.dumps({
            "lineno": exception_line,
            "end_lineno": exception_line,
            "offset": 1,
            "end_offset": -1, # this means that the error is until the end of the line
            "msg": str(e)
        })
    if(exception is not None):
        raise PythonRunException(exception)

await main()

