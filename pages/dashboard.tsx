import React from "react";
import {useEthereumProvider} from "../common/blockchain-provider";
import HeaderNav from "../components/header";
import Layout from "../components/layout";
import {useMetaMask} from "metamask-react";
import {useRouter} from "next/router";
import {MetamaskConnectionState} from "../common/common_enum";
import PreLoad from "../components/preload";
import {DURATION, useSnackbar} from "baseui/snackbar";
import {Button} from "baseui/button";

import { useSdk } from "../sdk/use-sdk"
import { IRaribleSdk } from "@rarible/sdk/build/domain"


const Dashboard: React.FC = () => {

    const {enqueue, dequeue} = useSnackbar();
    const router = useRouter();
    const rarepress = useEthereumProvider();

    const { sdk, connect, wallet } = useSdk("prod");

    console.log(sdk)

    const {status, account} = useMetaMask();



    React.useEffect(() => {
        if ((window as any).ethereum) {
            handleInit();

        } else {
            window.addEventListener('ethereum#initialized', handleInit, {
                once: true,
            })
            setTimeout(handleInit, 3000) // 3 seconds
        }

    }, [])


    function handleInit() {
        const { ethereum } = window as any
        if (ethereum && ethereum.isMetaMask) {

        } else {
            console.log('Please install MetaMask!')
        }
    }


    if (status === MetamaskConnectionState.NotConnected || status === MetamaskConnectionState.Unavailable) {
        router.push('/').then();
    } else if (status as MetamaskConnectionState !== MetamaskConnectionState.Connected) {
        return <PreLoad/>
    }

    const fetchToken = async () => {
        try {
            let tokens = await rarepress.token.query({
                "select": ["tokenId"],
                "from": "creators",
                "where": ["address",  "0xf6793da657495ffeff9ee6350824910abc21356c"],
                "limit": 10,
                "order": ["created_at", "desc"]
            });
            console.log(tokens);
        }catch (e) {
            console.log(e);
        }
    }


    return (
        <div>
            <HeaderNav/>
            <Layout>
                <Button onClick={fetchToken}>Load</Button>
            </Layout>
        </div>
    )
}

export default Dashboard;
