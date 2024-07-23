'use strict';

/**
 * weekly-keyword service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::weekly-keyword.weekly-keyword');
