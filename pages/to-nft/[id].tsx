import React from "react";
import HeaderNav from "../../components/header";
import {BlockProps} from "baseui/block";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {useStyletron} from "baseui";
import * as Rareterm from "rareterm";
import detectEthereumProvider from '@metamask/detect-provider'
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader} from "baseui/modal";
import Router, {useRouter} from 'next/router'
import {Spinner} from "baseui/spinner";
import ToNftCanvas from "../../components/to-nft-canvas";
import WmModel, {getWmById} from "../../common/wm_model";
import {uploadBase64Image} from "../../common/helper";
import {useSnackbar, DURATION, SnackbarProvider} from "baseui/snackbar";
import {Delete} from "baseui/icon";


const itemProps: BlockProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40px'
};

enum MetamaskState {
    LOADING,
    AVAILABLE,
    NOTFOUND
}

const ToNFTId: React.FC = () => {

    const router = useRouter();
    const {id: wmId} = router.query;

    const [css, theme] = useStyletron();
    const [rarepressObject, setRarepressObject] = React.useState<any>(null);
    const [metamaskNotFound, setMetamaskNotFound] = React.useState<MetamaskState>(MetamaskState.LOADING);
    const [accountAddress, setAccountAddress] = React.useState<string>();
    const [currentWm, setCurrentWm] = React.useState<WmModel>(null);
    const [currText, setCurrText] = React.useState(
        `Description: Write description\nDate: ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
    );
    const [account, setAccount] = React.useState<any>(null);
    const [isLoading, setLoading] = React.useState(false);
    const {enqueue, dequeue} = useSnackbar();
    const [finalToken, setFinalToken] = React.useState(null);
    const [finalUrl, setFinalUrl] = React.useState(null);


    const initRarepress = async (): Promise<any> => {
        try {
            const rarepress = new Rareterm();
            const acc = await rarepress.init({host: "https://eth.rarenet.app/v1"});
            setAccount(acc);
            return rarepress;
        } catch (e) {
            throw  e;
        }
    }

    const uploadNft = async (image: string, title: string, additionalText: string) => {
        try {
            setLoading(true);
            enqueue(
                {
                    message: 'Uploading your NFT to Rarible',
                    progress: true,
                },
                DURATION.infinite,
            );


            const imageUrl = await uploadBase64Image(image);
            console.log(imageUrl);
            const cid = await rarepressObject.fs.add(imageUrl);
            let token = await rarepressObject.token.create({
                type: "ERC721",
                metadata: {
                    name: title,
                    description: "Generated for securing ID Card submission, curated by " + account + ". \n" + currentWm.text+" \n"+additionalText,
                    image: "/ipfs/" + cid,
                    attributes: [
                        {trait_type: "powered by", value: "https://markyour.id"},
                        {trait_type: "curator", value: account},
                        {trait_type: "date", value: new Date().toUTCString()},
                        {trait_type: "purpose", title}
                    ]
                },
            });

            await rarepressObject.fs.push(cid)
            await rarepressObject.fs.push(token.tokenURI)
            let sent = await rarepressObject.token.send(token)
            console.log(cid);
            console.log(sent, token);
            console.log("https://rarible.com/token/" + sent.id);
            setFinalToken(sent.id);
            setFinalUrl("https://rarible.com/token/" + sent.id);
            setLoading(false);
            dequeue();
            enqueue({
                message: 'Success Upload your NFT',
                startEnhancer: ({size}) => <Delete size={size} />,
            })
        } catch (e) {
            console.log(e);
            setLoading(false);
            dequeue();
            enqueue({
                message: 'Oops, something went wrong. Try again later.',
                startEnhancer: ({size}) => <Delete size={size} />,
            })
        }
    }

    React.useEffect(() => {
        if (rarepressObject === null) {
            detectEthereumProvider().then((provider) => {
                if (!provider) {
                    setMetamaskNotFound(MetamaskState.NOTFOUND);
                } else {
                    setMetamaskNotFound(MetamaskState.AVAILABLE);
                    return initRarepress();
                }
            }).then((rp) => {
                setAccountAddress(rp.account);
                setRarepressObject(rp);
            }).catch((err) => {
                console.error(err);
                setMetamaskNotFound(MetamaskState.NOTFOUND);
            })
        }


        if (currentWm === null) {
            const tmpWm: WmModel = getWmById(wmId);
            if (tmpWm === null) {
                Router.push('/').then();
            } else {
                setCurrentWm(tmpWm);
                setCurrText(tmpWm.text);
            }
        }
    }, [])

    return (<>
        <SnackbarProvider>
            <HeaderNav/>

            <Modal onClose={() => {

            }}
                   isOpen={metamaskNotFound === MetamaskState.NOTFOUND}
                   closeable={false}
            >
                <ModalHeader>Metamask Not Found</ModalHeader>
                <ModalBody>
                    Please install Metamask in your browser to access this page
                </ModalBody>
                <ModalFooter>
                    <ModalButton onClick={() => {
                        Router.push('/').then();
                    }}>Okay</ModalButton>
                </ModalFooter>
            </Modal>

            <FlexGrid
                flexGridColumnCount={[1]}
                flexGridColumnGap="scale800"
                flexGridRowGap="scale800"
            >
                <FlexGridItem {...itemProps} width="100%">
                    <div
                        className={css({
                            width: '580px',
                            margin: 'auto',
                            alignItems: 'center',
                            justifyContent: 'center',
                        })}
                    >
                        {
                            metamaskNotFound === MetamaskState.LOADING &&
                            <Spinner
                                size={96}
                                overrides={{
                                    Svg: {
                                        props: {
                                            'data-label': 'data-label',
                                        },
                                        style: ({$theme}) => ({
                                            width: '100%'
                                        }),
                                    },
                                }}
                            />
                        }

                        {MetamaskState.AVAILABLE && accountAddress && !isLoading &&
                        <ToNftCanvas
                            accountAddress={accountAddress}
                            currText={currText}
                            currModel={currentWm}
                            onPublish={(title, image, additionalText) => {
                                uploadNft(image, title, additionalText).then()
                            }}
                        />}

                        {
                            isLoading &&
                            <Spinner
                                size={96}
                                overrides={{
                                    Svg: {
                                        props: {
                                            'data-label': 'data-label',
                                        },
                                        style: ({$theme}) => ({
                                            width: '100%'
                                        }),
                                    },
                                }}
                            />
                        }

                    </div>

                </FlexGridItem>
            </FlexGrid>
        </SnackbarProvider>
    </>);
}

export default ToNFTId;
