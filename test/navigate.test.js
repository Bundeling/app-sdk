// navigate.test.js
import navigate from '../src/navigate';
import { setAppDetails } from '../src/index';

function expectPosted(expectedMessage) {
    expect(window.parent.postMessage).toHaveBeenCalledTimes(1);
    const [message, targetOrigin] = window.parent.postMessage.mock.calls[0];
    expect(targetOrigin).toBe('*');
    expect(message).toEqual(expect.objectContaining(expectedMessage));
    expect(typeof message._id).toBe('string');
}

describe('Navigate Tests', () => {
    beforeEach(() => {
        window.parent.postMessage = jest.fn();
        setAppDetails({ type: 'app' });
    });

    const routeCases = [
        ['user',              { uuid: 'abc' },        'user/abc'],
        ['userlist',          {},                     'user'],
        ['customer',          { uuid: 'abc' },        'customer/abc'],
        ['customerlist',      {},                     'customer'],
        ['news',              { uuid: 'abc' },        'news/abc'],
        ['newslist',          {},                     'news'],
        ['event',             { uuid: 'abc' },        'event/abc'],
        ['eventlist',         {},                     'event'],
        ['eventcalendar',     {},                     'event/calendar'],
        ['match',             { uuid: 'abc' },        'match/abc'],
        ['matchlist',         {},                     'match'],
        ['matchcalendar',     {},                     'match/calendar'],
        ['poll',              { uuid: 'abc' },        'poll/abc'],
        ['polllist',          {},                     'poll'],
        ['bulletinboard',     { uuid: 'abc' },        'bulletinboard/abc'],
        ['bulletinboardlist', { boardId: 'b1' },      'bulletinboard/board/b1'],
        ['tickets',           {},                     'tickets'],
        ['ticketscanner',     {},                     'ticketScanner'],
        ['message',           { uuid: 'abc' },        'message/abc'],
        ['messagelist',       {},                     'message'],
        ['chat',              { uuid: 'abc' },        'chat/abc'],
        ['chatlist',          {},                     'chat'],
        ['form',              { form_uuid: 'f1' },    'form/f1'],
        ['appcms',            { childUuid: 'c1' },    'app_cms/c1'],
        ['appcmsmenu',        { menuUuid: 'm1' },     'app_cms_menu/m1'],
        ['timeline',          {},                     'timeline'],
        ['search',            {},                     'search'],
        ['settings',          {},                     'settings'],
        ['connection',        {},                     'connection'],
        ['personalfiles',     {},                     'personalfiles'],
    ];

    describe('push', () => {
        test.each(routeCases)('push(%s) routes to %s', (route, params, expected) => {
            navigate.push(route, params);
            expectPosted({ type: 'navigate', route: expected, params: params });
        });

        test('throws for unknown route', () => {
            expect(() => navigate.push('nonExistentRoute', {})).toThrow('Route [nonExistentRoute] does not exist');
        });

        test('accepts undefined params for parameterless routes', () => {
            navigate.push('userlist');
            expectPosted({ type: 'navigate', route: 'user' });
        });
    });

    describe('replace', () => {
        test.each(routeCases)('replace(%s) routes to %s with replace=true', (route, params, expected) => {
            navigate.replace(route, params);
            expectPosted({ type: 'navigate', route: expected, params: params, replace: true });
        });

        test('throws for unknown route', () => {
            expect(() => navigate.replace('nonExistentRoute', {})).toThrow('Route [nonExistentRoute] does not exist');
        });
    });

    describe('back', () => {
        test('sends a back message', () => {
            navigate.back();
            expectPosted({ type: 'back' });
        });
    });
});
