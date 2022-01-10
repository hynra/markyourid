import {useCallback, useEffect, useState} from "react"
import {Maybe} from "../common/maybe"
import Web3 from "web3";

type UseProviderResponse = {
    provider: Maybe<any>
    connect: () => void
    account: Maybe<string>
}

export function useInjectedProvider(): UseProviderResponse {
    const [provider, setProvider] = useState<Maybe<any>>()
    const [account, setAccount] = useState<Maybe<string>>()

    useEffect(() => {
        getInjectedProvider()
            .then(async provider => {
                setProvider(provider)
                const accounts = await getAccounts(provider)
                if (accounts.length > 0) {
                    setAccount(accounts[0])
                }
                if ("on" in provider) {
                    provider.on("accountsChanged", (accs: any) => {
                        const [account] = accs
                        setAccount(account)
                    })
                }
            })
    }, [])

    const connect = useCallback(() => {
        if (provider === undefined) {
            alert("no provider found")
        } else {
            enableProvider(provider)
                .then(async () => {
                    const accounts = await getAccounts(provider)
                    if (accounts.length > 0) {
                        setAccount(accounts[0])
                    }
                })
        }
    }, [provider])

    return {provider, connect, account}
}

async function getAccounts(provider: any): Promise<string[]> {
    if ("request" in provider) {
        return provider.request({method: 'eth_accounts'})
    } else {
        return []
    }
}

async function enableProvider(provider: any) {
    if (typeof provider.request === "function") {
        await provider.request({
            method: "eth_requestAccounts",
        })
    }
    if (typeof provider.enable === "function") {
        await provider.enable()
    }
    return provider
}

async function getInjectedProvider(): Promise<any> {
    if ((window as any).ethereum) {
        return (window as any).ethereum
    } else {
        return new Promise<any>((resolve, reject) => {
            const handleInit = () => {
                const {ethereum} = window as any
                if (ethereum) {
                    resolve(ethereum)
                } else {
                    reject(new Error("Metamask not found"))
                }
            }
            window.addEventListener("ethereum#initialized", handleInit, {
                once: true,
            })
            setTimeout(handleInit, 3000)
        })
    }
}

let web3instance = null

export function getWeb3() {
    if (web3instance != null)
        return web3instance
    // @ts-ignore
    window.ethereum.request({
        method: "eth_requestAccounts"
    })

    // @ts-ignore
    web3instance = new Web3(window.ethereum);
    return web3instance
}
