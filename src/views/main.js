'use strict'

import { Flex, View } from "@lenra/components"

export default (data, props) => {
  return Flex(
    View("menu"),
    View("home")
  )
    .direction("vertical")
    .scroll(true)
    .spacing(4)
    .crossAxisAlignment("center")
}
