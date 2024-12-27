export const API_ROUTES = {
    Login: {
        getRedirect: '/auth/google/redirect'
    },
    UserInfo: '/my',
    Thread: {
        getThreadList: '/threads',
        getThreadListByUser: '/threads/user/:id',
        getThreadListByBot: 'threads/bot/:id',
        getUserHistory: '/threads/:id',
        createThread: '/threads',
        updateThread: '/threads/update/:id',
    },
    Bot: {
        getMyBots: '/bots/list',
        getBotDetail: '/bots/show/:id',
        createBot: '/bots',
        editBot: '/bots/update/:id',
        deleteBot: '/bots/:id'
    },
    User: {
        getUserList: '/users',
        updateUser: '/users/:id/role',
    },
    Config: {
        getConfig: '/config',
        editConfig: '/config',
    },
    Handle: {
        getAnswer: '/handle'
    }
}