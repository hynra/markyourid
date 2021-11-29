import type {NextApiRequest, NextApiResponse} from 'next'
import nc from "next-connect"
import {Imgbb} from "../../common/helper";


const handler = nc<NextApiRequest, NextApiResponse>()

const url = 'https://api.imgbb.com/1/upload?key=f6f0d3c28a69038767718245c855f0aa'


handler.post<NextApiRequest, NextApiResponse>(async (req, res) => {

    const {type} = req.query

    if (type === 'base64') {
        const {image} = req.body
        if (!image) res.status(422).send({status: 422, message: "Parameter not complete"})
        else {
            try {
                const cleanImage = image.split(',')[1]
                const imgbb = new Imgbb({
                    key: "f6f0d3c28a69038767718245c855f0aa",
                })
                const resp = await imgbb.upload(cleanImage)
                console.log(resp)
                if(resp.status === false){
                    res.status(503).send({status: 501, message: "Server temporary busy or down, please try again later"})
                } else {
                    res.status(200).send({url: resp.data.display_url})
                }
            }catch (e) {
                console.log("err" ,e)
                res.status(503).send({status: 501, message: "Server temporary busy or down, please try again later"})
            }

        }
    } else {
        res.status(503).send({status: 401, message: "Missing properties"})
    }

});

export default handler

export const config = {
    api: {
        // bodyParser: true,
        bodyParser: {
            sizeLimit: '1mb',
        },
    }
}
