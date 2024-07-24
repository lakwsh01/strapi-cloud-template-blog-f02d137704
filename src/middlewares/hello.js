
module.exports = (config, { strapi }) => {
    return (context, next) => {
        // console.log('context', context);
        if (context.request.url === '/') {
            // react redircet to /admin
            context.response.redirect('/admin');


        }
        else {
            return next();
        }
    };
};