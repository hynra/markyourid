import * as React from 'react';
import {useEffect} from 'react';
import {useStyletron} from 'baseui';
import HeaderNav from "../components/header";
import MainEditor from "../components/main_editor";
import WmModel from "../common/wm_model";
import {Tabs, Tab, FILL} from "baseui/tabs-motion";
import {Block, BlockProps} from 'baseui/block';
import {Card, StyledBody} from 'baseui/card';
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import SavedWm from "../components/saved_wm";
import {useRouter} from "next/router";

const itemProps: BlockProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const Contextual: React.FC = () => {
    const [css, theme] = useStyletron();
    const router = useRouter();
    const { tab } = router.query;
    const selectedTab = (tab === "1") ? 1 : 0;
    const [activeKey, setActiveKey] = React.useState<React.Key>(selectedTab);
    const [triggerReloadResults, setTriggerReloadResults] = React.useState<Function>(null)

    React.useEffect(() => {
        setActiveKey(selectedTab);
    }, [tab])

    return (
        <div>
            <HeaderNav/>
            <FlexGrid
                flexGridColumnCount={[1]}
                flexGridColumnGap="scale800"
                flexGridRowGap="scale800"
            >

                <FlexGridItem {...itemProps} width="100%">

                    <Tabs
                        activeKey={activeKey}
                        onChange={({activeKey}) => {
                            setActiveKey(activeKey);
                        }}
                        activateOnFocus
                        fill={FILL.fixed}
                        renderAll
                        overrides={{
                            Root: {
                                style: {
                                    width: '580px',
                                    margin: 'auto',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }
                            }
                        }}
                    >
                        <Tab title="Create">
                            <MainEditor
                                onImageSavedToLocal={(wm: WmModel) => {
                                    triggerReloadResults();
                                }}
                            />
                        </Tab>
                        <Tab title="Results">
                            <SavedWm
                                triggerReload={(f) => setTriggerReloadResults(f)}
                            />
                        </Tab>
                    </Tabs>
                </FlexGridItem>
            </FlexGrid>
        </div>
    );
};

export default Contextual;
