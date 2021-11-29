import axios from "axios";
const rp = require('request-promise');

export async function uploadBase64Image(file: string) {
    const url = '/api/upload?type=base64'
    try {
        const resp = await axios.post(url, {image: file}, {})
        return resp.data.url
    } catch (e) {
        throw e;
    }
}



export class Imgbb {
    private readonly key: any;
    constructor({key}) {
        this.key = key;
    }

    async upload(image, name = null) {
        const options = {
            method: 'POST',
            uri: 'https://api.imgbb.com/1/upload',
            form: {
                key: this.key,
                image,
                name,
                expiration: 600
            },
            json: true,
        };
        try {
            const res = await rp(options);
            return {
                'success': true,
                'status': 200,
                'data': res.data,
            };
        } catch (e) {
            return {
                'success': false,
                'status': e.error.status_code,
                'message': e.error.status_txt,
                'error': e.error.error,
            };
        }
    }
}
