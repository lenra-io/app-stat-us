'use strict'

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function content(_data, props) {
    const child = {
        type: "view",
        name: 'edit_platform_form',
        props
    };
    // if (props.state.platform) {
    //     child.coll = navigationService.collection;
    //     child.query = {
    //         user: platform._id
    //     };
    // }
    return child;
}

/**
 * 
 * @param {Platform[]} param0 The platforms to edit
 * @param {{state: any}} param1 
 * @returns 
 */
function form([platform], { state }) {
    return {
        type: "container",
        constraints: { maxWidth: 600 },
        child: {
            type: "flex",
            spacing: 16,
            mainAxisAlignment: "start",
            crossAxisAlignment: "stretch",
            direction: "vertical",
            children: [
                {
                    type: "textfield",
                    value: state?.name || platform?.name || "",
                    style: {
                        decoration: {
                            labelText: "Platform name"
                        },
                    },
                    onChanged: { 
                        action: "setStateProperty",
                        props: {
                            property: "name"
                        }
                    }
                },
                // {
                //     type: "flex",
                //     spacing: 16,
                //     mainAxisAlignment: "start",
                //     crossAxisAlignment: "stretch",
                //     direction: "vertical",
                //     children: [

                //     ]
                // }
            ]
        }
    }
}

function booleanField() {

}

/**
 * @param {*} _data 
 * @param {*} props 
 * @returns 
 */
function menu(_data, _props) {
    return {
        type: "view",
        name: "menu",
        props: {
            mainAction: {
                text: "Save",
                // onPressed: {
                //     action: "pushState",
                //     props: {
                //         page: "newGame"
                //     }
                // }
            }
        }
    }
}

module.exports = {
    content,
    menu,
    form,
}
