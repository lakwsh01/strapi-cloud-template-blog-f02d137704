'use strict';

/**
 * formator service
 */
const _ = require("lodash")

module.exports = () => ({

    getImageUrl: (/** @type {Object} */ formated,/** @type {String} */  size) => {

        return _.get(formated, `formats.${size ?? "thumbnail"}.url`)
    }
});
