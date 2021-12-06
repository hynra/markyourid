import {ALIGN, HeaderNavigation, StyledNavigationItem, StyledNavigationList} from "baseui/header-navigation";
import {StyledLink} from "baseui/link";
import {Button, KIND, SHAPE, SIZE} from "baseui/button";
import * as React from "react";
import {useStyletron} from "baseui";
import {Label2} from "baseui/typography";
import {Menu} from "baseui/icon";

const HeaderNav: React.FC<{toggleSidebar?: Function}> = ({toggleSidebar}) => {

    const [css, theme] = useStyletron();

    return (
        <div>
            <HeaderNavigation>
                <StyledNavigationList $align={ALIGN.left}>
                    <StyledNavigationItem><Label2>MarkYourID</Label2></StyledNavigationItem>
                </StyledNavigationList>
                <StyledNavigationList $align={ALIGN.center} />
                {/*<StyledNavigationList $align={ALIGN.right}>
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
                </StyledNavigationList>*/}
                <StyledNavigationList $align={ALIGN.right}>
                    <StyledNavigationItem>
                        <Button
                            onClick={() => toggleSidebar()}
                            size={SIZE.compact}
                            kind={KIND.tertiary}
                            shape={SHAPE.square}
                            overrides={{
                                BaseButton: {
                                    style: {
                                        display: 'flex',
                                        [theme.mediaQuery.medium]: {
                                            display: 'none',
                                        },
                                    },
                                },
                            }}
                        >
                            <Menu size={24} color={theme.colors.contentPrimary} />
                        </Button>
                    </StyledNavigationItem>
                </StyledNavigationList>
            </HeaderNavigation>
        </div>
    );
}

export default HeaderNav;

