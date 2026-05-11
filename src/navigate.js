import {getAppDetails, sendToApp} from "./index";
import {routes} from "./routes";

function getRoute(route, params) {
	params = params || {}

    if(getAppDetails()?.type) {
        const app = getAppDetails().type;
        if(!routes[app]){
            throw new Error(`Unsupported app [${app}]`);
        }
        if(!routes[app][route]){
            throw new Error(`Route [${route}] does not exist`);
        }
        let _route = routes[app][route];
        if(app === "app-legacy") {
            return {route: _route, params: params};
        } else {
            for(let [key, value] of Object.entries(params)) {
                _route = _route.replace(`:${key}`, value);
            }
            return {route: _route, params: params};
        }
    }
}

export default {
    push: function(route, params) {
        return sendToApp("navigate", getRoute(route, params));
    },

    replace: function(route, params) {
        return sendToApp("navigate", {...getRoute(route, params), replace: true});
    },

    back: function() {
        return sendToApp("back");
    },
}