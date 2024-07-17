'use strict';

/**
 * hello-new-type controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::hello-new-type.hello-new-type');
