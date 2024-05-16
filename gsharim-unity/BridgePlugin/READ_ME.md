# how to use the Bridge plugin

## the unity side
1. add the bridge plugin to your plugins folder.
2. create a new bridge class that inherits from GenericBridge where its generic is the GameObject the bridge should use to call functions.
3. create a new empty GameObject that is called bridge, and add you custome script to it.
4. add to the bridge gameObject your game manager as the target.
5. the functions that can be called from the bridge must be async, that accepts only strings or nothing and return a string.
Note that if you do not want to return a string or accept a string, just use JSON.
6. if you want to send data to the browser without being an answer to something, you can use the function tiggerJsUnityEvent of the bridge.
7. after the game has loaded and the splash screen has been displayed, unity weill send a custome event called "ready" using the event "unityEevent:trigger".
8. you are done !

# very important note ! 
becuase the brdige is working using reflection, we must add 
using UnityEngine.Scripting;
to the code maneger the bridge will access and add the anotation [Preserve] to the class and functions.
That is because we want unity to preserve their types so we can access them using reflection.
Becuse during the compilation process, unity strips code that is not nessesary, and that includes type information, which
we need for reflection.

when calling a function from the brige, it will call the desired function with the desired parameters, and then await for the answer, when done, it will send a response back to js.
the response will contain the id of the query and the return value from the function.




