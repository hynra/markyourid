import {NftMetadata} from "../common/nft_metadata";
import {uploadMetadata} from "../common/helper";
import {RaribleSdk} from "@rarible/protocol-ethereum-sdk";
import {MintRequest} from "@rarible/protocol-ethereum-sdk/build/nft/mint";

export const mintNftEth = async (metadata: NftMetadata, lazy: boolean, rarepress: any, sdk: RaribleSdk, captcha: string): Promise<boolean> => {
    try {
        const metadataResp = await uploadMetadata(metadata, captcha);

        const collection = await sdk.apis.nftCollection.getNftCollectionById({collection: '0xF6793dA657495ffeFF9Ee6350824910Abc21356C'});

        let tokenMetaUri: string = metadataResp.metadata.url;
        if(!tokenMetaUri.startsWith("ipfs://ipfs/")){
            tokenMetaUri = tokenMetaUri.replace("ipfs://", "ipfs://ipfs/");
        }
        const mintReq: MintRequest = {
            // @ts-ignore
            collection: collection,
            uri: tokenMetaUri,
            lazy
        }
        await sdk.nft.mint(mintReq)
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }

}
