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

    test('sendToApp should post a message', () => {
        const message = { type: 'test', data: 'data' };
        const originTarget = "*";
        window.parent.postMessage = jest.fn();
        sdk.sendToApp('test', { data: 'data' });
        expect(window.parent.postMessage).toHaveBeenCalledWith(message, originTarget);
    });

});