import {v2 as cloudinary} from 'cloudinary';

import { config } from 'dotenv';

config() ;

cloudinary.config({
    cloud_name: "dlk9qs8rd",
    api_key: "427649834529472",
    api_secret: "uqBhDy63BfVirgS1m0AIwBXgSFk"
});

export default cloudinary ;