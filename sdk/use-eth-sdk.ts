import { BlockchainWallet, EthereumWallet } from "@rarible/sdk-wallet"
import { Maybe } from "../common/maybe"
import { useEffect, useMemo } from "react"
import {getWeb3, useInjectedProvider} from "./use-injected-provider"
import Web3 from "web3"
import { toUnionAddress } from "@rarible/types"
import {createRaribleSdk, RaribleSdk} from "@rarible/protocol-ethereum-sdk"
import {Web3Ethereum} from "@rarible/web3-ethereum";

type UseSdkResult = {
    wallet: Maybe<BlockchainWallet>
    sdk: Maybe<RaribleSdk>
    connect: () => void
}

export function useEthSdk(env: string): UseSdkResult {
    const { provider, connect, account: from } = useInjectedProvider()
    useEffect(() => {
        console.log(`account: ${from}`)
    }, [from])
    const wallet = useMemo(() => {
        if (provider !== undefined && from !== undefined) {
            const address = toUnionAddress(`ETHEREUM:${from}`)
            return new EthereumWallet(new Web3Ethereum({ web3: new Web3(provider), from }), address)
        } else {
            return undefined
        }
    }, [provider, from])
    const sdk = useMemo(() => {
        if (wallet !== undefined) {
            const web3eth = new Web3Ethereum({ web3: getWeb3(), from});

            return createRaribleSdk(web3eth, env as any)
        } else {
            return undefined
        }
    }, [env, wallet])
    return { sdk, connect, wallet }
}
