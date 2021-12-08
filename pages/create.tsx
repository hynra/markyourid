import React from "react";
import {useSdk} from "../sdk/use-sdk";
import MainLayout from "../components/main_layout";
import {useMetaMask} from "metamask-react";
import {MetamaskConnectionState} from "../common/common_enum";
import PreLoad from "../components/preload";
import {useRouter} from "next/router";
import ToNftCanvas from "../components/to-nft-canvas";
import {uploadBase64Image, uploadMetadata} from "../common/helper";
import {NftMetadata} from "../common/nft_metadata";
import {Delete} from "baseui/icon";
import {useSnackbar} from "baseui/snackbar";
import {toUnionAddress} from "@rarible/types";
// import {MintRequest} from "@rarible/sdk/build/nft/mint/mint-request.type";
import BigNumber from "bignumber.js";
import {useEthereumProvider} from "../common/blockchain-provider";
import {Maybe} from "../common/maybe";
import {MintRequest} from "@rarible/sdk/build/types/nft/mint/mint-request.type";
import axios from "axios";


const Create: React.FC = () => {

    const {sdk, wallet} = useSdk("prod");
    const {status, account} = useMetaMask();
    const router = useRouter();
    const [collectionId, setCollectionId] = React.useState('ETHEREUM:0xf6793da657495ffeff9ee6350824910abc21356c');
    const [address, setAddress] = React.useState<Maybe<string>>(undefined)
    const [lazy, setLazy] = React.useState<boolean>(true);
    const [supply, setSupply] = React.useState<string>("1");
    const [loading, setLoading] = React.useState<boolean>(false);
    const {enqueue, dequeue} = useSnackbar();
    const rarepress = useEthereumProvider();


    React.useEffect(() => {
        if (!wallet)
            return;


    }, [wallet, account]);

    const publish = async (metadata: NftMetadata) => {
        setLoading(true);
        try {
            // const metadataResp = await uploadMetadata(metadata);
            // console.log(metadataResp);


            let token = await rarepress.token.build({
                type: "ERC721",
                uri: "/ipfs/bafyreihozad6wvayum5jbxv6pduuwkvpbuqbfdmphq5jkkaonj25yfjshe/metadata.json",
                tokenURI: "/ipfs/bafyreihozad6wvayum5jbxv6pduuwkvpbuqbfdmphq5jkkaonj25yfjshe/metadata.json",
                metadata: {
                    "name": "MarkYourID Testing Out 0",
                    "description": "Name: Hendra Permana\nDesc: MarkYourID Testing Out 0\nDate: 9/12/2021",
                    "attributes": [{
                        "trait_type": "powered by",
                        "value": "https://markyour.id"
                    }, {
                        "trait_type": "curator",
                        "value": "0xbdb384a764605c41b04754702be8ef4b5a0f3865"
                    }, {
                        "trait_type": "created at",
                        "value": "Wed, 08 Dec 2021 17:01:12 GMT"
                    }, {
                        "trait_type": "purpose",
                        "value": "MarkYourID Testing Out 0"
                    }],
                    "image": "/ipfs/bafybeieuypwcnpklbenucsn2gqdurqi3n2axad2akpw2n33per3pzgpkf4/1638983399341.jpg"
                }
            });


            let signed = await rarepress.token.sign(token)


            delete signed.metadata
            delete signed.tokenURI

            let res = await axios.post("https://api.rarible.com/protocol/v0.1/ethereum/nft/mints", signed);
            console.log(res.data)

            setLoading(false);

        } catch (e) {
            console.log(e)
            setLoading(false);
            enqueue({
                message: 'Oops! Something went wrong, try again later.',
                startEnhancer: ({size}) => <Delete size={size}/>,
            });
        }
    }


    if (status === MetamaskConnectionState.NotConnected || status === MetamaskConnectionState.Unavailable) {
        router.push('/').then();
    } else if (status as MetamaskConnectionState !== MetamaskConnectionState.Connected) {
        return <PreLoad/>
    }


    return (
        <MainLayout path='/create' address={wallet?.address}>
            {loading ? <PreLoad/> : <ToNftCanvas
                accountAddress={account}
                onPublish={(metadata: NftMetadata) => {
                    console.log(metadata);
                    publish(metadata).then()
                }}
            />}
        </MainLayout>
    )

}

export default Create;
