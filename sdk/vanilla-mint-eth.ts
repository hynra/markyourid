import {getWeb3} from "./use-injected-provider";
import axios from "axios";

export async function web3SignPayload(web3: any, creatorAddr: string, payload: any) {
    const msgData = JSON.stringify(payload);
    const response = await web3.currentProvider.send("eth_signTypedData_v4", [creatorAddr, msgData]);
    return response.result
}


function get721msg(contractAddr: string, tokenId: string, uri: string, creatorAddr: string, nftPrice: number) {
    return {
        "@type": "ERC721",
        "contract": contractAddr,
        "tokenId": tokenId,
        "tokenURI": uri,
        "uri": uri,
        "creators": [
            {
                account: creatorAddr,
                value: nftPrice,
            }
        ],
        "royalties": [],
    }
}


async function create721LazyNFTParams(contractAddr: string, tokenId: string, uri: string, creatorAddr: string, signature: string, nftPrice: number) {
    return {
        "@type": "ERC721",
        "contract": contractAddr,
        "tokenId": tokenId,
        "uri": uri,
        "creators": [
            {
                account: creatorAddr,
                value: nftPrice,
            }
        ],
        "royalties": [],

    }
}


function get721Payload(contractAddr: string, chainID: number, message: any) {
    return {
        "types": {
            "EIP712Domain": [
                {
                    type: "string",
                    name: "name",
                },
                {
                    type: "string",
                    name: "version",
                },
                {
                    type: "uint256",
                    name: "chainId",
                },
                {
                    type: "address",
                    name: "verifyingContract",
                }
            ],
            "Mint721": [
                {name: "tokenId", type: "uint256"},
                {name: "tokenURI", type: "string"},
                {name: "creators", type: "Part[]"},
                {name: "royalties", type: "Part[]"}
            ],
            "Part": [
                {name: "account", type: "address"},
                {name: "value", type: "uint96"}
            ]
        },
        "domain": {
            name: "Mint721",
            version: "1",
            chainId: chainID,
            verifyingContract: contractAddr,
        },
        "primaryType": "Mint721",
        "message": message
    }
}


async function customLazyMint721(
    creatorAddr,
    uri,
    nftPrice = 10000,
    collection = "0xF6793dA657495ffeFF9Ee6350824910Abc21356C",
    isLazy: boolean,
) {
    try {
        const baseEndpoint = "https://api.rarible.com"
        const contractAddress = collection
        const path = `/protocol/v0.1/ethereum/nft/collections/${contractAddress}/generate_token_id?minter=${creatorAddr}`
        const res = await axios.get(path)

        const tokenID = res.data.tokenId
        const r = res.data.signature.r
        const s = res.data.signature.s
        const v = res.data.signature.v

        const web3 = getWeb3()

        const chainId = await web3.eth.getChainId();

        const message = get721msg(contractAddress, tokenID, uri, creatorAddr, nftPrice)
        const payload = get721Payload(contractAddress, chainId, message)


        const signature = await web3SignPayload(web3, creatorAddr, payload)

        const params = {
            ...message,
            "signatures": [signature],
        }
        console.log(JSON.stringify(params))

        const createRes = await axios.post("/protocol/v0.1/ethereum/nft/mints", params)
        console.log(createRes.data)
    } catch (e) {
        console.error("ERROR in customLazyMint721")
        console.error(e)
        console.error(e.response)
    }

}
