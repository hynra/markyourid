import * as React from 'react';
import HeaderNav from "../components/header";
import {Block, BlockProps} from 'baseui/block';

const itemProps: BlockProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const Index: React.FC = () => {


    return (
        <div>
            <HeaderNav/>
        </div>
    );
};

export default Index;
