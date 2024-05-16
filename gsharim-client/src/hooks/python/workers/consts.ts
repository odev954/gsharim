export const CodePostString = `
for name in dir():
    if not name.startswith('_'):
        del globals()[name]
`;

export const handleInputPythonCode = `
import sys
import inspect
from tmp import input as user_input_function 
from pyodide.ffi import JsProxy
class NewStdinStream:
    async def readline(self):
        return await user_input_function()
sys.stdin = NewStdinStream()
async def input(text=None):
    if text is not None:
        print(text)
    redline = sys.stdin.readline
    if inspect.iscoroutinefunction(redline) or isinstance(redline, JsProxy):
        return_value = await redline()
    else:
        return_value = redline()
    return return_value
del NewStdinStream
`;

export const SetLineNumber = "SetLineNumber";

export const pyodideUrl = "/pyodide/";
