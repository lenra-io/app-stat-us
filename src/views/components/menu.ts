import { ViewRequest, Container, Flex, colors, padding, Image, Flexible, Text, Component, IComponent, Button } from '@lenra/app'

export default function (_data: ViewRequest['data'], props: ViewRequest['props']): Component<IComponent> | IComponent {
  const actions = props.actions ?? []

  return Container(
    Flex([
      Container(
        Text("Stat Us")
          .style({
            "fontWeight": "bold",
            "fontSize": 24
          })
      ),
      Flexible(
        Container()
      ),
      Flex(actions as any[]).direction('horizontal').mainAxisAlignment('end').fillParent(true).spacing(10)
    ])
      .fillParent(true)
      .mainAxisAlignment("spaceBetween")
      .crossAxisAlignment("center")
      .padding({ right: 32 })
  )
    .color(colors.Colors.white)
    .boxShadow({
      blurRadius: 8,
      color: 0x1A000000,
      offset: {
        dx: 0,
        dy: 1
      }
    })
    .padding(padding.symmetric(32, 16))
}
