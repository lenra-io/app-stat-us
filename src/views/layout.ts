import { Component, Flex, IComponent, View, ViewImpl, ViewRequest } from "@lenra/app"
import { platform } from "os"


export default function (view: Component<IComponent> | IComponent, props: ViewRequest['props'] = {}): Component<IComponent> | IComponent {
  return Flex([
    View("components.menu").props(props),
    view
  ])
    .direction("vertical")
    .fillParent(true)
    .scroll(true)
    .spacing(4)
    .crossAxisAlignment("center")
}
