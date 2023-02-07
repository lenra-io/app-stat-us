const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^\d{2}:\d{2}:\d{2}$/;

/**
 * Returns the first defined value or the default one
 * @param {string} property 
 * @param {*} defaultValue 
 * @param  {...any} data 
 */
function firstProperty(property, defaultValue, ...data) {
    for (const o of data) {
        if (o && property in o && (o[property] || typeof o[property]=="boolean")) return o[property];
    }
    return defaultValue;
}

module.exports = {
    firstProperty,
    urlRegex,
    dateRegex,
    timeRegex,
}