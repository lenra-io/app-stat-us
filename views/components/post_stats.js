const PostStat = require('../../classes/PostStat.js');
const ui = require('../utils/ui.js');

/**
 * @param {PostStat[]} stats 
 * @param {*} props 
 * @returns 
 */
function post_stats(stats, props) {
    console.log("post_stats", stats);
    if (stats.length == 0) {
        return {
            type: "text",
            value: "No data yet",
            textAlign: "center",
        }
    }
    // const limit = props.limit || props.pagination;
    // let filteredStats = stats
    //     .sort((a, b) => b.date - a.date);
    // if (limit) filteredStats = filteredStats.slice(0, limit);
    const children = [];
    // children.push({
    //     type: "text",
    //     value: "500 views"
    // });
    return {
        type: "flex",
        spacing: 16,
        children,
    };
}

module.exports = {
    post_stats
}