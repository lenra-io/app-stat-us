module.exports = {
    doNothing: (data) => data,
    ...require("./lifecycleEvents.js"),
    ...require("./navigationEvents.js"),
}