'use strict'

const { Flex, View } = require("@lenra/components")

module.exports = (data, props) => {
  return Flex.new(
    View.new("menu"),
    View.new("home")
  )
    .direction("vertical")
    .scroll(true)
    .spacing(4)
    .crossAxisAlignment("center")
}

