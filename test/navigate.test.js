// navigate.test.js
import navigate from '../src/navigate';

describe('Navigate Tests', () => {
    beforeEach(() => {
        delete window.flutter_inappwebview;
        delete window.cordova_iab;
        delete window.webkit;
        window.parent.postMessage = jest.fn();
    });

    test('navigate.news should navigate to news', () => {
        navigate.news('123');
        expect(window.parent.postMessage).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'navigate', route: 'newsDetail', params: { id: '123', replace: false } }),
            "*"
        );
    });

    test('navigate.news should navigate to news with replace', () => {
        navigate.news('123', true);
        expect(window.parent.postMessage).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'navigate', route: 'newsDetail', params: { id: '123', replace: true } }),
            "*"
        );
    });

    test('navigate.newslist should navigate to newslist', () => {
        navigate.newslist('456');
        expect(window.parent.postMessage).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'navigate', route: 'feedList', params: { id: '456', replace: false } }),
            "*"
        );
    });

    test('navigate.event should navigate to event', () => {
        navigate.event('789');
        expect(window.parent.postMessage).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'navigate', route: 'newsDetail', params: { id: '789', replace: false } }),
            "*"
        );
    });

    test('navigate.event should navigate to event with replace', () => {
        navigate.event('789', true);
        expect(window.parent.postMessage).toHaveBeenCalledWith(
            expect.objectContaining({ type: 'navigate', route: 'newsDetail', params: { id: '789', replace: true } }),
            "*"
        );
    });

    test('navigate should throw error for non-existent route', () => {
        expect(() => navigate.navigate('nonExistentRoute', {})).toThrow('Route [nonExistentRoute] does not exist');
    });

    test('navigate methods should return a Promise', () => {
        const result = navigate.news('123');
        expect(result).toBeInstanceOf(Promise);
    });
});
