import * as React from 'react';
import HeaderNav from "../components/header";
import Layout from "../components/layout";
import {useMetaMask} from "metamask-react";
import {MetamaskConnectionState} from "../common/common_enum";
import WalletStatus from "../components/wallet_status";
import {Router} from "next/router";

const Index: React.FC = () => {


    const {status, connect, account} = useMetaMask();


    return (
        <div>
            <HeaderNav isLogged={false}/>
            <Layout>
                <WalletStatus
                    walletStatus={status as MetamaskConnectionState}
                    onClickConnect={connect}
                    account={account}
                />
            </Layout>
        </div>
    );
};

export default Index;
