import * as React from 'react';
import {useEffect} from 'react';
import {useStyletron} from 'baseui';
import HeaderNav from "../components/header";
import MainEditor from "../components/main_editor";
import WmModel from "../common/wm_model";
import {Tabs, Tab, FILL} from "baseui/tabs-motion";
import SavedWm from "../components/saved_wm";
import {useRouter} from "next/router";
import Layout from "../components/layout";

const Contextual: React.FC = () => {
    const [css, theme] = useStyletron();
    const router = useRouter();
    const {tab} = router.query;
    const selectedTab = (tab === "1") ? 1 : 0;
    const [activeKey, setActiveKey] = React.useState<React.Key>(selectedTab);
    const [triggerReloadResults, setTriggerReloadResults] = React.useState<Function>(null)

    React.useEffect(() => {
        setActiveKey(selectedTab);
    }, [tab])

    return (
        <div>
            <HeaderNav/>
            <Layout>
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
            </Layout>
        </div>
    );
};

export default Contextual;
