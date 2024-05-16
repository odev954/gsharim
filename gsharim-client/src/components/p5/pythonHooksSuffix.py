import inspect
while True:
    function_call_object = await __get_awaiting_function_call__()
    function_call_object = function_call_object.to_py()
    function_name, args = function_call_object["functionName"], function_call_object["args"]
    function = None
    # first try to access a local function defined by the user
    if function_name in locals():
        function = locals()[function_name]   
    # try to access an api function
    elif function_name in globals():
        function = globals()[function_name]   
    # try to access a builtin function
    elif hasattr(globals()["__builtins__"], function_name):
        function = getattr(globals()["__builtins__"], function_name)
    else:
       raise NameError(f"could not find the function: {function_name}")    
    return_value = function(*args)
    if inspect.isawaitable(return_value):
        return_value = await return_value
    await __resolve_current_function_call__(return_value)
    
