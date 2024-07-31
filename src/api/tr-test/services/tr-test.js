'use strict';

/**
 * tr-test service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tr-test.tr-test');
