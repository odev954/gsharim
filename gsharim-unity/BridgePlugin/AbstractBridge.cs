using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;
using System.Reflection;
using System.Threading.Tasks;

public class callFuncionArgs
{

    public callFuncionArgs(int id, string functionName, string[] args)
    {
        this.id = id;
        this.functionName = functionName;
        this.args = args;
    }
    public int id;
    public string functionName;
    public string[] args;
}

public class Response
{
    public int id;
    public string response;

    public Response(int id, string response)
    {
        this.id = id;
        this.response = response;
    }
}

public class UnityJsEvent
{
    public string eventName;
    public string data;
    public UnityJsEvent(string eventName, string data)
    {
        this.eventName = eventName;
        this.data = data;
    }
}

public class AbstractBridge : MonoBehaviour
{
#if UNITY_WEBGL && !UNITY_EDITOR
   [DllImport("__Internal")]
   public static extern void triggerJsEvent(string id, string message);
#endif

    public void sendMessageToJs(int id, string message)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
    triggerJsEvent(id.ToString(), message);
#endif
    }

    public void tiggerJsUnityEvent(string eventName, string message)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
    triggerJsEvent("trigger", JsonUtility.ToJson(new UnityJsEvent(eventName, message)));
#endif
    }

}

public class GenericBridge<T> : AbstractBridge
{
    [SerializeField] public T selectedGameObject;
    
    [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSplashScreen)]
    private void Awake()
    {
#if !UNITY_EDITOR && UNITY_WEBGL
        WebGLInput.captureAllKeyboardInput = false;
#endif
    }

    private void Start()
    {
        // send to js that the game has loaded
        string eventName = "ready";
        tiggerJsUnityEvent(eventName, "");
    }

    public async void callFuncion(string parameterJson)
    {
        callFuncionArgs args = JsonUtility.FromJson<callFuncionArgs>(parameterJson);
        string response = await (Task<string>)selectedGameObject.GetType().GetMethod(args.functionName).Invoke(selectedGameObject, args.args);
        sendMessageToJs(args.id, response);
    }
}
