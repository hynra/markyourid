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
import BigNumber from "bignumber.js";
import {useEthereumProvider} from "../common/blockchain-provider";
import {Maybe} from "../common/maybe";
import {MintRequest} from "@rarible/sdk/build/types/nft/mint/mint-request.type";



const Create: React.FC = () => {

    const {sdk, wallet} = useSdk("staging");
    const {status, account} = useMetaMask();
    const router = useRouter();
    const [collectionId, setCollectionId] = React.useState('ETHEREUM:0x6ede7f3c26975aad32a475e1021d8f6f39c89d82');
    const [address, setAddress] = React.useState<Maybe<string>>(undefined)
    const [lazy, setLazy] = React.useState<boolean>(true);
    const [supply, setSupply] = React.useState<string>("1");
    const [loading, setLoading] = React.useState<boolean>(false);
    const {enqueue, dequeue} = useSnackbar();
    const rarepress = useEthereumProvider();


    React.useEffect(() => {
        if (!wallet)
            return;

        wallet?.ethereum.getFrom()
            .then((address) => setAddress(address))
            .catch(() => setAddress(undefined))

    }, [wallet, account]);

    const publish = async (metadata: NftMetadata) => {
        setLoading(true);
        try {
            /*const metadataResp = await uploadMetadata(metadata);
            console.log(metadataResp);
            setLoading(false);*/
            const cid = "ipfs://bafyreid427bp5kfh2vgywst6nr6kixose4kqhfg2v3xnftqjfho7ncdkju/metadata.json";
            const collId = toUnionAddress(collectionId);
            const collection = await sdk.apis.collection.getCollectionById({ collection: collId });
            console.log(collection)
            const {submit, supportsLazyMint} = await sdk.nft.mint({ collection });

            console.log("support ", supportsLazyMint)
            const mintReq: MintRequest = {

                lazyMint: supportsLazyMint,
                supply: 1,
                uri: cid

            }
            await submit(mintReq);
            setLoading(false);

        }catch (e) {
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


    return(
        <MainLayout path='/create' address={address}>
            {loading ? <PreLoad /> : <ToNftCanvas
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
