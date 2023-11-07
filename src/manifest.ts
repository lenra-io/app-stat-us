import { Manifest, View } from '@lenra/app';

const manifest: Manifest = {
    lenra: {
        routes: [
            {
                path: "/",
                view: View("app")
                    .find(navigationService.collection, {
                    "user": "@me"
                  }).toJSON()
            }
        ]
    }
};

export default manifest;