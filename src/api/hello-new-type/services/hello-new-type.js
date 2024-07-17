'use strict';

/**
 * hello-new-type service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::hello-new-type.hello-new-type');
