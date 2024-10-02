import navigate from "./navigate";

export {default as navigate} from "./navigate";

export let appdetails = {
    type: "app-legacy"
};

export function sendToApp(type, params) {
    const message = {type, ...params};

    const target =
        window['cordova_iab'] ??
        (window['webkit'] && window['webkit'].messageHandlers && window['webkit'].messageHandlers['cordova_iab']) ??
        window.parent;

    if (typeof window.BundelingBridge !== 'undefined') {
        window.BundelingBridge.postMessage(JSON.stringify(message));
    } else if(window['cordova_iab'] ??
        (window['webkit'] && window['webkit'].messageHandlers && window['webkit'].messageHandlers['cordova_iab']) ?? false) {
        target.postMessage(JSON.stringify(message));
    } else {
        target.postMessage(message, "*");
    }

}

window.addEventListener("message", function (e) {
    if(e.data && e.data.type) {
        switch(e.data.type) {
            case 'appdetails':
                appdetails = e.data;
                break;
        }
    }
});

sendToApp("getAppDetails");

export function openFile(url) {
    return sendToApp("openfile", { href: url });
}

export function shareUrl(url) {
    return sendToApp("shareurl", { href: url });
}

export function openUrl(url) {
    return sendToApp("openurl", { href: url });
}

export function alert(title, content) {
    return sendToApp("rawmodal", { title, content });
}

export function toast(title, content) {
    return sendToApp("rawtoast", { title, content });
}

export default {
    navigate: navigate,
    openFile: openFile,
    shareUrl: shareUrl,
    openUrl: openUrl,
    alert: alert,
    toast: toast
}