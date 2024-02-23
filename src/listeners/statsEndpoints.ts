import { Api, ListenerRequest } from '@lenra/app';



export default async function(props: ListenerRequest['props'], event: ListenerRequest['event'], api: Api) {
  console.log(props.post, props.settings, event)
}
