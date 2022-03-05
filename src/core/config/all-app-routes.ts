export const ALL_APP_ROUTES = {
    SIGNIN: process.env.PUBLIC_URL+'/login',
    MAIN_ADMIN: process.env.PUBLIC_URL+'/admin',
    DASHBOARD: process.env.PUBLIC_URL+'/admin/dashboard',
    FAQ: {
        LIST: process.env.PUBLIC_URL+'/admin/cms/faq-list',
        ADD_UPDATE: process.env.PUBLIC_URL+'/admin/cms/faq-add-update',
    },
    ABOUT_US: {
        LIST: process.env.PUBLIC_URL+'/admin/cms/about-us-list',
        ADD_UPDATE: process.env.PUBLIC_URL+'/admin/cms/about-us-add-update',
    }
}