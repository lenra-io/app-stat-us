

/**
 * Returns the first defined value or the default one
 * @param {string} property 
 * @param {*} defaultValue 
 * @param  {...any} data 
 */
function firstProperty(property, defaultValue, ...data) {
    for (const o of data) {
        if (o && property in o) return o[property];
    }
    return defaultValue;
}

module.exports = {
    firstProperty,
}