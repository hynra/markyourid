import React from "react";
import {useSdk} from "../../sdk/use-sdk";
import {useMetaMask} from "metamask-react";
import MainLayout from "../../components/main_layout";
import PreLoad from "../../components/preload";
import {useStyletron} from "baseui";
import {Item, MetaAttribute} from "@rarible/api-client";
import {useRouter} from "next/router";
import {getItemByIdNoSDK} from "../../sdk/query";
import {Display2, Display3, Display4, H1, H2, H3, Label1, Paragraph1, Paragraph3, Paragraph4} from "baseui/typography";
import {getDwebLinkUrl} from "../../common/helper";
import {Tabs, Tab, FILL} from "baseui/tabs-motion";
import {DIVIDER, SIZE as TableSize, Table} from "baseui/table-semantic";
import {ButtonGroup} from "baseui/button-group";
import {Button} from "baseui/button";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";

const ItemID: React.FC = () => {

    const router = useRouter();
    const {id: itemId} = router.query;

    const {sdk, wallet} = useSdk("prod");
    const {status, account} = useMetaMask();
    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [css, theme] = useStyletron();
    const [item, setItem] = React.useState<Item>(null);
    const [activeKey, setActiveKey] = React.useState<string | number>("0");


    React.useEffect(() => {

        if (!itemId) return;

        if (item === null)
            fetchItem().then();


    }, [itemId])

    const fetchItem = async () => {
        try {
            const nftItem: Item = await getItemByIdNoSDK(itemId as string);
            setItem(nftItem);
            console.log(nftItem)
            setLoading(false);
        } catch (e) {

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


    return (
        <MainLayout path='/item' address={wallet?.address}>

            {isLoading && <PreLoad/>}

            {item && <div
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
                    <Button>Stamp on an image</Button>
                    <Button
                        onClick={() => {
                            const url = `https://rarible.com/token/${item.id.replace('ETHEREUM:', '')}`
                            router.push(url).then()
                        }}
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
                        <Paragraph1 marginBottom="scale500">
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
                        <Paragraph1 marginBottom="scale500">
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
                        <Paragraph3>
                            <b>{item.owners.length === 0 ?
                                item.creators[0].account : item.owners[0]
                            }</b>
                        </Paragraph3>
                        <Label1 marginTop="scale500">Creator: </Label1>
                        <Paragraph3>
                            <b>{item.creators[0].account}</b>
                        </Paragraph3>
                    </Tab>
                </Tabs>
            </div>}

        </MainLayout>)
}
export default ItemID;
