const PostStat = require('../../classes/PostStat.js');
const ui = require('../utils/ui.js');

/**
 * @param {PostStat[]} stats 
 * @param {*} props 
 * @returns 
 */
function post_stats(stats, props) {
    if (stats.length == 0) {
        return {
            type: "text",
            value: "No data yet",
            textAlign: "center",
        }
    }
    const limit = props.limit || props.pagination;
    let filteredStats = stats
        .sort((a, b) => b.date - a.date);
    if (limit) filteredStats = filteredStats.slice(0, limit);
    const fields = PostStat.fields.filter(field => filteredStats.find(stat => field.name in stat));
    const children = filteredStats.map((stat, i) => {
        const date = new Date(stat.date);
        let dateStr = date.toISOString();
        dateStr = `${dateStr.substring(0, 10)} ${dateStr.substring(11, 19)}`
        return {
            type: "container",
            padding: ui.padding.symmetric(0, 8),
            child: {
                type: "wrap",
                spacing: 16,
                runSpacing: 8,
                children: [
                    {
                        type: "text",
                        value: dateStr,
                    },
                    ...fields.map(field => fieldValue(field, stat, stats[i + 1]))
                ],
            }
        };
    });
    if (children.length == 1) return children[0];
    return {
        type: "flex",
        spacing: 16,
        mainAxisAlignment: "start",
        crossAxisAlignment: "stretch",
        direction: "vertical",
        children
    };
}

function fieldValue(field, stat, previousStat) {
    const isManaged = field.name in stat;
    const children = [];
    // Don't seems to be managed yet
    if (previousStat && isManaged && field.name in previousStat) {
        const diff = stat[field.name] - previousStat[field.name];
        let diffText = `${diff}`;
        let diffColor = ui.color.red;
        if (diff == 0) {
            diffText = ' - ';
            diffColor = ui.color.yellow;
        }
        else if (diff > 0) {
            diffText = '+' + diffText;
            diffColor = ui.color.green;
        }
        children.push(
            {
                type: "text",
                value: " (",
            },
            {
                type: "text",
                value: diffText,
                style: {
                    color: diffColor,
                },
            },
            {
                "type": "text",
                "value": ")",
            }
        );
    }
    return {
        type: "container",
        constraints: { minWidth: 88 },
        child: {
            type: "flex",
            spacing: 8,
            crossAxisAlignment: "center",
            children: [
                {
                    type: "icon",
                    value: field.icon,
                    size: 16,
                },
                {
                    type: "text",
                    value: isManaged ? `${stat[field.name]}${children.map(c => c.value).join('')}` : '-',
                    // Not managed by the client
                    // children,
                }
            ]
        }
    }
}

module.exports = {
    post_stats
}