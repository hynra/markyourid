import {RaribleSdk} from "@rarible/protocol-ethereum-sdk";
import {GetNftItemsByOwnerRequest, NftItem, NftItems} from "@rarible/ethereum-api-client";
import {sanitizedUnionAddress} from "../common/helper";
import axios from "axios";


export const fetchUserItemsNoSdkEth = async (address: string, continuation?: string): Promise<NftItems> => {
    const sanitizedAddress = sanitizedUnionAddress(address);
    let url: string = `https://api.rarible.com/protocol/v0.1/ethereum/nft/items/byOwner?owner=${sanitizedAddress}`;
    if(continuation){
        url = `https://api.rarible.com/protocol/v0.1/ethereum/nft/items/byOwner?owner=${sanitizedAddress}&continuation=${continuation}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export const fetchUserItemsEth = async (sdk: RaribleSdk, address: string, continuation?: string): Promise<NftItems> => {
    try {
        /*let option: GetNftItemsByOwnerRequest = {
            owner: sanitizedUnionAddress(address),
        }

        if (continuation) {
            option.continuation = continuation;
        }

        return await sdk.apis.nftItem.getNftItemsByOwner(option);*/

        // use no sdk because fetching performance

        return fetchUserItemsNoSdkEth(address, continuation);

    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const getItemByIdNoSdkEth = async (itemId: string): Promise<NftItem> => {
    const url = `https://api.rarible.com/protocol/v0.1/ethereum/nft/items/${itemId}`
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
        throw  e;
    }
}