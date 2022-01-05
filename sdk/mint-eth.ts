import {NftMetadata} from "../common/nft_metadata";
import {uploadMetadata} from "../common/helper";
import {RaribleSdk} from "@rarible/protocol-ethereum-sdk";
import {MintRequest} from "@rarible/protocol-ethereum-sdk/build/nft/mint";
import {ERC721VersionEnum} from "@rarible/protocol-ethereum-sdk/build/nft/contracts/domain";
import {NftCollectionType} from "@rarible/ethereum-api-client";

export const mintNftEth = async (metadata: NftMetadata, lazy: boolean, rarepress: any, sdk: RaribleSdk, captcha: string): Promise<boolean> => {
    try {
        const metadataResp = await uploadMetadata(metadata, captcha);

        const collection = await sdk.apis.nftCollection.getNftCollectionById({collection: '0xF6793dA657495ffeFF9Ee6350824910Abc21356C'});
        const mintReq: MintRequest = {
            collection: {
                id: collection.id,
                type: NftCollectionType.ERC721,
                supportsLazyMint: collection.supportsLazyMint,
                features: collection.features,
                name: collection.name,
                version: ERC721VersionEnum.ERC721V3,
            },
            supply: 1,
            uri: metadataResp.metadata.url,
            lazy

        }
        await sdk.nft.mint(mintReq)
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }

}
