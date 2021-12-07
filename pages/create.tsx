import React from "react";
import {useSdk} from "../sdk/use-sdk";
import MainLayout from "../components/main_layout";
import {useMetaMask} from "metamask-react";
import {MetamaskConnectionState} from "../common/common_enum";
import PreLoad from "../components/preload";
import {useRouter} from "next/router";
import ToNftCanvas from "../components/to-nft-canvas";


const Create: React.FC = () => {

    const {sdk, wallet} = useSdk("prod");
    const {status, account} = useMetaMask();
    const router = useRouter();

    React.useEffect(() => {
        if (!wallet)
            return;

    }, [wallet, account]);



    if (status === MetamaskConnectionState.NotConnected || status === MetamaskConnectionState.Unavailable) {
        router.push('/').then();
    } else if (status as MetamaskConnectionState !== MetamaskConnectionState.Connected) {
        return <PreLoad/>
    }

    return(
        <MainLayout path='/create' address={wallet?.address}>
            <ToNftCanvas
                accountAddress={account}
                currText={"Testing"}
                // currModel={currentWm}
                onPublish={(title, image, additionalText) => {

                }}
            />
        </MainLayout>
    )

}

export default Create;
