import navigate from "./navigate";

export {default as navigate} from "./navigate";

const allowed_origins = [
    "undefined",
    "web.bundeling.com",
    "web.bundeling-staging.com",
]

let app_details = {
    type: "app-legacy"
}

export function sendToApp(type, params) {
    const message = {type, ...params};

    const target = getTarget();

    if (typeof window.BundelingBridge !== 'undefined') {
        target.postMessage(JSON.stringify(message));
    } else if (window['cordova_iab'] ??
        (window['webkit']?.messageHandlers?.['cordova_iab'] ?? false)) {
        target.postMessage(JSON.stringify(message));
    } else {
        target.postMessage(message);
    }

}

function registerListener(callback) {
    getTarget().addEventListener("message", function (e) {
        if (!allowed_origins.includes(e.origin)) {
            return;
        }

        if (e.data?.type && e.data.type === "appdetails") {
            setAppDetails(e.data);
        }
    });

    if (typeof callback === 'function') {
        callback();
    }
}

function getTarget() {
    return typeof window.BundelingBridge !== 'undefined' ? window.BundelingBridge :
        window['cordova_iab'] ??
        window['webkit']?.messageHandlers?.['cordova_iab'] ??
        window.parent;
}

registerListener(function () {
        sendToApp("getAppDetails");
    }
)

export function openFile(url) {
    return sendToApp("openfile", {href: url});
}

export function shareUrl(url) {
    return sendToApp("shareurl", {href: url});
}

export function openUrl(url) {
    return sendToApp("openurl", {href: url});
}

export function alert(title, content) {
    return sendToApp("rawmodal", {title, content});
}

export function toast(title, content) {
    return sendToApp("rawtoast", {title, content});
}

export function getAppDetails() {
    return app_details;
}

export function setAppDetails(details) {
    app_details = details;
}

export default {
    navigate: navigate,
    openFile: openFile,
    shareUrl: shareUrl,
    openUrl: openUrl,
    alert: alert,
    toast: toast
}