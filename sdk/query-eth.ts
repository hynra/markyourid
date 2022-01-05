import {GetItemsByOwnerRequest, Items} from "@rarible/api-client";
import {RaribleSdk} from "@rarible/protocol-ethereum-sdk";
import {GetNftItemsByOwnerRequest, NftItems} from "@rarible/ethereum-api-client";
import {sanitizedUnionAddress} from "../common/helper";

export const fetchUserItemsEth = async (sdk: RaribleSdk, address: string, continuation?: string): Promise<NftItems> => {
    try {
        let option: GetNftItemsByOwnerRequest = {
            owner: sanitizedUnionAddress(address),
            // size: 2
        }

        if (continuation) {
            option.continuation = continuation;
        }

        return await sdk.apis.nftItem.getNftItemsByOwner(option);

    } catch (e) {
        console.log(e);
        throw e;
    }
}