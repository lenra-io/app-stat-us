import { Api, ListenerRequest } from '@lenra/app';
import { StatEndpoint } from '../classes/StatEndpoint';

export default async function(props: ListenerRequest['props'], event: ListenerRequest['event'], api: Api) {
  console.log(props.post, props.settings, event)
  const endpoint = await api.data.coll(StatEndpoint).getDoc(props.endpoint as string)
  StatEndpoint.types.find((value) => value.name == props.endpoint).action({ ...props, endpoint }, event, api)
}
