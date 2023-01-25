'use strict'

const apiService = require("../services/api");

module.exports = async (props, event, api) => {

    let res = await apiService.getDoc(api, "counter", props.id);
    let counter = res.data
    counter.count += 1;
    await apiService.updateDoc(api, "counter", counter);
    return {};
}