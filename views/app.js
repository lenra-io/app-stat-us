'use strict'

const ui = require('./utils/ui.js')

/**
 * @param {Navigation[]} navigations 
 * @param {*} _props 
 * @returns 
 */
module.exports = (navigations, _props) => {
  const navigation = navigations[0];
  if (!navigation) {
    return {
      type: "text",
      value: "Loading"
    }
  }
  let app = {
    type: "flex",
    direction: "vertical",
    scroll: true,
    spacing: 32,
    crossAxisAlignment: "center",
    children: [
      {
        type: "view",
        name: `${navigation.state.page}_menu`,
        props: {
          state: navigation.state
        }
      },
      {
        type: "view",
        name: `${navigation.state.page}_content`,
        props: {
          state: navigation.state
        }
      }
    ]
  };
  if (navigation.state.modal) {
    app = {
      type: "stack",
      fit: "expand",
      children: [
        app,
        modal(navigation.state.modal, navigation)
      ]
    }
  }

  return app;
}

function modal(modal, navigation) {
  return {
    // type: "overlayEntry",
    // child: {
    type: "actionable",
    onPressed: {
      action: "closeModal",
      props: {
        state: navigation.state
      }
    },
    child: {
      type: "container",
      decoration: {
        color: 0x00FFFFFF
      },
      child: {
        type: "flex",
        direction: "vertical",
        spacing: 8,
        fillParent: true,
        mainAxisAlignment: "center",
        crossAxisAlignment: "center",
        children: [
          {
            type: "actionable",
            onPressed: {
              action: "doNothing"
            },
            child: {
              type: "container",
              border: ui.border.all({
                width: 0.5,
                color: 0xFFDCE0E7
              }),
              decoration: {
                color: 0xFFFFFFFF,
                boxShadow: {
                  blurRadius: 10,
                  offset: {
                    dx: 4,
                    dy: 4
                  },
                  color: 0x1A000000
                },
                borderRadius: ui.borderRadius.all(16)
              },
              padding: ui.padding.all(16),
              child: {
                type: "view",
                name: `modal_${modal}_content`,
                props: {
                  state: navigation.state
                }
              }
            }
          }
        ]
      }
    }
  }
}