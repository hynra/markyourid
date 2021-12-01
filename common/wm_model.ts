import ls, {get, set} from "local-storage";
import {BlockChainType} from "./common_enum";



export default interface WmModel {
    image: string;
    createdAt: Date;
    text: string;
    id: string;
    nft?: string
    nftUrl?: string;
    blockChain?: BlockChainType
}

export const saveWm = (wm: WmModel) => {
    let wms: WmModel[] = get<WmModel[]>('wms');
    if (wms) {
        wms = [wm, ...wms,];
    } else {
        wms = [wm];
    }
    set<WmModel[]>('wms', wms);
}


export const getWmById = (wmId: string | string[]): WmModel => {
    let wms: WmModel[] = get<WmModel[]>('wms');
    if (wms) {
        let currWm: WmModel = null;
        wms.map((wm) => {
            if (wm.id === wmId) {
                currWm = wm;
            }
        })
        return currWm;
    } else {
        return null;
    }
}

export const updateWm = (wm: WmModel) => {
    deleteWm(wm);
    saveWm(wm);
}

export const deleteWm = (wm: WmModel) => {
    let wms: WmModel[] = get<WmModel[]>('wms');
    wms = wms.filter((_wm) => {
        if (_wm.id !== wm.id) {
            return _wm;
        }
    })

    console.log('delete  ', wms)
    set<WmModel[]>('wms', wms);
}


export const getWms = (): WmModel[] => {
    return get<WmModel[]>('wms');
}

