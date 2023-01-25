'use strict'

module.exports = (data, counter) => {
    return {
        "type": "flex",
        "direction": "vertical",
        "spacing": 16,
        "mainAxisAlignment": "spaceEvenly",
        "crossAxisAlignment": "center",
        "children": [
            {
                "type": "view",
                "name": "counter",
                "coll": "counter",
                "query": {
                    "user": "@me"
                },
                "props": { text: "My personnal counter" }
            },
            {
                "type": "view",
                "name": "counter",
                "coll": "counter",
                "query": {
                    "user": "global"
                },
                "props": { text: "The common counter" }
            }
        ]
    }
}

