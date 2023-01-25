'use strict'

const apiService = require('../services/api');


module.exports = async (props, event, api) => {
    let res = await apiService.executeQuery(api, "counter", {
        "user": "@me"
    })

    let counters = res.data;
    if (counters.length == 0) {
        await apiService.createDoc(api, "counter", {
            "user": "@me",
            "count": 0,
        })
    }


    return {};
}