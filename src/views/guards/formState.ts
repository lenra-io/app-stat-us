'use strict'

import { ViewRequest } from "@lenra/app";
import guards from "./guards"

export default (data: ViewRequest['data'], props: ViewRequest['props'], context: ViewRequest['context']) => {
  return guards(data, props, context)
}
