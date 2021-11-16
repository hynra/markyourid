import {ALIGN, HeaderNavigation, StyledNavigationItem, StyledNavigationList} from "baseui/header-navigation";
import {StyledLink} from "baseui/link";
import {Button} from "baseui/button";
import * as React from "react";
import {useStyletron} from "baseui";

const HeaderNav: React.FC = () => {

    const [css] = useStyletron();

    return (
        <div>
            <HeaderNavigation>
                <StyledNavigationList $align={ALIGN.left}>
                    <StyledNavigationItem>Uber</StyledNavigationItem>
                </StyledNavigationList>
                <StyledNavigationList $align={ALIGN.center} />
                <StyledNavigationList $align={ALIGN.right}>
                    <StyledNavigationItem>
                        <StyledLink href="#basic-link1">
                            Tab Link One
                        </StyledLink>
                    </StyledNavigationItem>
                    <StyledNavigationItem>
                        <StyledLink href="#basic-link2">
                            Tab Link Two
                        </StyledLink>
                    </StyledNavigationItem>
                </StyledNavigationList>
            </HeaderNavigation>
        </div>
    );
}

export default HeaderNav;

