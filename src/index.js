import navigate from "./navigate";

export {default as navigate} from "./navigate";

const allowed_origins = [
    "undefined",
    "web.bundeling.com",
    "web.bundeling-staging.com",
];

let app_details = {
    type: "app-legacy"
};

// Pending request correlation for hosts that reply via postMessage
// (Flutter web shell). Maps `_id` → resolver callback.
const pendingRequests = new Map();
let nextRequestId = 0;
const REQUEST_TIMEOUT_MS = 30000;

function generateRequestId() {
    return `sdk-${Date.now()}-${nextRequestId++}`;
}

export function sendToApp(type, params) {
    const message = {type, ...params};

    // Flutter mobile webview: bridge handler returns a Promise that resolves
    // with the handler's result (e.g. { success: true, data: {...} }).
    if (window.flutter_inappwebview) {
        return window.flutter_inappwebview.callHandler('BundelingBridge', JSON.stringify(message));
    }

    const target = getTarget();

    // Legacy native bridge — fire-and-forget.
    if (typeof window.BundelingBridge !== 'undefined') {
        target.postMessage(JSON.stringify(message));
        return null;
    }

    // Cordova InAppBrowser bridge — fire-and-forget.
    if (window['cordova_iab'] ?? (window['webkit']?.messageHandlers?.['cordova_iab'] ?? false)) {
        target.postMessage(JSON.stringify(message));
        return null;
    }

    const id = generateRequestId();
    message._id = id;

    const promise = new Promise((resolve) => {
        const timeout = setTimeout(() => {
            if (pendingRequests.has(id)) {
                pendingRequests.delete(id);
                resolve(undefined);
            }
        }, REQUEST_TIMEOUT_MS);

        pendingRequests.set(id, (response) => {
            clearTimeout(timeout);
            resolve(response);
        });
    });

    target.postMessage(message, "*");

    return promise;
}

function registerListener(callback) {
    window.addEventListener("message", function (e) {
        const data = e.data;

        // Modern request/response: resolve the matching pending request.
        if (data && typeof data === 'object' && typeof data._id === 'string' && pendingRequests.has(data._id)) {
            const resolve = pendingRequests.get(data._id);
            pendingRequests.delete(data._id);
            resolve(data.result);
            return;
        }

        if (!allowed_origins.includes(e.origin)) {
            return;
        }

        // Legacy: host pushes app details unsolicited.
        if (data?.type && data.type === "appdetails") {
            setAppDetails(data);
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
    const result = sendToApp("getAppDetails");
    if (result && typeof result.then === 'function') {
        result.then((response) => {
            const details = response?.data;
            if (details && typeof details === 'object' && typeof details.type === 'string') {
                setAppDetails(details);
            }
        }).catch(() => {});
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
};
