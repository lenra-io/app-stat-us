'use strict'
import { View } from "@lenra/app";
import Navigation from "./classes/Navigation.js";

// Views
export const lenra = {
  routes: [
    {
      path: "/",
      view: View("app")
        .find(Navigation, {
          "user": "@me"
        })
    }
  ]

}
