'use strict'

module.exports = (data, props) => {
  return {
    "type": "flex",
    "direction": "vertical",
    "scroll": true,
    "spacing": 4,
    "crossAxisAlignment": "center",
    "children": [
      {
        "type": "view",
        "name": "menu",
      },
      {
        "type": "view",
        "name": "home"
      }
    ]
  }
}

