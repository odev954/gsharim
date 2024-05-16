mergeInto(LibraryManager.library, {
    // both id and message needs to be strings
    triggerJsEvent: function(id, message){
        const event = new CustomEvent("unityEvent:"+Pointer_stringify(id), {detail: Pointer_stringify(message)})
        document.dispatchEvent(event)
    }
})
