
module.exports = (config, { strapi }) => {
    return async (context, next) => {
        // console.log('context', context);
        if (context.request.url === '/') {
            // react redircet to /admin
            context.response.redirect('/admin');
        }
        else {
            const c = strapi.contentTypes || {};
            console.log('contentTypes::: ', c);
            return next();
        }
    };
};