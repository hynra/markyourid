import React from "react";
import {useSdk} from "../sdk/use-sdk";
import MainLayout from "../components/main_layout";
import {useMetaMask} from "metamask-react";
import {MetamaskConnectionState} from "../common/common_enum";
import PreLoad from "../components/preload";
import {useRouter} from "next/router";
import ToNftCanvas from "../components/to-nft-canvas";
import {NftMetadata} from "../common/nft_metadata";
import {Check, Delete} from "baseui/icon";
import {useSnackbar} from "baseui/snackbar";
import {useEthereumProvider} from "../common/blockchain-provider";
import {mintNft} from "../sdk/mint";
import {useStyletron} from "baseui";


const Create: React.FC = () => {

    const {sdk, wallet} = useSdk("prod");
    const {status, account} = useMetaMask();

    const router = useRouter();
    const [loading, setLoading] = React.useState<boolean>(false);
    const {enqueue} = useSnackbar();
    const rarepress = useEthereumProvider();
    const [css, theme] = useStyletron();

    React.useEffect(() => {
        if (!wallet)
            return;


    }, [wallet, account]);

    const publish = async (metadata: NftMetadata, lazy: boolean) => {
        setLoading(true);
        const isMinted = await mintNft(
            metadata,
            lazy,
            rarepress,
            sdk
        )

        if(!isMinted){
            enqueue({
                message: 'Oops! Something went wrong, try again later.',
                startEnhancer: ({size}) => <Delete size={size}/>,
            });
        } else {
            enqueue({
                message: 'Congratulation, your NFT has been minted',
                startEnhancer: ({size}) => <Check size={size}/>,
            });
            router.push('/dashboard').then();
        }


        setLoading(false);
    }


    if (status === MetamaskConnectionState.NotConnected || status === MetamaskConnectionState.Unavailable) {
        router.push('/').then();
    } else if (status as MetamaskConnectionState !== MetamaskConnectionState.Connected) {
        return <PreLoad/>
    }


    return (
        <MainLayout path='/create' address={wallet?.address}>
            {loading && <PreLoad/>}
            {
                account &&
                <div
                    className={css({
                        display: (loading) ? 'none' : 'block'
                    })}
                >
                    <ToNftCanvas
                        accountAddress={account}
                        onPublish={(metadata: NftMetadata, isLazy: boolean) => {
                            publish(metadata, isLazy).then()
                        }}
                    />
                </div>
            }
        </MainLayout>
    )

}

export default Create;
