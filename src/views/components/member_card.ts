import { Component, IComponent, Container, Text, Flex, Flexible } from "@lenra/app"
import { Member, Role } from "../../classes/Org.js";
import User from "../../classes/User.js";
import { capitalize } from "../../utils/string.js";

export default function([user]: User[], {member, backgroundColor = 0xFFAAAAAA, actions = []}: {member: Member, backgroundColor: number, actions: Component<IComponent>[] | IComponent[]}): Component<IComponent> | IComponent {
    return Container.card(Flex([
        Text(user.username),
        Text(capitalize(Role[member.role])),
        Flex(actions).direction("horizontal").spacing(5)
    ])
        .direction("horizontal")
        .mainAxisAlignment("spaceAround")
    ).color(backgroundColor)
}
