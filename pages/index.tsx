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

const itemProps: BlockProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const Index: React.FC = () => {
    const [css, theme] = useStyletron();
    const [wms, setWms] = React.useState<WmModel[]>([]);
    const [activeKey, setActiveKey] = React.useState<React.Key>(0);
    const [triggerReloadResults, setTriggerReloadResults] = React.useState<Function>(null)


    // @ts-ignore
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

export default Index;
