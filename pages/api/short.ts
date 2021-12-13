import nc from "next-connect"
import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";

const handler = nc<NextApiRequest, NextApiResponse>();

const cuttLyApiKey = '6bd1e76ffb8deaf4561d21810f17e3a66b1d2';

handler.post<NextApiRequest, NextApiResponse>(async (req, res) => {

    const {url} = req.body;

    if(!url){
        res.status(422).send({status: 422, message: "Parameter not complete"});
    } else {
        if(url.startsWith('https://rarible.com/token/') || url.startsWith('https://markyour.id/item/')) {
            const cuttLyUrl = `https://cutt.ly/api/api.php?key=${cuttLyApiKey}&short=${url}`
            const resp = await axios.get(cuttLyUrl);
            res.status(200).send(resp.data);
        } else {
            res.status(402).send({status: 422, message: "Not allowed url"});
        }
    }

})

export default handler
