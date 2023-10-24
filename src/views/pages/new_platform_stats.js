'use strict'

import { View } from "@lenra/app";

/**
 * @param {*} _data
 * @param {*} props
 * @returns
 */
export function newPlatformStats(_data, _props) {
    return Text("Add platform stats page");
}

/**
 * @param {*} _data
 * @param {*} props
 * @returns
 */
export function newPlatformStatsMenu(_data, _props) {
    return View("menu")
        .props({
            mainAction: {
                text: "New game",
                onPressed: {
                    action: "pushState",
                    props: {
                        page: "newGame"
                    }
                }
            }
        });
}
