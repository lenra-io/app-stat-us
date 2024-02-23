'use strict'

import { ViewImpl, ViewRequest } from "@lenra/app"

export default (data: ViewRequest['data'], props: { data: any, page: any, guards: any[], guardname: string, pathParams: any } | ViewRequest['props'], context: ViewRequest['context'] = {}): ViewImpl => {
  const pathParams = props.pathParams ?? context.pathParams

  const page = props.page
  // Get requested (and only remaining) guards and parse routes values from props and find requests.
  const guards = (props.guards as any[])?.map(guard => {
    let newGuard = guard
    if (guard instanceof ViewImpl) {
      newGuard = guard['model']
    }

    if(newGuard.find)
      newGuard.find = parseAtElementsFromObject(newGuard.find, { ...context, pathParams })
    if(newGuard.props)
      newGuard.props = parseAtElementsFromObject(newGuard.props, { ...context, pathParams })

    return newGuard
  }) ?? []

  const passedData = props.data ?? {}
  const guardname = props.guardname as string ?? 'default'

  let nextView = page
  if (guards instanceof Array && guards.length > 0) {
    let guard = guards[0]

    guard.props = {
      ...(guard.props ?? {}),
      data: {
      ...passedData, [guardname]: data
      },
      page,
      guards: guards.slice(1),
      guardname: guard.props?.guardname ?? guard.name ?? 'default'
    }
    nextView = guard
  } else {
    if (page instanceof ViewImpl) {
      nextView = page['model']
    }
    if(nextView.find)
      nextView.find = parseAtElementsFromObject(nextView.find, { ...context, pathParams })
    if(nextView.props)
      nextView.props = parseAtElementsFromObject(nextView.props, { ...context, pathParams })
    nextView.props = {
      ...(nextView.props ?? {}), data: {
        ...passedData, [guardname]: data
      }
    }
  }
  return Object.setPrototypeOf({ model: nextView }, ViewImpl.prototype)
}

function parseAtElementsFromObject(view: any, context: ViewRequest['context']) {
  const pathParams: any = context.pathParams ?? {}
  if (!pathParams)
    return view
  if (!view)
    return view

  const jsonString = JSON.stringify(view)
  let parsedString = jsonString
  Object.entries<string>(pathParams).forEach(([key, value]) => {
    if (key != undefined && value != undefined) {
      parsedString = parsedString.replaceAll(`@route.${key}`, value)
    }
  });

  return JSON.parse(parsedString)
}
