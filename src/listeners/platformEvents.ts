import { Api, ListenerRequest } from '@lenra/app';
import Platform from '../classes/Platform';

export async function onPlatformCreate(_platform: ListenerRequest['props'], event: ListenerRequest['event'], api: Api) {
    const platform = event.value as Platform
    await api.data.coll(Platform).createDoc({
        ...platform,
        slug: normilizePlatformName(platform.name)
    });
}

export async function onPlatformUpdate(platform: ListenerRequest['props'], _event: ListenerRequest['event'], api: Api) {
    await api.data.coll(Platform).updateMany({ _id: platform._id }, platform);
}

function normilizePlatformName(name: string) : string {
    return name.toLowerCase().replaceAll('_', '-').replaceAll('#', '')
}
