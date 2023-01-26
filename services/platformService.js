'use strict'

const Platform = require('../classes/Platform');
const { getDoc } = require('./api');
const collection = 'platforms';

/**
 * @param {any} api 
 * @returns {Promise<Platform>}
 */
async function get(api, id) {
    return getDoc(api, collection, id);
}

module.exports = {
    collection,
    get,
}
