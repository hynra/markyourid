import {NftMetadata} from "../common/nft_metadata";
import {getDwebLinkUrl, uploadMetadata} from "../common/helper";
import axios from "axios";
import {IRaribleSdk} from "@rarible/sdk/build/domain";
import {MintRequest} from "@rarible/sdk/build/types/nft/mint/mint-request.type";
import {toUnionAddress} from "@rarible/types";

export const mintNft = async (metadata: NftMetadata, lazy: boolean, rarepress: any, sdk: IRaribleSdk, captcha: string): Promise<boolean> => {
    try {
        const metadataResp = await uploadMetadata(metadata, captcha);
        if(lazy){
            const url = metadataResp.metadata.url;
            let res = await axios.get(getDwebLinkUrl(url));
            let token = await rarepress.token.build({
                type: "ERC721",
                uri: url,
                tokenURI: url,
                metadata: res.data
            });
            let signed = await rarepress.token.sign(token)

            delete signed.metadata
            delete signed.tokenURI
            await axios.post("https://api.rarible.com/protocol/v0.1/ethereum/nft/mints", signed);
            return true;
        }else{
            const collId = toUnionAddress("ETHEREUM:0xF6793dA657495ffeFF9Ee6350824910Abc21356C");
            const collection = await sdk.apis.collection.getCollectionById({ collection: collId });

            const {submit} = await sdk.nft.mint({ collection });
            const mintReq: MintRequest = {
                lazyMint: false,
                supply: 1,
                uri: metadataResp.metadata.url

            }
            await submit(mintReq);
            return true;
        }
    }catch (e) {
        console.error(e);
        return false;
    }

}
