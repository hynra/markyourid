import {ALIGN, HeaderNavigation, StyledNavigationItem, StyledNavigationList} from "baseui/header-navigation";
import {StyledLink} from "baseui/link";
import {Button, KIND, SHAPE, SIZE} from "baseui/button";
import * as React from "react";
import {useStyletron} from "baseui";
import {Label2} from "baseui/typography";
import {Delete, Menu, Overflow} from "baseui/icon";
import {StyledLink as Link} from 'baseui/link';
import {Drawer} from "baseui/drawer";
import {SideWrapperContent} from "./main_layout";

const HeaderNav: React.FC<{
    toggleSidebar?: Function,
    isOpen?: boolean,
    isLogged: boolean,
    address?: string,
    path?: string,
}> = (
    {
        toggleSidebar,
        isOpen = false,
        isLogged,
        address,
        path,
    }
) => {

    const [css, theme] = useStyletron();

    const [secondMenuOpened, setSecondMenuOpened] = React.useState<boolean>(false);

    const linkStyle = css({
        display: 'none',
        [theme.mediaQuery.medium]: {
            display: 'block',
        },
    });

    return (
        <div>
            <Drawer
                isOpen={secondMenuOpened}
                autoFocus={false}
                onClose={() => setSecondMenuOpened(false)}
            >
                <Link href="/">
                    <img src="/logo-narrow.png" width="180px" className={css({marginTop: '14px'})}/>
                </Link>

                {address && <SideWrapperContent
                    path={path}
                    address={address}
                />}

                <Label2 marginBottom="scale400" marginTop="scale800">
                    <Link href="#basic-link1">How it works</Link>
                </Label2>
                <Label2 marginBottom="scale400">
                    <Link href="#basic-link1">FAQ</Link>
                </Label2>
                <Label2 marginBottom="scale400">
                    <Link href="#basic-link1">About</Link>
                </Label2>

            </Drawer>
            <HeaderNavigation>
                <StyledNavigationList $align={ALIGN.center}>
                    <StyledNavigationItem>
                        <Link href="/">
                            <img src="/logo-narrow.png" width="180px"/>
                        </Link>
                    </StyledNavigationItem>
                </StyledNavigationList>
                <StyledNavigationList $align={ALIGN.center}></StyledNavigationList>
                <StyledNavigationList $align={ALIGN.right}>
                    <StyledNavigationItem>
                        <div className={linkStyle}>
                            <Link href="#basic-link1">How it works</Link>
                        </div>
                    </StyledNavigationItem>
                    <StyledNavigationItem>
                        <div className={linkStyle}>
                            <Link href="#basic-link1">FAQ</Link>
                        </div>
                    </StyledNavigationItem>
                    <StyledNavigationItem>
                        <div className={linkStyle}>
                            <Link href="#basic-link1">About</Link>
                        </div>
                    </StyledNavigationItem>
                    <StyledNavigationItem>
                        <Button
                            onClick={() => setSecondMenuOpened(!secondMenuOpened)}
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
                            {
                                secondMenuOpened ?
                                    <Delete size={24} color={theme.colors.contentPrimary}/> :
                                    <Menu size={24} color={theme.colors.contentPrimary}/>
                            }

                        </Button>
                    </StyledNavigationItem>
                    {/*<StyledNavigationItem>
                        {isLogged && <Button
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
                            {
                                isOpen ?
                                    <Delete size={24} color={theme.colors.contentPrimary}/> :
                                    <Menu size={24} color={theme.colors.contentPrimary}/>
                            }

                        </Button>}
                    </StyledNavigationItem>*/}
                </StyledNavigationList>
            </HeaderNavigation>
        </div>
    );
}

export default HeaderNav;

