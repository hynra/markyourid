import React from "react";
import {Block, BlockProps} from "baseui/block";
import {createThemedStyled, useStyletron, withStyle} from "baseui";
import type {ThemeT} from 'baseui/styles/types';
import {Navigation, StyledNavItem, StyledNavLink} from 'baseui/side-navigation';
import HeaderNav from "../components/header";
import Link from 'next/link';
import routes from "../common/routes";
import {Avatar} from "baseui/avatar";
import {expandBorderStyles} from "baseui/styles";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {Label2} from "baseui/typography";

export interface MainLayoutProps {
    children: React.ReactNode;
    path: string;
    address?: string
}


const blockProps: BlockProps = {
    color: 'contentPrimary',
    backgroundColor: 'backgroundPrimary',
    maxWidth: '100vw',
    minHeight: '100vh',
    overflow: 'hidden',
};


const itemProps: BlockProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const themedStyled = createThemedStyled<ThemeT>();


// @ts-ignore
const SidebarWrapper = themedStyled<{ $isOpen: boolean }>('nav', ({$theme, $isOpen}) => ({
    display: $isOpen ? 'block' : 'none',
    paddingTop: $theme.sizing.scale700,
    marginLeft: $theme.sizing.scale800,
    marginRight: $theme.sizing.scale800,
    [$theme.mediaQuery.medium]: {
        display: 'block',
        maxWidth: '15em',
    },
}));


// @ts-ignore
const ContentWrapper = themedStyled<{ $isSidebarOpen: boolean, }>('main', ({$theme, $isSidebarOpen}) => ({
    position: 'relative',
    boxSizing: 'border-box',
    display: $isSidebarOpen ? 'none' : 'block',
    paddingLeft: $theme.sizing.scale800,
    paddingRight: $theme.sizing.scale800,
    width: '100%',
    outline: 'none',
    maxWidth: '60em',
    [$theme.mediaQuery.medium]: {
        display: 'block',
        maxWidth: '60em',
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


export const Sidebar: React.FC<{ activeItem: string, address?: string }> = ({activeItem, address}) => {


    const [myRoutes, setMyRoutes] = React.useState(routes);


    React.useEffect(() => {
        const customRoutes = routes;
        if (activeItem.startsWith("/stamp")) {
            customRoutes[0].subNav = [...customRoutes[0].subNav, {
                title: 'Stamp Image',
                itemId: activeItem,
            }]
        }
        if (activeItem.startsWith("/item")) {
            customRoutes[0].subNav = [...customRoutes[0].subNav, {
                title: 'View Item',
                itemId: activeItem,
            }]
        }

        // rarible link
        customRoutes[0].subNav = customRoutes[0].subNav.map((nav, index) => {
            if(nav.itemId.startsWith("/rari")){
                let customNav = {
                    title: 'View on Rarible',
                    itemId: '/',
                };
                if(address){
                    customNav.itemId =  `https://rarible.com/user/${address}/owned`
                }
                return customNav;
            } else return nav;
        })

        const isValid = (iid: string): boolean => {
            if (activeItem.startsWith("/stamp")) {
                return !iid.startsWith("/item");
            } else if (activeItem.startsWith("/item")) {
                return !iid.startsWith("/stamp");
            } else {
                return !(iid.startsWith("/item") || iid.startsWith("/stamp"));
            }
        }

        customRoutes[0].subNav = customRoutes[0].subNav.filter(function ({itemId}) {
            return !this[itemId] && (this[itemId] = itemId) && isValid(itemId)
        }, {});

        setMyRoutes(customRoutes)
    }, [])

    return (
        <Navigation
            items={myRoutes}
            overrides={{
                NavItem: CustomNavItem,
                NavLink: CustomNavLink,
            }}
            activeItemId={activeItem}
        />
    );
}

export const SideWrapperContent: React.FC<{ address?: string, path: string }> = (
    {
        address,
        path
    }
) => {

    const [css] = useStyletron();

    return (
        <>
            {address && <FlexGrid
                flexGridColumnCount={1}
                flexGridColumnGap="scale800"
                flexGridRowGap="scale800"
            >
                <FlexGridItem {...itemProps} >
                    <div
                        className={css({
                            margin: 'auto',
                            alignItems: 'center',
                            justifyContent: 'center',
                        })}
                    >
                        <Avatar
                            name={`user`}
                            size="64px"
                            src={`https://avatars.dicebear.com/api/jdenticon/${address.toUpperCase().replace("ETHEREUM:", "")}.svg`}
                            overrides={{
                                Root: {
                                    style: ({$theme}) => ({
                                        ...expandBorderStyles($theme.borders.border600),
                                        padding: '8px',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }),
                                },
                            }}
                        />
                    </div>
                </FlexGridItem>
                <FlexGridItem {...itemProps}>
                    <Label2
                        overflow="hidden"
                        // @ts-ignore
                        textOverflow="ellipsis"
                        marginBottom="14px"
                    >
                        {address.toUpperCase().replace("ETHEREUM:", "")}
                    </Label2>
                </FlexGridItem>
            </FlexGrid>}

            {address && <Sidebar activeItem={path} address={address}/>}
        </>
    );
}


const MainLayout: React.FC<MainLayoutProps> = (props) => {

    const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(false);
    const [css] = useStyletron();


    return (
        <div>
            <HeaderNav
                toggleSidebar={() => {
                    setSidebarOpen(!sidebarOpen)
                }}
                isOpen={sidebarOpen}
                isLogged={props.address !== null}
                address={props.address}
                path={props.path}
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

                        <SideWrapperContent
                            address={props.address}
                            path={props.path}
                        />

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
