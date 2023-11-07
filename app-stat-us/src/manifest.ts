import { Manifest, View } from '@lenra/app';
import { Counter } from './classes/Counter.js';
import Platform from './classes/Platform.js';

const manifest: Manifest = {
    lenra: {
        routes: [
            {
                path: "/",
                view: View("lenra.main").toJSON()
            },
            {
                path: "/:platform",
                view: View("lenra.platform")
                    .find(Platform, {
                        slug: "@route.platform"
                    }).toJSON()
            }
        ]
    }
};

export default manifest;
