'use strict'
import { View } from "@lenra/app";
import Navigation from "./classes/Navigation.js";

// Views
export const lenra = {
  routes: [{
    path: "/platform/edit",
    view: View("EditPlatform")
      .find(Navigation, {
        "user": "@me"
      })
  },
  {
    path: "/platform/edit/form",
    view: View("EditPlatformForm")
      .find(Navigation, {
        "user": "@me"
      })
  },
  {
    path: "/post/edit",
    view: View("EditPost")
      .find(Navigation, {
        "user": "@me"
      })
  },
  {
    path: "/post/edit",
    view: View("EditPostForm")
      .find(Navigation, {
        "user": "@me"
      })
  }]
}
