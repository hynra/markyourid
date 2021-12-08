import type {NextApiRequest, NextApiResponse} from 'next'
import nc from "next-connect"
import {decodeBase64Image, Imgbb} from "../../common/helper";
import { NFTStorage, File } from 'nft.storage'
import {NftMetadata} from "../../common/nft_metadata";


const handler = nc<NextApiRequest, NextApiResponse>()



handler.post<NextApiRequest, NextApiResponse>(async (req, res) => {

    const {type} = req.query

    if (type === 'base64') {
        let reqMetadata: NftMetadata = req.body
        if (!reqMetadata) res.status(422).send({status: 422, message: "Parameter not complete"})
        else {
            try {

                const imageBuffer = decodeBase64Image(reqMetadata.image);

                const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGUwNmE0RTlFZmViODBFNDI0YjczNDgwMTMyNjE5NDcyOGEzRGM3QTIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzODg2ODgwNTUzOSwibmFtZSI6Im1hcmt5b3VyLmlkIG1haW4ifQ.jwv7vSBQcIEvovQkXRtp8Sla69XeryTgTpaojAUr_fE'
                const client = new NFTStorage({ token: apiKey });


                const metadata = await client.store({
                    name: reqMetadata.name,
                    description: reqMetadata.description,
                    attributes: reqMetadata.attributes,
                    // @ts-ignore
                    image: new File([imageBuffer.data], new Date().getTime().toString()+'.jpg', { type: 'image/jpg' })
                });

                /*console.log('IPFS URL for the metadata:', metadata.url)
                console.log('metadata.json contents:\n', metadata.data)
                console.log(
                    'metadata.json contents with IPFS gateway URLs:\n',
                    metadata.embed()
                )*/

                console.log(metadata)

                res.status(200).send({metadata})

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
