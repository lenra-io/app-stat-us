module.exports = {
    doNothing: (data) => data,
    ...require("./lifecycleEvents"),
    ...require("./navigationEvents"),
    ...require("./platformEvents"),
}