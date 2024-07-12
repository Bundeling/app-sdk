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
        'user': 'user/:id',
        'userlist': 'users',

        'customer': 'customer/:id',
        'customerlist': 'customer',

        'news': 'news/:id',
        'newslistlist': 'newslist',

        'event': 'event/:id',
        'eventlist': 'event',

        'message': 'message/:id',
        'messagelist': 'message',

        'chat': 'chat/:id',
        'chatlist': 'chat',

        'appcms': 'appcms',
    },
}
