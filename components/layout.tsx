import React from "react";
import {BlockProps} from "baseui/block";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {useStyletron} from "baseui";

export interface LayoutProps {
    children: React.ReactNode;
    width?: string
}

const itemProps: BlockProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40px'
};

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {

    const [css, theme] = useStyletron();

    return(
        <FlexGrid
            flexGridColumnCount={1}
            flexGridColumnGap="scale800"
            flexGridRowGap="scale800"
        >
            <FlexGridItem {...itemProps} width={props.width}>
                <div
                    className={css({
                        width: props.width,
                        margin: 'auto',
                        alignItems: 'center',
                        justifyContent: 'center',
                    })}
                >
                    {props.children}
                </div>
            </FlexGridItem>
        </FlexGrid>
    );
}

Layout.defaultProps = {
    width: '580px'
}

export default Layout;
