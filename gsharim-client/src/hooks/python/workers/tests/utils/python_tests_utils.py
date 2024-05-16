import asyncio
import ast 
import functools
import sys 
from . import pyodide


RUN_USER_CODE = "../pythonCode/run_user_code.py"

def add_mock_pydodie_module():
    sys.modules["pyodide"] = pyodide

add_mock_pydodie_module()

def wrap_code_with_async_function(code):
    ast_tree = ast.parse(code)
    ast_body = ast_tree.body
    wrapper_function_args = ast.arguments(posonlyargs=[], args=[], kwonlyargs=[], kw_defaults=[], defaults=[])
    wrapper_function = ast.AsyncFunctionDef(name="__run_code_asynclly__", args=wrapper_function_args, decorator_list=[], body=ast_body)
    wrapper_function.lineno = ast_body[0].lineno
    wrapper_function.col_offset = ast_body[0].col_offset
    ast_tree.body = [wrapper_function]
    return ast_tree

@functools.cache # this makes it that this function will memorize input,output pairs and orevent reloading the file every time
def load_ast_from_file():
    file_name = RUN_USER_CODE
    with open(file_name, "r") as f:
        code =  f.read()
        return wrap_code_with_async_function(code)

def create_globals(code, verbose_delay=None,auto_await=True, wait_delay_function = lambda *args: None, prefix=None, suffix=None):
    """
    this function creates the globals dict needed to run the code of RUN_USER_CODE_AUTO_AWAIT and RUN_USER_CODE.
    """
    variables_dict = {}
    state_dict = {
        "current_line": None
    }

    def set_current_line(line):
        state_dict["current_line"] = line

    variables_dict["auto_await"] = auto_await
    variables_dict["user_prefix"] = prefix
    variables_dict["user_suffix"] = suffix
    variables_dict["code_to_run"] = code
    variables_dict["verbose_delay"] = verbose_delay
    variables_dict["__waitDelay__"] = wait_delay_function
    variables_dict["__UsePythonSetLineNumber__"] = set_current_line

    return variables_dict, state_dict

def use_run_user_code(user_code, auto_await=True, verbose_delay=None, wait_delay_function = lambda *args: None, prefix=None, suffix=None):
    run_use_code = load_ast_from_file()
    global_variables, state_dict = create_globals(user_code, verbose_delay,auto_await, wait_delay_function, prefix, suffix)
    compiled_code = compile(run_use_code, filename="<ast>", mode="exec")
    exec(compiled_code, global_variables)
    run_code = lambda : asyncio.run(global_variables["__run_code_asynclly__"]())
    return run_code, state_dict
    


if __name__ == '__main__':
    run_code, state_dict = use_run_user_code("print(123)")
    run_code()
