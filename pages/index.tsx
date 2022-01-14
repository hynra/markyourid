import * as React from 'react';
import HeaderNav from "../components/header";
import Layout from "../components/layout";
import {useMetaMask} from "metamask-react";
import {MetamaskConnectionState} from "../common/common_enum";
import WalletStatus from "../components/wallet_status";
import {NextSeo} from 'next-seo';
import CenteredComponent from "../components/centered-component";
import {Display3, Paragraph1} from "baseui/typography";
import {useStyletron} from "baseui";
import {Card} from "baseui/card";
import {Layer} from "baseui/layer";

const Index: React.FC = () => {


    const {status, connect, account} = useMetaMask();
    const [css, theme] = useStyletron();


    const VerticalLine: React.FC = () => {
        return (
            <CenteredComponent>
                <div className={css({
                    borderLeft: '3px solid',
                    height: '50px',
                })}/>
            </CenteredComponent>
        )
    }


    const CustomCardContainer: React.FC<{ image: React.ReactNode, text: React.ReactNode }> = ({image, text}) => {
        return(
            <div className={css({marginBottom: '24px', marginTop: '24px'})}>
                <CenteredComponent>
                    <div
                        className={css({
                            position: 'relative',
                            marginTop: '85px'
                        })}
                    >
                        <Card>
                            {text}
                        </Card>
                        <div
                            className={css({
                                position: 'absolute',
                                left: '50%',
                                top: '-85px',
                                transform: 'translate(-50%)'
                            })}
                        >
                            {image}
                        </div>

                    </div>
                </CenteredComponent>
            </div>
        );
    }

    return (
        <div>
            <NextSeo
                title="A DRM for your ID card submission"
                description="MarkYourID protects online identity card submissions by making a copy of the submission as an NFT and minting it on the Blockchain"
            />
            <HeaderNav isLogged={false}/>
            <Layout>
                <CenteredComponent>
                    <Display3 marginBottom="scale800">
                        <div className={css({
                            textAlign: 'center'
                        })}>
                            A DRM for Your Identity Card Submission
                        </div>
                    </Display3>
                </CenteredComponent>
                <WalletStatus
                    walletStatus={status as MetamaskConnectionState}
                    onClickConnect={connect}
                    account={account}
                />

                <CenteredComponent>
                    <img src='/fig01.png' width="100%"/>
                </CenteredComponent>
                
                <CustomCardContainer
                    image={
                        <img
                            className={css({

                            })}
                            src="/drm_front.png"
                            width="110px"/>
                    }
                    text={
                        <Paragraph1>
                            Digital rights management (<strong>DRM</strong>) is the use of technology or tools
                            to <strong>control</strong> and manage
                            access
                            to <strong>copyrighted material.</strong>
                        </Paragraph1>
                    }
                />

                <VerticalLine/>

                <CustomCardContainer
                    image={
                        <img
                            className={css({

                            })}
                            src="/id_front.png"
                            width="110px"/>
                    }
                    text={
                        <Paragraph1>
                            Any <strong>identity card submissions</strong> that you submit online is <strong>your
                            asset</strong>, not the recipient`s, you need to <strong>add copyright</strong> to it. So you know <strong>who has the
                            right</strong> to use it and <strong>who is
                            responsible</strong> for any misuse.
                        </Paragraph1>
                    }
                />

                <VerticalLine/>

                <CustomCardContainer
                    image={
                        <img
                            className={css({

                            })}
                            src="/ic_front.png"
                            width="110px"/>
                    }
                    text={
                        <Paragraph1>
                            <strong>MarkYourID</strong> protects online identity card submissions by <strong>making a
                            copy of the submission as
                            an
                            NFT</strong> and minting it on the <strong>Blockchain</strong>, then <strong>mark the
                            identity card</strong> with a link that points
                            to
                            the
                            NFT, so you have <strong>control</strong> over your
                            online <strong>submissions</strong> and <strong>provides</strong> a unique <strong>identifier
                            that can be tracked</strong> even after the document has been submitted.
                        </Paragraph1>
                    }
                />

            </Layout>
        </div>
    );
};

export default Index;
