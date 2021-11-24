import ls, {get,set} from "local-storage";

export default interface WmModel {
    image: string;
    createdAt: Date;
    text: string;
    id: string;
}

export const saveWm = (wm: WmModel) => {
    let wms: WmModel[] = get<WmModel[]>('wms');
    if(wms) {
        wms = [wm, ...wms,];
    } else {
        wms = [wm];
    }
    set<WmModel[]>('wms',wms);
}


export const deleteWm = (wm: WmModel) => {
    let wms: WmModel[] = get<WmModel[]>('wms');
    wms = wms.filter((_wm) => {
        if(_wm.id !== wm.id){
            return _wm;
        }
    })

    console.log('delete  ', wms)
    set<WmModel[]>('wms',wms);
}


export const getWms = (): WmModel[] => {
    return  get<WmModel[]>('wms');
}

