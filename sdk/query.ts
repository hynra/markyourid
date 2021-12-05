import {IRaribleSdk} from "@rarible/sdk/build/domain"
import {GetItemsByOwnerRequest, Items} from "@rarible/api-client";

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
