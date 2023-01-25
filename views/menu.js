'use strict'

module.exports = (data, props) => {
  return {
    "type": "container",
    "decoration": {
      color: 0xFFFFFFFF,
      boxShadow: {
        blurRadius: 8,
        color: 0x1A000000,
        offset: {
          dx: 0,
          dy: 1
        }
      },
    },
    "padding": {
      top: 16,
      bottom: 16,
      left: 32,
      right: 32,
    },
    "child": {
      "type": "flex",
      "fillParent": true,
      "mainAxisAlignment": "spaceBetween",
      "crossAxisAlignment": "center",
      "padding": { right: 32 },
      "children": [
        {
          "type": "container",
          "constraints": {
            "minWidth": 32,
            "minHeight": 32,
            "maxWidth": 32,
            "maxHeight": 32,
          },
          "child": {
            "type": "image",
            "src": "logo.png"
          },
        },
        {
          "type": "flexible",
          "child": {
            "type": "container",
            "child": {
              "type": "text",
              "value": "Hello World",
              "textAlign": "center",
              "style": {
                "fontWeight": "bold",
                "fontSize": 24,
              },
            }
          }
        }
      ]
    },
  }
}

