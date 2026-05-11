// index.test.js
import * as sdk from '../src/index';

describe('SDK Tests', () => {
    test('getAppDetails should return app details', () => {
        const details = sdk.getAppDetails();
        expect(details).toEqual({ type: 'app-legacy' });
    });

    test('setAppDetails should update app details', () => {
        const newDetails = { type: 'app' };
        sdk.setAppDetails(newDetails);
        const details = sdk.getAppDetails();
        expect(details).toEqual(newDetails);
    });

    test('sendToApp should post a message with a correlation id', () => {
        window.parent.postMessage = jest.fn();
        sdk.sendToApp('test', { data: 'data' });

        expect(window.parent.postMessage).toHaveBeenCalledTimes(1);
        const [message, targetOrigin] = window.parent.postMessage.mock.calls[0];
        expect(targetOrigin).toBe('*');
        expect(message).toEqual(expect.objectContaining({ type: 'test', data: 'data' }));
        expect(typeof message._id).toBe('string');
    });

    test('sendToApp should return a Promise that resolves when the host replies', async () => {
        window.parent.postMessage = jest.fn();
        const pending = sdk.sendToApp('rawtoast', { title: 'hi', content: 'there' });
        expect(pending).toBeInstanceOf(Promise);

        const sentMessage = window.parent.postMessage.mock.calls[0][0];
        const id = sentMessage._id;

        // Simulate Flutter web shell replying to the request.
        window.dispatchEvent(new MessageEvent('message', {
            data: { _id: id, result: { success: true } },
        }));

        await expect(pending).resolves.toEqual({ success: true });
    });

    test('sendToApp should use flutter_inappwebview when available', async () => {
        const callHandler = jest.fn().mockResolvedValue({ success: true, data: { type: 'app' } });
        window.flutter_inappwebview = { callHandler };

        const result = await sdk.sendToApp('getAppDetails');

        expect(callHandler).toHaveBeenCalledWith('BundelingBridge', JSON.stringify({ type: 'getAppDetails' }));
        expect(result).toEqual({ success: true, data: { type: 'app' } });

        delete window.flutter_inappwebview;
    });
});
