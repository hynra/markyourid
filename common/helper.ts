import axios from "axios";

const FormData = require('form-data');
// const fs = require('fs');

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

        const formData = new FormData();
        try {
            const url = 'https://api.imgbb.com/1/upload'
            formData.append('image', image);
            // formData.append('key', this.key);
            formData.append('key', this.key);
            formData.append('expiration', 600);

            const config = {
                headers: formData.getHeaders()
            }
            const resp = await axios.post(url, formData, config);
            const data = resp.data.data;
            return {
                'success': true,
                'status': 200,
                'data': data,
            };
        }catch (e) {
            return {
                'success': false,
                'status': e.error.status_code,
                'message': e.error.status_txt,
                'error': e.error.error,
            };
        }

        /* const options = {
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
        } */
    }
}
