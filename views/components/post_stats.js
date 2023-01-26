const navigationService = require('../../services/navigationService.js');
const ui = require('../utils/ui.js')

function post_stats(data, props) {
    return {
        "type": "text",
        "value": "Post stats"
    }
}

module.exports = {
    post_stats
}