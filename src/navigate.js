import {appdetails, sendToApp} from "./index";
import {routes} from "./routes";

function getRoute(route, params) {

    if(appdetails && appdetails.type) {
        const app = appdetails.type;
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
                _route.replace(`:${key}`, value);
            }
            return {route: _route, params: params};
        }
    }
}

export default {
    navigate: function(route, params) {
        return sendToApp("navigate", getRoute(route, params));
    },

    back: function() {
        return sendToApp("back");
    },

    /**
     * @param newsId string | number legacy apps use ID's the other ones use UUID's
     * @param replace boolean When setting replace to true the current view will be replaced with the new view
     */
    news: function(newsId, replace = false) {
        return this.navigate('news', { id: newsId, replace: replace });
    },

    /**
     * @param categoryId string | number legacy apps use ID's the other ones use UUID's
     * @param replace boolean When setting replace to true the current view will be replaced with the new view
     */
    newslist: function(categoryId, replace = false) {
        return this.navigate('newslist', { id: categoryId, replace: replace });
    },

    /**
     * @param eventId string | number legacy apps use ID's the other ones use UUID's
     * @param replace boolean When setting replace to true the current view will be replaced with the new view
     */
    event: function(eventId, replace = false) {
        return this.navigate('news', { id: eventId, replace: replace });
    }
}