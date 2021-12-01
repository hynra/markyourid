import React from "react";
import HeaderNav from "../../components/header";
import {BlockProps} from "baseui/block";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {useStyletron} from "baseui";
import * as Rareterm from "rareterm";
// @ts-ignore
import detectEthereumProvider from '@metamask/detect-provider'
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader} from "baseui/modal";
import Router, {useRouter} from 'next/router'
import {Spinner} from "baseui/spinner";
import ToNftCanvas from "../../components/to-nft-canvas";
import WmModel, {BlockChainType, getWmById, saveWm} from "../../common/wm_model";
import {uploadBase64Image} from "../../common/helper";


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


            const imageUrl = await uploadBase64Image(image);
            const cid = await rarepressObject.fs.add(imageUrl);
            let token = await rarepressObject.token.create({
                type: "ERC721",
                metadata: {
                    name: title,
                    description: "Generated for securing ID Card submission, curated by " + account + ". \n" + currentWm.text + " \n" + additionalText,
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
            setFinalToken(sent.id);
            setFinalUrl("https://rarible.com/token/" + sent.id);

            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
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

        if(finalToken && finalUrl && currentWm?.nft === null){
            const tmpWm = currentWm;
            tmpWm.nft = finalToken;
            tmpWm.nftUrl = finalUrl;
            tmpWm.blockChain = BlockChainType.Ethereum;
            saveWm(tmpWm);
            setCurrentWm(tmpWm);
        }

        if(currentWm?.nft){
            Router.push('/').then();
        }

    }, [finalToken, finalUrl, currentWm])

    return (<>
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
    </>);
}

export default ToNFTId;
