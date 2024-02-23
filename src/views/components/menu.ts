import { ViewRequest, Container, Flex, colors, padding, Image, Flexible, Text, Component, IComponent, Button, View } from '@lenra/app'
import Org from '../../classes/Org'
import guards from '../guards/guards'
import User from '../../classes/User'

export default function (_data: ViewRequest['data'], props: ViewRequest['props'], ): Component<IComponent> | IComponent {
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
      View('guards.guards').props({
        page: View('components.org_selector').find(Org, {
          'members.user': '@me'
        }),
        guards: [
          View('guards.find').find(User, {
            id: '@me'
          }).props({
            guardname: 'guards.findUser'
          })
        ]
      }).context({
        me: true
      }),
      Flexible(
        Container()
      ),
      Flex(actions as any[]).direction('horizontal').mainAxisAlignment('end').fillParent(true).spacing(10)
    ])
      .fillParent(true)
      .mainAxisAlignment("spaceBetween")
      .crossAxisAlignment("center")
      .padding({ right: 32 })
      .spacing(10)
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
