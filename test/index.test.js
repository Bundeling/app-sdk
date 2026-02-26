// index.test.js
import * as sdk from '../src/index';

describe('SDK Tests', () => {
    beforeEach(() => {
        // Reset to web/iframe mode (no flutter_inappwebview, no cordova)
        delete window.flutter_inappwebview;
        delete window.cordova_iab;
        delete window.webkit;
        window.parent.postMessage = jest.fn();
    });

    test('getAppDetails should return app details', () => {
        const details = sdk.getAppDetails();
        expect(details).toEqual(expect.objectContaining({ type: expect.any(String) }));
    });

    test('setAppDetails should update app details', () => {
        const newDetails = { type: 'app' };
        sdk.setAppDetails(newDetails);
        const details = sdk.getAppDetails();
        expect(details).toEqual(newDetails);
    });

    test('sendToApp should post a message with correlation ID in web/iframe mode', () => {
        sdk.sendToApp('test', { data: 'data' });
        expect(window.parent.postMessage).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'test', data: 'data', _id: expect.any(String) }),
            "*"
        );
    });

    test('sendToApp should return a Promise', () => {
        const result = sdk.sendToApp('test', { data: 'data' });
        expect(result).toBeInstanceOf(Promise);
    });

    test('sendToApp should use callHandler when flutter_inappwebview is available', () => {
        const mockCallHandler = jest.fn().mockResolvedValue('ok');
        window.flutter_inappwebview = { callHandler: mockCallHandler };

        sdk.sendToApp('test', { data: 'data' });
        expect(mockCallHandler).toHaveBeenCalledWith('BundelingBridge', JSON.stringify({ type: 'test', data: 'data' }));
        expect(window.parent.postMessage).not.toHaveBeenCalled();
    });

    test('sendToApp should use cordova bridge when available', () => {
        const mockPostMessage = jest.fn();
        window.cordova_iab = { postMessage: mockPostMessage };

        const result = sdk.sendToApp('test', { data: 'data' });
        expect(mockPostMessage).toHaveBeenCalledWith(JSON.stringify({ type: 'test', data: 'data' }));
        expect(result).toBeInstanceOf(Promise);
    });

    test('correlation response should resolve the pending promise', async () => {
        const promise = sdk.sendToApp('test', {});

        // Get the _id from the postMessage call
        const sentMessage = window.parent.postMessage.mock.calls[0][0];
        const id = sentMessage._id;

        // Simulate response from parent
        window.dispatchEvent(new MessageEvent('message', {
            data: { _id: id, result: { success: true } }
        }));

        const result = await promise;
        expect(result).toEqual({ success: true });
    });
});
