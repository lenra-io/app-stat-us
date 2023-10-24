'use strict'

import { Text, Flex, View, Container, padding, Stack, Actionable, colors } from '@lenra/app';

/**
 * @param {Navigation[]} navigations
 * @param {*} _props
 * @returns
 */
export default (navigations, _props) => {
  const navigation = navigations[0];
  if (!navigation) return Text("Loading");

  let app = Flex(
    View(`${navigation.state.page}_menu`)
      .props({
        state: navigation.state
      }),
    Container(
      View(`${navigation.state.page}_content`)
        .props({
          state: navigation.state
        })
    )
      .maxWidth(800)
  )
    .direction("vertical")
    .scroll(true)
    .crossAxisAlignment("center");
  if (navigation.state.modal) {
    app = Stack(
      app,
      modal(navigation.state.modal, navigation)
    ).fit("expand");
  }

  return app;
}

function modal(modal, navigation) {
  return Actionable(
    Container(
      Actionable(
        Container.card(
          View(`modal_${modal}_content`).props({
            state: navigation.state
          })
        )
      )
        .onPressed("doNothing")
    )
      .color(colors.opacity(colors.Colors.white, 0.5))
      .alignment('center')
  )
    .onPressed("closeModal", {
      state: navigation.state
    });
}
