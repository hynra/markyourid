import React from "react";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {Button} from "baseui/button";

export interface CenteredComponentProps {
    children: React.ReactNode;
}

const CenteredComponent: React.FC = (props: CenteredComponentProps) => {
    return(
        <FlexGrid
            flexGridColumnCount={1}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale800"
        >
            <FlexGridItem
                display='flex'
                alignItems='center'
                justifyContent='center'
            >
                {props.children}
            </FlexGridItem>
        </FlexGrid>
    )
}


export default CenteredComponent;
