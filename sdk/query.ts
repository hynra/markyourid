import {IRaribleSdk} from "@rarible/sdk/build/domain"
import {GetItemByIdRequest, GetItemsByOwnerRequest, Item, Items} from "@rarible/api-client";
import axios from "axios";

export const fetchUserItems = async (sdk: IRaribleSdk, address: string, continuation?: string): Promise<Items> => {
    try {
        let option: GetItemsByOwnerRequest = {
            owner: address,
            // size: 2
        }

        if (continuation) {
            option.continuation = continuation;
        }

        return await sdk.apis.item.getItemsByOwner(option);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const getItemById = async (sdk: IRaribleSdk, itemId: string): Promise<Item> => {
    const option: GetItemByIdRequest = {
        itemId: itemId
    }
    try {
        return await sdk.apis.item.getItemById(option);
    } catch (e) {
        console.log(e);
        throw  e;
    }
}

export const getItemByIdNoSDK = async (itemId: string): Promise<Item> => {
    const url = `https://api.rarible.org/v0.1/items/${itemId}`
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
        throw  e;
    }
}
