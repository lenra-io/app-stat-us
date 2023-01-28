'use strict'

const Platform = require("../../classes/Platform");
const PostStat = require("../../classes/PostStat");

/**
 * @param {*} _data 
 * @param {{state: {platform: string, post: string}}} props 
 * @returns 
 */
function content(_data, props) {
    return {
        type: "view",
        name: 'new_post_stats_form',
        coll: Platform.collection,
        query: {
            _id: props.state.platform,
        }
    };
}

/**
 * 
 * @param {Platform[]} param0 The posts to edit
 * @param {*} _props 
 * @returns 
 */
function form([platform], _props) {
    const date = new Date();
    const str = date.toISOString();
    const dateStr = str.substring(0, 10);
    const timeStr = str.substring(11, 19);
    console.log(platform);
    return {
        type: "form",
        onSubmit: {
            action: "savePostStat"
        },
        child: {
            type: "container",
            constraints: { maxWidth: 600 },
            child: {
                type: "flex",
                spacing: 16,
                mainAxisAlignment: "start",
                crossAxisAlignment: "stretch",
                direction: "vertical",
                children: [
                    ...PostStat.fields
                        .filter(field => platform[field])
                        .map(field => {
                            const text = field.substring(0, 1).toUpperCase() + field.substring(1);
                            return {
                                type: "textfield",
                                name: field,
                                value: "",
                                style: {
                                    decoration: {
                                        labelText: text,
                                    },
                                }
                            }
                        }), {
                        type: "textfield",
                        value: dateStr,
                        name: "date",
                        style: {
                            decoration: {
                                labelText: "Post date",
                                helperText: "Format: yyyy-mm-dd",
                                icon: {
                                    type: "icon",
                                    value: "calendar_today"
                                }
                            },
                        }
                    },
                    {
                        type: "textfield",
                        value: timeStr,
                        name: "time",
                        style: {
                            decoration: {
                                labelText: "Post time",
                                helperText: "At UTC with the next format: hh:mm:ss",
                                icon: {
                                    type: "icon",
                                    value: "access_time"
                                }
                            },
                        }
                    },
                    {
                        type: "button",
                        text: "Save",
                        submit: true,
                    }
                ]
            }
        }
    }
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
    }
}

module.exports = {
    content,
    form,
    menu,
}
