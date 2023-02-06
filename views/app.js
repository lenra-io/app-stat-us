'use strict'

const { Text, Flex, View, Container, padding, Stack, Actionable, colors } = require('@lenra/components');

/**
 * @param {Navigation[]} navigations 
 * @param {*} _props 
 * @returns 
 */
module.exports = (navigations, _props) => {
  const navigation = navigations[0];
  if (!navigation) return Text.new("Loading");

  let app = Flex.new(
    View.new(`${navigation.state.page}_menu`)
      .props({
        state: navigation.state
      }),
    Container.new(
      View.new(`${navigation.state.page}_content`)
        .props({
          state: navigation.state
        })
    )
      .padding(padding.all(32))
      .maxWidth(864)
  )
    .direction("vertical")
    .scroll(true)
    .crossAxisAlignment("center");
  if (navigation.state.modal) {
    app = Stack.new(
      app,
      modal(navigation.state.modal, navigation)
    ).fit("expand");
  }

  return app;
}

function modal(modal, navigation) {
  return Actionable.new(
    Container.new(
      Actionable.new(
        Container.card(
          View.new(`modal_${modal}_content`).props({
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