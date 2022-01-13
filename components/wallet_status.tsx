import * as React from "react";
import {MetamaskConnectionState} from "../common/common_enum";
import {Button} from "baseui/button";
import {useStyletron} from "baseui";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import CenteredComponent from "./centered-component";
import {useRouter} from "next/router";
import {Paragraph1, Paragraph4} from "baseui/typography";
import {StyledLink as Link} from 'baseui/link';

const WalletStatus: React.FC<{ walletStatus: MetamaskConnectionState, onClickConnect: Function, account: string }> = (
    {
        walletStatus,
        onClickConnect,
        account
    }
) => {

    const [css, theme] = useStyletron();
    const router = useRouter();

    const ConnectButton: React.FC<{ walletAvailable?: boolean }> = ({walletAvailable = true}) => {
        return (
            <div>
                <CenteredComponent>
                    <Button
                        disabled={!walletAvailable}
                        onClick={() => {
                            onClickConnect();
                        }}>Connect with MetaMask</Button>
                </CenteredComponent>
                {
                    !walletAvailable &&
                    <CenteredComponent>
                        <Paragraph4>
                            <Link href="https://metamask.io/download.html">
                                Install MetaMask to continue
                            </Link>
                        </Paragraph4>
                    </CenteredComponent>

                }
            </div>
        );
    }


    const DashboardButton: React.FC = () => {
        return (
            <div>
                <CenteredComponent>
                    <Button
                        onClick={() => {
                            router.push('/dashboard').then()
                        }}>Go to Dashboard</Button>
                </CenteredComponent>
            </div>
        );
    }

    switch (walletStatus) {
        case MetamaskConnectionState.Connected:
            return <DashboardButton/>
        case MetamaskConnectionState.Connecting:
            return <CenteredComponent>
                <div>Connecting...</div>
            </CenteredComponent>
        case MetamaskConnectionState.Initializing:
            return <div>Synchronisation with MetaMask ongoing...</div>
        case MetamaskConnectionState.NotConnected:
            return <ConnectButton/>;
        case MetamaskConnectionState.Unavailable:
            // return <div>MetaMask not available :(</div>
            return <ConnectButton walletAvailable={false}/>;
    }
}

export default WalletStatus

