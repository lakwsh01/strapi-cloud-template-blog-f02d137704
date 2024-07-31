

/** @deprecated since project requirement update, use native api call instead */
// module.exports = (config, { strapi }) => {
//     return async (/** @type {Object} */ context,/** @type {Function} */ next) => {
//         if (context.request.url.lastIndexOf('unpublish') > -1) {
//             strapi.service('api::sync-to-static.sync-to-static').unpublishFromStatic(context);
//             return next();
//         } else if (context.request.url.lastIndexOf('publish') > -1) {
//             strapi.service('api::sync-to-static.sync-to-static').publishToStatic(context);
//             return next();
//         }
//         else {
//             return next();
//         }
//     };
// };