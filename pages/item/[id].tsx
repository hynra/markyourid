import React from "react";
import {useSdk} from "../../sdk/use-sdk";
import {useMetaMask} from "metamask-react";
import MainLayout from "../../components/main_layout";
import PreLoad from "../../components/preload";
import {useStyletron} from "baseui";
import {Item, MetaAttribute} from "@rarible/api-client";
import {useRouter} from "next/router";
import {getItemByIdNoSDK} from "../../sdk/query";
import {Display3, Display4, H3, Label1, Label2, Paragraph1, Paragraph3} from "baseui/typography";
import {checkIfItemGenerated, getDwebLinkUrl} from "../../common/helper";
import {Tabs, Tab, FILL} from "baseui/tabs-motion";
import {DIVIDER, SIZE as TableSize, Table} from "baseui/table-semantic";
import {ButtonGroup} from "baseui/button-group";
import {Button} from "baseui/button";
import ComponentPopUp from "../../components/modals/component_popup";
import {Delete} from "baseui/icon";
import {useSnackbar} from "baseui/snackbar";

const ItemID: React.FC = () => {

    const router = useRouter();
    const {id: itemId} = router.query;
    const {enqueue, dequeue} = useSnackbar();

    const {status, account} = useMetaMask();
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [css, theme] = useStyletron();
    const [item, setItem] = React.useState<Item>(null);
    const [activeKey, setActiveKey] = React.useState<string | number>("0");
    const [isValid, setValid] = React.useState<boolean>(true);


    React.useEffect(() => {

        if (!itemId) return;

        if (item === null)
            fetchItem().then();


    }, [itemId])

    const fetchItem = async () => {
        try {
            const nftItem: Item = await getItemByIdNoSDK(itemId as string);
            setValid(checkIfItemGenerated(nftItem));

            setItem(nftItem);
            setLoading(false);
        } catch (e) {
            enqueue({
                message: 'Oops! Something went wrong, try again later.',
                startEnhancer: ({size}) => <Delete size={size}/>,
            });
        }
    }

    const tabulateAttrData = (attrs: MetaAttribute[]): any[] => {
        let data = [];
        attrs.map((attr) => {
            const traits = [attr.key, attr.value];
            data.push(traits);
        })

        return data;
    }

    const getOwner = (): string => {
        return item.owners.length === 0 ?
            item.creators[0].account : item.owners[0]
    }

    const getCreator = (): string => {
        return item.creators[0].account
    }


    const showStampButton = (): boolean => {
        if(!account) return false;
        const fixedAccount = account.toLowerCase();
        const fixedCreator = getCreator().replace("ETHEREUM:", "").toLowerCase();
        const fixedOwner = getCreator().replace("ETHEREUM:", "").toLowerCase();
        return fixedAccount === fixedCreator || fixedAccount === fixedOwner;
    }


    function openRarible() {
        const url = `https://rarible.com/token/${item.id.replace('ETHEREUM:', '')}`
        router.push(url).then()
    }

    return (
        <MainLayout path={`/item/${itemId}`} address={account}>
            {isLoading && <PreLoad/>}
            { isValid === false &&
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
                     The NFT you are trying to view is not the NFT that MarkYourID generated. Only generated NFTs are allowed to be viewed.
                 </Label2>
                    <Button onClick={openRarible}>View on Rarible</Button>
                </ComponentPopUp>
            }
            {item && isValid && <div
                className={css({
                    display: (isLoading) ? 'none' : 'block'
                })}
            >
                <H3>{item.meta.name}</H3>
                <div className={css({
                    width: "100%",
                    marginBottom: '14px'
                })}>
                    <img src={getDwebLinkUrl(item.meta.content[0].url)} width="100%"
                         className={css({borderRadius: '15px'})}/>
                </div>
                <ButtonGroup
                    overrides={
                        {
                            Root: {
                                style: {
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '14px'
                                }
                            }
                        }
                    }
                >
                    { showStampButton() &&
                        <Button
                            onClick={() => {
                                router.push(`/stamp/${item.id}`).then()
                            }}
                        >
                            Stamp to image</Button>
                    }
                    <Button
                        onClick={openRarible}
                    >
                        View on Rarible</Button>
                </ButtonGroup>

                <Tabs
                    activeKey={activeKey}
                    onChange={({activeKey}) => {
                        setActiveKey(activeKey);
                    }}
                    fill={FILL.fixed}
                    activateOnFocus
                >
                    <Tab title="Details">
                        <Label1>Description</Label1>
                        <Paragraph1
                            marginBottom="scale500"
                            $style={{
                                wordBreak: "break-all"
                            }}
                        >
                            {
                                item.meta.description.split("\n").map((text, index) => {
                                    return <span key={index}>{text}<br/></span>
                                })
                            }
                        </Paragraph1>
                        <Label1>Blockchain</Label1>
                        <Paragraph1 marginBottom="scale500">
                            {item.id.split(':')[0]}
                        </Paragraph1>
                        <Label1>Collection</Label1>
                        <Paragraph1
                            $style={{
                                wordBreak: "break-all"
                            }}
                            marginBottom="scale500"
                        >
                            {item.collection}
                        </Paragraph1>
                    </Tab>
                    <Tab title="Attributes">
                        <Table
                            columns={["Trait Type", "Value"]}
                            data={tabulateAttrData(item.meta.attributes)}
                            divider={DIVIDER.grid}
                            size={TableSize.spacious}
                        />
                    </Tab>
                    <Tab title="Ownership">
                        <Label1 marginTop="scale500">Owner: </Label1>
                        <Paragraph3
                            $style={{
                                wordBreak: "break-all"
                            }}
                        >
                            <b>{getOwner()}</b>
                        </Paragraph3>
                        <Label1 marginTop="scale500">Creator: </Label1>
                        <Paragraph3
                            $style={{
                                wordBreak: "break-all"
                            }}
                        >
                            <b>{getCreator()}</b>
                        </Paragraph3>
                    </Tab>
                </Tabs>
            </div>}

        </MainLayout>)
}
export default ItemID;
