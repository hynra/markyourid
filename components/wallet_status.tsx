import * as React from "react";
import {MetamaskConnectionState} from "../common/common_enum";
import {Button} from "baseui/button";

const WalletStatus: React.FC<{ walletStatus: MetamaskConnectionState, onClickConnect: Function, account: string }> = (
    {
        walletStatus,
        onClickConnect,
        account
    }
) => {
    switch (walletStatus) {
        case MetamaskConnectionState.Connected:
            return <div>Connected {account}</div>
        case MetamaskConnectionState.Connecting:
            return <div>Connecting...</div>
        case MetamaskConnectionState.Initializing:
            return <div>Synchronisation with MetaMask ongoing...</div>
        case MetamaskConnectionState.NotConnected:
            return <Button onClick={() => {
                onClickConnect();
            }}>Connect to MetaMask</Button>
        case MetamaskConnectionState.Unavailable:
            return <div>MetaMask not available :(</div>
    }
}

export default WalletStatus
