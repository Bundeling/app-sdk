export const routes = {
    'app-legacy': {
        'user': 'userDetail',
        'userlist': 'userList',

        'member': 'businessClubDetail',
        'memberlist': 'businessclublist',

        'news': 'newsDetail',
        'newslist': 'feedList',

        'event': 'newsDetail',
        'evenlist': 'activityList',

        'message': 'messageDetail',
        'messagelist': 'messageList',

        'chat': 'chatDetail',
        'chatlist': 'chatList',

        'appcms': 'appLink',
    },
    'app': {
        'user': 'user/:uuid',
        'userlist': 'user',

        'customer': 'user_group/:uuid',
        'customerlist': 'user_group',

        'usergroup': 'user_group/:uuid',
        'usergrouplist': 'user_group',

        'news': 'news/:uuid',
        'newslist': 'news',

        'event': 'event/:uuid',
        'eventlist': 'event',
        'eventcalendar': 'event/calendar',

        'match': 'match/:uuid',
        'matchlist': 'match',
        'matchcalendar': 'match/calendar',

        'poll': 'poll/:uuid',
        'polllist': 'poll',

        'bulletinboard': 'bulletinboard/:uuid',
        'bulletinboardlist': 'bulletinboard/board/:boardId',

        'tickets': 'tickets',
        'ticketscanner': 'ticketScanner',

        'message': 'message/:uuid',
        'messagelist': 'message',

        'chat': 'chat/:uuid',
        'chatlist': 'chat',

        'form': 'form/:form_uuid',

        'appcms': 'app_cms/:childUuid',
        'appcmsmenu': 'app_cms_menu/:menuUuid',

        'timeline': 'timeline',
        'search': 'search',
        'settings': 'settings',
        'connection': 'connection',
        'personalfiles': 'personalfiles',
    },
}
