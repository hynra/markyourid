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

import {useSdk} from "../sdk/use-sdk"
import {IRaribleSdk} from "@rarible/sdk/build/domain"
import {Item, Items} from "@rarible/api-client";
import {fetchUserItems} from "../sdk/query";
import {Card, StyledAction, StyledBody} from "baseui/card";
import {BlockProps} from "baseui/block";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {Label1, Label3, Paragraph1} from "baseui/typography";
import {ButtonGroup} from "baseui/button-group";
import {useStyletron} from "baseui";
import MainLayout from "../components/main_layout";
import {Checkbox, LABEL_PLACEMENT, STYLE_TYPE} from "baseui/checkbox";
import {Delete} from "baseui/icon";

const itemProps: BlockProps = {
    alignItems: 'center',
    justifyContent: 'center',
    // display: 'flex',
};


const Dashboard: React.FC = () => {

    const {enqueue, dequeue} = useSnackbar();
    const PRIMARY_TITLE = 'Generated NFTs'
    const SECONDARY_TITLE = 'My NFTs'
    const router = useRouter();
    const {sdk, wallet} = useSdk("prod");
    const {status, account} = useMetaMask();
    const [nftItems, setNftItems] = React.useState<Item[]>(null);
    const [continuation, setContinuation] = React.useState(null);
    const [showAll, setShowAll] = React.useState<boolean>(false);
    const [title, setTitle] = React.useState<string>(PRIMARY_TITLE)


    React.useEffect(() => {

        if (!wallet)
            return

        if (nftItems === null && account) {
            fetchItem().then();
        }

        if(showAll) setTitle(SECONDARY_TITLE)
        else setTitle(PRIMARY_TITLE);

    }, [account, wallet, showAll])


    if (status === MetamaskConnectionState.NotConnected || status === MetamaskConnectionState.Unavailable) {
        router.push('/').then();
    } else if (status as MetamaskConnectionState !== MetamaskConnectionState.Connected) {
        return <PreLoad/>
    }

    console.log(nftItems)

    const fetchItem = async () => {
        try {
            const its = await fetchUserItems(sdk, wallet.address, continuation);
            setContinuation(undefined)
            if (nftItems === null) {
                setNftItems(its.items);
            } else {
                let tmpIts = [...nftItems, ...its.items]
                setNftItems(tmpIts);
            }
            if (its?.continuation) setContinuation(its.continuation);
        } catch (e) {
            enqueue({
                message: 'Oops! Something went wrong, try again later.',
                startEnhancer: ({size}) => <Delete size={size}/>,
            });
            throw e;
        }

    }


    return (
        <MainLayout path='/dashboard' address={wallet?.address}>
            <FlexGrid
                flexGridColumnCount={2}
                marginBottom="scale700"
            >
                <FlexGridItem>
                    <Label1>{title}</Label1>
                </FlexGridItem>
                <FlexGridItem
                    alignItems='end'
                    justifyContent='end'
                    display="flex"
                >
                    <Checkbox
                        checked={showAll}
                        checkmarkType={STYLE_TYPE.toggle_round}
                        // @ts-ignore
                        onChange={e => setShowAll(e.target.checked)}
                        labelPlacement={LABEL_PLACEMENT.right}
                    >
                        Show All
                    </Checkbox>
                </FlexGridItem>
            </FlexGrid>
            <FlexGrid
                flexGridColumnCount={[1, 1, 2, 2]}
                flexGridColumnGap="scale800"
                flexGridRowGap="scale800"
            >
                {
                    nftItems &&
                    nftItems.map((it, index) => {
                        const split: string[] = it.meta.content[0].url.split('/');
                        const img = `https://eth.rarenet.app/ipfs/${split[split.length - 1]}`;

                        let isGenerated = false;
                        it.meta.attributes.map((attr) => {
                            if(attr.key === "powered by" && attr.value === "https://markyour.id"){
                                isGenerated = true;
                            }
                        });

                        if(!isGenerated && !showAll){
                            return null;
                        }

                        return (
                            <FlexGridItem {...itemProps} key={index}>
                                <Card
                                    headerImage={
                                        img
                                    }
                                    overrides={
                                        {
                                            Root: {
                                                style:
                                                    {width: '100%', marginBottom: '14px'}
                                            }
                                        }
                                    }
                                >
                                    <StyledBody>
                                        <Label3>{it.meta.name}</Label3>
                                    </StyledBody>
                                    <StyledAction>
                                        <ButtonGroup overrides={{
                                            Root: {
                                                style: {
                                                    width: "100%",
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }
                                            }
                                        }}>
                                            <Button>View NFT</Button>

                                        </ButtonGroup>
                                    </StyledAction>
                                </Card>
                            </FlexGridItem>
                        );
                    })
                }
            </FlexGrid>
            {
                continuation &&
                <FlexGrid
                    flexGridColumnCount={[1]}
                    flexGridColumnGap="scale800"
                    flexGridRowGap="scale800"
                >
                    <FlexGridItem {...itemProps} width="100%">
                        <Button onClick={fetchItem}>Load More</Button>
                    </FlexGridItem>
                </FlexGrid>
            }
        </MainLayout>
    )
}

export default Dashboard;
