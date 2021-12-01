import React from 'react';
import App from 'next/app';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';
import {styletron} from '../styletron';
import {SnackbarProvider,} from 'baseui/snackbar';

export default class MyApp extends App {
    render() {
        const {Component, pageProps} = this.props;
        return (
            <StyletronProvider value={styletron}>
                <BaseProvider theme={LightTheme}>
                    <SnackbarProvider>
                        <Component {...pageProps} />
                    </SnackbarProvider>
                </BaseProvider>
            </StyletronProvider>
        );
    }
}
