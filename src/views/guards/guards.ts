'use strict'

import { View, ViewImpl, ViewRequest } from "@lenra/app"
import { JsonViewResponse, Props, View as ViewR } from "@lenra/app/dist/lib/gen/response"

export default (data: ViewRequest['data'], props: { data: any, page: any, guards: any[], guardname: string } | ViewRequest['props'], context?: ViewRequest['context']): ViewImpl => {
  const page = props.page
  const guards = props.guards ?? []
  const passedData = props.data ?? {}
  const guardname = props.guardname as string ?? 'default'

  let nextView = page
  if (guards instanceof Array && guards.length > 0) {
    let guard = guards[0]
    if (guard instanceof ViewImpl) {
      guard = guard['model']
    }
    guard.props = {
      ...(guard.props ?? {}),
      data: {
      ...passedData, [guardname]: data
      },
      page,
      guards: guards.slice(1),
      guardname: guard.name
    }
    nextView = guard
  } else {
    if (page instanceof ViewImpl) {
      nextView = page['model']
    }
    nextView.props = {
      ...(nextView.props ?? {}), data: {
        ...passedData, [guardname]: data
      }
    }
  }
  return Object.setPrototypeOf({ model: nextView }, ViewImpl.prototype)
}
