import navigate from "./navigate";

export {default as navigate} from "./navigate";

let app_details = {
    type: "app-legacy"
}

const _pending = {};

function _generateId() {
    try {
        return crypto.randomUUID();
    } catch (_) {
        return Math.random().toString(36).slice(2) + Date.now().toString(36);
    }
}

export function sendToApp(type, params) {
    const message = {type, ...params};

    // Mobile: flutter_inappwebview handler (returns Promise)
    if (window.flutter_inappwebview) {
        return window.flutter_inappwebview.callHandler('BundelingBridge', JSON.stringify(message));
    }

    // Legacy: cordova bridge (fire-and-forget)
    const cordovaTarget = window['cordova_iab'] ??
        window['webkit']?.messageHandlers?.['cordova_iab'];
    if (cordovaTarget) {
        cordovaTarget.postMessage(JSON.stringify(message));
        return Promise.resolve();
    }

    // Web/iframe: postMessage with correlation ID
    const id = _generateId();
    message._id = id;

    return new Promise((resolve) => {
        _pending[id] = resolve;
        window.parent.postMessage(message, "*");
    });
}

// Listen for correlation responses (web/iframe mode)
window.addEventListener("message", function (e) {
    if (e.data?._id && _pending[e.data._id]) {
        const resolve = _pending[e.data._id];
        delete _pending[e.data._id];
        resolve(e.data.result);
    }
});

// Request app details on init
sendToApp("getAppDetails").then((result) => {
    if (result) {
        try {
            const details = typeof result === 'string' ? JSON.parse(result) : result;
            setAppDetails(details);
        } catch (e) {
            // Ignore parse errors
        }
    }
});

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
