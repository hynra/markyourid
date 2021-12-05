import * as Rareterm from "rareterm";
import React, {useState} from "react";

export const useEthereumProvider = (host = "https://eth.rarenet.app/v1") =>{

    const [rarepress, setRarepress] = useState<any>(null);

    React.useEffect(() => {
        const _rarepress = new Rareterm();
        _rarepress.init({host}).then(() => {
            setRarepress(_rarepress)
        });
    }, []);
    return rarepress
}
