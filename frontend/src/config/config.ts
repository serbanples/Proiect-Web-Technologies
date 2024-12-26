export const config: config_types = {
    baseUrl: 'http://localhost:3000/api',
    routes: {
        loginRoute: '/auth/login',
        registerRoute: '/auth/register',
        homeRoute: '/home',
        baseRoute: '/',
        authBaseRoute: '/auth'
    },
}

interface config_types {
    readonly baseUrl: string;
    readonly routes: {
        readonly loginRoute: string;
        readonly registerRoute: string;
        readonly homeRoute: string;
        readonly baseRoute: string;
        readonly authBaseRoute: string;
    };
}