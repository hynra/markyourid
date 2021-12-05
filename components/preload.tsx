import React from "react";
import Layout from "./layout";
import {Spinner} from "baseui/spinner";

const PreLoad: React.FC = () => {
    return(
        <Layout>
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
        </Layout>
    )
}

export default PreLoad;
