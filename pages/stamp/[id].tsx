import React from "react";
import {useRouter} from "next/router";
import {useMetaMask} from "metamask-react";
import {useStyletron} from "baseui";
import {Item} from "@rarible/api-client";
import {getItemByIdNoSDK} from "../../sdk/query";
import {checkIfItemGenerated} from "../../common/helper";
import {MetamaskConnectionState} from "../../common/common_enum";
import PreLoad from "../../components/preload";
import MainLayout from "../../components/main_layout";
import StampEditor from "../../components/editor/stamp_editor";
import ComponentPopUp from "../../components/modals/component_popup";
import {Label2} from "baseui/typography";
import {Button} from "baseui/button";
import {useSnackbar} from "baseui/snackbar";
import {Delete} from "baseui/icon";

const StampID: React.FC = () => {

    const router = useRouter();
    const {id: itemId} = router.query;

    const {status, account} = useMetaMask();
    const {enqueue, dequeue} = useSnackbar();
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [css, theme] = useStyletron();
    const [item, setItem] = React.useState<Item>(null);
    const [isValid, setValid] = React.useState<boolean>(true);

    const getOwner = (_item: Item): string => {
        return _item.owners.length === 0 ?
            _item.creators[0].account.replace("ETHEREUM:", "") : _item.owners[0].replace("ETHEREUM:", "");
    }

    const getCreator = (_item: Item): string => {
        return _item.creators[0].account.replace("ETHEREUM:", "");
    }

    const fetchItem = async () => {
        try {
            const nftItem: Item = await getItemByIdNoSDK(itemId as string);
            setValid(checkIfItemGenerated(nftItem));
            setItem(nftItem);
            setLoading(false);
            if(getOwner(nftItem) !== account || getCreator(nftItem) !== account){
                setValid(false);
                return;
            }
        } catch (e) {

            console.log(e)

            enqueue({
                message: 'Oops! Something went wrong, try again later.',
                startEnhancer: ({size}) => <Delete size={size}/>,
            });

        }
    }

    function openRarible() {
        const url = `https://rarible.com/token/${item.id.replace('ETHEREUM:', '')}`
        router.push(url).then()
    }


    React.useEffect(() => {

        if (!itemId) return;

        if (item === null && account)
            fetchItem().then();


    }, [itemId, account])

    if (status === MetamaskConnectionState.NotConnected || status === MetamaskConnectionState.Unavailable) {
        router.push('/').then();
    } else if (status as MetamaskConnectionState !== MetamaskConnectionState.Connected) {
        return <PreLoad/>
    }


    return (
        <MainLayout path={`/stamp/${itemId}`} address={account}>
            {isLoading && <PreLoad/>}
            {isValid === false &&
            <ComponentPopUp
                isOpen={!isValid}
                setIsOpen={null}
                onAccepted={() => {
                    router.push("/").then();
                }}
                modalInfo="Info"
                isClosable={false}
                showActionButton={false}
            >
                <Label2 marginBottom="scale400">
                    The NFT you are trying to view is not the NFT that MarkYourID generated or you are not owner of this NFT.
                </Label2>
                <Button onClick={openRarible}>View on Rarible</Button>
            </ComponentPopUp>
            }
            {
                item && isValid &&
                <StampEditor
                    onImageSavedToLocal={(url: string) => {

                }}
                    item={item}
                />

            }
        </MainLayout>
    )

}

export default StampID;
