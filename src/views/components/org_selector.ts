import { ViewRequest, Container, Component, IComponent, Menu, DropdownButton, MenuItem, Flex, Button, Actionable, IconImpl, Icon } from '@lenra/app'

export default function (data: ViewRequest['data'], props: ViewRequest['props'],): Component<IComponent> | IComponent {
  const users = props.data['guards.findUser'] ?? []
  const user = users[0]
  const orgs = props.data['guards.findOrg'] ?? data
  const org = orgs.find(org => org._id == user.selectedOrg) ?? orgs[0]

  if (!user)
    return Container()

  return Flex([
    DropdownButton(org.name ?? 'Select an org', Menu(
      [...orgs.filter(o=>o._id != org._id).map(o =>
          MenuItem(o.name)
              .isSelected(o._id == user.selectedOrg)
          .onPressed('updateUser', {
            id: '@me',
            selectedOrg: o._id
          })
        ),
        MenuItem('Create an Org')
          .onPressed("@lenra:navTo", {
            path: `/org/new`
          })
      ])),
    Button('').mainStyle("secondary").leftIcon(Icon('add').toJSON()).onPressed('@lenra:navTo', {
      path: `/org/new`
    }),
    Button('').mainStyle("secondary").leftIcon(Icon('settings').toJSON()).onPressed('@lenra:navTo', {
      path: `/org/${org.slug}`
    })
  ]).direction("horizontal").spacing(10)
}
