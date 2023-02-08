'use strict'

const { Flex, View } = require("@lenra/components")

module.exports = (data, props) => {
  return Flex(
    View("menu"),
    View("home")
  )
    .direction("vertical")
    .scroll(true)
    .spacing(4)
    .crossAxisAlignment("center")
}

