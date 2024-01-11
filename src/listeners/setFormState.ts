import { Api, ListenerRequest } from '@lenra/app';
import Platform from '../classes/Platform';
import FormState from '../classes/FormState';

export default async function(props: ListenerRequest['props'], event: ListenerRequest['event'], api: Api) {
    const platform = event.value as Platform
    const property = props.property as string
    await api.data.coll(FormState).updateMany({
        user: '@me'
    }, {
        _slug: props.slug,
        [property]: props.value
    })
}
