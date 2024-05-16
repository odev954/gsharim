class JsProxy:
        def __instancecheck__(self, __instance):
            return False
# this is a mock the the module JsProxy
