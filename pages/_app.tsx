import React from 'react';
import App from 'next/app';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';
import {styletron} from '../styletron';
import {SnackbarProvider,} from 'baseui/snackbar';
import {MetaMaskProvider} from "metamask-react";
import Head from 'next/head';


export default class MyApp extends App {
    render() {
        const {Component, pageProps} = this.props;
        return (
            <React.Fragment>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>MarkYourID</title>
                </Head>
                <StyletronProvider value={styletron}>
                    <BaseProvider theme={LightTheme}>
                        <MetaMaskProvider>
                            <SnackbarProvider>
                                <Component {...pageProps} />
                            </SnackbarProvider>
                        </MetaMaskProvider>
                    </BaseProvider>
                </StyletronProvider>
            </React.Fragment>
        );
    }
}
