import type {NextApiRequest, NextApiResponse} from 'next'
import nc from "next-connect"
import axios from "axios";


const handler = nc<NextApiRequest, NextApiResponse>();

handler.post<NextApiRequest, NextApiResponse>(async (req, res) => {

    const {captcha} = req.body;
    if (captcha) {
        const urlToPost = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`;
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        };
        const resp = await axios.post(urlToPost, {}, {headers: headers});
        console.log(resp.data);
        res.status(200).send(resp.data);
    } else {
        res.status(503).send({status: 401, message: "Missing properties"})
    }

});


export default handler;
