'use strict';

/**
 * hello-new-type router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::hello-new-type.hello-new-type');
