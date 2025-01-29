// navigate.test.js
import navigate from '../src/navigate';

describe('Navigate Tests', () => {
    test('navigate.news should navigate to news', () => {
        window.parent.postMessage = jest.fn();
        navigate.news('123');
        expect(window.parent.postMessage).toHaveBeenCalledWith({ type: 'navigate', route: 'newsDetail', params: { id: '123', replace: false } }, "*");
    });

    test('navigate.news should navigate to news with replace', () => {
        window.parent.postMessage = jest.fn();
        navigate.news('123', true);
        expect(window.parent.postMessage).toHaveBeenCalledWith({ type: 'navigate', route: 'newsDetail', params: { id: '123', replace: true } }, "*");
    });

    test('navigate.newslist should navigate to newslist', () => {
        window.parent.postMessage = jest.fn();
        navigate.newslist('456');
        expect(window.parent.postMessage).toHaveBeenCalledWith({ type: 'navigate', route: 'feedList', params: { id: '456', replace: false } }, "*");
    });

    test('navigate.event should navigate to event', () => {
        window.parent.postMessage = jest.fn();
        navigate.event('789');
        expect(window.parent.postMessage).toHaveBeenCalledWith({ type: 'navigate', route: 'newsDetail', params: { id: '789', replace: false } }, "*");
    });

    test('navigate.event should navigate to event with replace', () => {
        window.parent.postMessage = jest.fn();
        navigate.event('789', true);
        expect(window.parent.postMessage).toHaveBeenCalledWith({ type: 'navigate', route: 'newsDetail', params: { id: '789', replace: true } }, "*");
    });

    test('navigate should throw error for non-existent route', () => {
        window.parent.postMessage = jest.fn();
        expect(() => navigate.navigate('nonExistentRoute', {})).toThrow('Route [nonExistentRoute] does not exist');
    });

});