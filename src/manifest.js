'use strict'
import { View } from "@lenra/app";
import Navigation from "./classes/Navigation.js";

// Views
export const lenraRoutes = [{
  path: "/",
  view: View("app")
          .find(Navigation, {
            "user": "@me"
          })
}]
