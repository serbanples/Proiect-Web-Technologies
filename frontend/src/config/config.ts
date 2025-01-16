export const config: config_types = {
    baseUrl: 'http://localhost:3000/api',
    routes: {
        loginRoute: '/auth/login',
        registerRoute: '/auth/register',
        allTasksRoute: '/dashboard/all-tasks',
        dashboardRoute: '/dashboard',
        myTasksRoute: '/dashboard/my-tasks',
        baseRoute: '/',
        authBaseRoute: '/auth',
        allProjectRoute: '/dashboard/projects'
    },
}

interface config_types {
    readonly baseUrl: string;
    readonly routes: {
        readonly loginRoute: string;
        readonly registerRoute: string;
        readonly allTasksRoute: string;
        readonly dashboardRoute: string;
        readonly myTasksRoute: string;
        readonly baseRoute: string;
        readonly authBaseRoute: string;
        readonly allProjectRoute: string;
    };
}