import React from "react";
import {Block, BlockProps} from "baseui/block";
import {createThemedStyled, withStyle} from "baseui";
import type {BreakpointsT, ThemeT} from 'baseui/styles/types';
import {Navigation, StyledNavItem, StyledNavLink} from 'baseui/side-navigation';
import HeaderNav from "../components/header";
import Link from 'next/link';
import routes from "../common/routes";

export interface MainLayoutProps {
    children: React.ReactNode;
    path: string
}


const blockProps: BlockProps = {
    color: 'contentPrimary',
    backgroundColor: 'backgroundPrimary',
    maxWidth: '100vw',
    minHeight: '100vh',
    overflow: 'hidden',
};

const themedStyled = createThemedStyled<ThemeT>();


// @ts-ignore
const SidebarWrapper = themedStyled<{$isOpen: boolean}>('nav', ({$theme, $isOpen}) => ({
    display: $isOpen ? 'block' : 'none',
    paddingTop: $theme.sizing.scale700,
    marginLeft: $theme.sizing.scale800,
    marginRight: $theme.sizing.scale800,
    [$theme.mediaQuery.medium]: {
        display: 'block',
        maxWidth: '16em',
    },
}));


// @ts-ignore
const ContentWrapper = themedStyled<{$isSidebarOpen: boolean,}>('main', ({$theme, $isSidebarOpen}) => ({
    position: 'relative',
    boxSizing: 'border-box',
    display: $isSidebarOpen ? 'none' : 'block',
    paddingLeft: $theme.sizing.scale800,
    paddingRight: $theme.sizing.scale800,
    width: '100%',
    outline: 'none',
    maxWidth: '40em',
    [$theme.mediaQuery.medium]: {
        display: 'block',
        maxWidth: '40em',
    },
}));



const CustomStyledNavItem = withStyle(
    StyledNavItem,
    // @ts-ignore
    ({$theme, $active, $hasItemId, $level}) => ({
        paddingTop: $theme.sizing.scale200,
        paddingBottom: $theme.sizing.scale200,
        ...($theme.name.startsWith('dark') && $active
            ? {
                background: $theme.colors.backgroundSecondary,
            }
            : {}),
        ...(!$hasItemId || $level === 1
            ? {
                textTransform: 'uppercase',
                ...($level === 1
                    ? $theme.typography.font350
                    : $theme.typography.font250),
            }
            : {}),
    }),
);

const removeSlash = path => path && path.replace(/\/$/, '');

const CustomNavItem = ({item, onSelect, onClick, onKeyDown, ...restProps}) => (
    <CustomStyledNavItem $hasItemId={!!item.itemId} {...restProps} />
);

const CustomNavLink = props => {
    return props.href ? (
        <Link href={props.href}>
            <StyledNavLink {...props} />
        </Link>
    ) : (
        <StyledNavLink {...props} />
    );
};



const Sidebar: React.FC<{activeItem: string}> = ({activeItem}) => {
    return (
        <Navigation
            items={routes}
            overrides={{
                NavItem: CustomNavItem,
                NavLink: CustomNavLink,
            }}
            activeItemId={activeItem}
        />
    );
}


const MainLayout: React.FC<MainLayoutProps> = (props) => {

    const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(false);

    return (
        <div>
            <HeaderNav
                toggleSidebar={() => {
                    setSidebarOpen(!sidebarOpen)
                }}
                isOpen={sidebarOpen}
            />
            <Block {...blockProps}>
                <Block
                    backgroundColor="backgroundPrimary"
                    color="contentPrimary"
                    marginTop="scale300"
                    display="flex"
                    paddingTop="scale400"
                    justifyContent="center"
                >
                    <SidebarWrapper
                        aria-label="primary"
                        $isOpen={sidebarOpen}
                    >
                        <Sidebar activeItem={props.path}/>
                    </SidebarWrapper>
                    <ContentWrapper
                        id="docSearch-content"
                        role="main"
                        tabIndex="-1"
                        $isSidebarOpen={sidebarOpen}
                    >
                        {props.children}
                    </ContentWrapper>

                </Block>
            </Block>
        </div>
    );
}

export default MainLayout;
