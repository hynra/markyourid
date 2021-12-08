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
import {MintRequest} from "@rarible/sdk/build/nft/mint/mint-request.type";
import BigNumber from "bignumber.js";



const Create: React.FC = () => {

    const {sdk, wallet} = useSdk("prod");
    const {status, account} = useMetaMask();
    const router = useRouter();
    const [collectionId, setCollectionId] = React.useState('ETHEREUM:0xF6793dA657495ffeFF9Ee6350824910Abc21356C');
    const [lazy, setLazy] = React.useState<boolean>(true);
    const [supply, setSupply] = React.useState<string>("1");
    const [loading, setLoading] = React.useState<boolean>(false);
    const {enqueue, dequeue} = useSnackbar();


    React.useEffect(() => {
        if (!wallet)
            return;

    }, [wallet, account]);

    const publish = async (metadata: NftMetadata) => {
        setLoading(true);
        try {
            /*const metadataResp = await uploadMetadata(metadata);
            console.log(metadataResp);
            setLoading(false);*/
            const cid = "ipfs://bafyreid427bp5kfh2vgywst6nr6kixose4kqhfg2v3xnftqjfho7ncdkju/metadata.json";
            const collId = toUnionAddress("ETHEREUM:0xF6793dA657495ffeFF9Ee6350824910Abc21356C");
            const collection = await sdk.apis.collection.getCollectionById({ collection: collId });
            const {submit} = await sdk.nft.mint({ collection });
            setLoading(false);
            const mintReq: MintRequest = {
                lazyMint: true,
                supply: 1,
                uri: cid

            }
            const response = await submit(mintReq);
            console.log(response)

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
        <MainLayout path='/create' address={wallet?.address}>
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
