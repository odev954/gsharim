
this file explains how the hook usePython works, and the design choices.

# The hook usePython:
The hook manages a webworker that runs the python on a different thread.
This is done this way because we do not want the python and the ui to run on the same thread,
because then an infinite loop or a long run of python would stop the ui.

When restarting the interpreter the webworker is terminated and a new one is initiated.

The webworker and the hook on the main thread communicate using messages.
The first message that the worker accepts is the setup message, only after the webworker processes the first message,
it can accept new messages that are used to run the code.

The first message tells the webworker what is the api, and if the webworker should implement auto-await.

# The webworker:
The webworker runs python using the package pyodide.
This package contains the Cpython interpreter that has been compiled to web-assembly, plus some add ons.

On set-up the webworker initiates the interpreter and parses the api, and creates a JS modules with entries
corresponding to the API functions.
Each of these functions simply sends the main thread what function has been called, and the arguments.
It sends this using a MessageChannel, and waits for the response.

The hook usePython on the main thread answers by running the function from the API and sending back the results to the
web worker.

The JS module is then compiled to python and added to the global scope of the interpreter.

The set-up contains the creation of a prefix code, which imports the added module, and adds to the global scope all the attributes from that module.
These attributes are proxies to the js function that sends the message to the main thread and waits for the response.

A part of the prefix is to override the function input, which works based on the sys.stdin, which is also overridden.
Important note: input is now an async function

A suffix for the code is defined, this suffix deletes all the existing variables from the global scope, and it is run after the code from the user had stopped running.

# Running code:

The prefix is run, and then the global variable code_to_run is set to the code from the user.
(In the scope of the python interpreter)
the code that parses and run the user (on the python side) is in the file 
"pythonCode/run_user_code.py"
this code is the ones that is run, it parses the user code using ast and then runs the modified code.
This modified code adds some functionality, like telling the usePython hook what is the current running line, adding syntax callbacks, adding automatic awaits before function calls (depends on the flags it is given)

## Importanet Note: !!!!!!!
If you are using the flag autoAwait, it doesn't apply on built-in functions.
Meaning that every functions that begins with __ and ends with __ will not be effected.
Meaning, that you cannot use API calls from these functions, for example, 
def __init__ of a class, can not use a JS function from the api, like "wait"
so this code:
class A:
    def __init__(self):
        wait(1000)
will do nothing.
And because the flag means that every await call is ignored, then even:

class A:
    def __init__(self):
        await wait(1000)

will not work (and you cannot call await inside a non-async function)

This is implemented this way, because built-in function can not be async.
async __init__ will not work.

side-note: if you really need to call and API call from a builtin function, 
you can call without await, but notice that the python code will not await or return a result.
If you are only interested in the side-effect of the API call, and you do not want the python code to wait for the answer, then you can call API functions.
Like a POST request, or send a log, etc ...

# verbose mode 
This mode is used by passing verboseDelay as a number instead of undefined.
This makes the code add a call to a delay function before each line, (works using ast)
the delay function is then parsed by a second ast.NodeTransformer that tells the ide what is the current line.
Because the call are added using ast and not editing the code itself, then they have the same line number as each line (expression, statement, for loop, while loop, condition, etc...).
This delay makes the code run much slower (it pauses after each line), but is useful for debugging and understanding the code.

# prefix and suffix 
The code adds the suffix and the prefix as is, meaning that their ast is not parsed at all.
The prefix is added to the start of the function wrapped_code and the suffix is added to the end.
The prefix will run before the user code and the suffix will run after the user code.
Note that the prefix and suffix the user supplies are different then the ones the worker adds.
The structure of the code is:
 - webWorker prefix
 - user prefix -> un-modified
 - modified user code
 - user suffix -> un-modified
 - webWorker suffix
The user prefix and suffix are not modified to allow for complete control over the code.
This means that a few things should be done differently in the prefix and suffix.
Auto-await is not added, meaning all api calls should be awaited manually, and input is an api call, and so 
Using the input function should be awaited too.
Because the prefix and suffix are un-modified, the code there will not change the current running line.

Meaning, if a function is defined in the prefix and is used in the user code, the user will experience it as 
an api function, except the IDE will not register it in the api-hits, unless manually added there too.


# syntax callbacks
The syntax callbacks is code that will be inserted based on situations.
If syntax callbacks is used, the verbose mode is enabled automatically.
each syntax callback is a code for a function that will be called based on the type of syntax.
For example, the syntax callback onAssign will be called every time the user will use an assignment in the code.
And onImport will be called every time the user uses an import.
This can be used for an unlimited amount of usecases.
If the syntax callback onImport is set to be "exit()" then the code will exit after 
each import, meaning that it blocks the user from using imports

## Important note about verbose mode:
Verbose mode does'nt work without auto-await mode.
It doesn't make sense to await on every line but not await on async calls.
