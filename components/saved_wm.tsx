import React from "react";
import {useStyletron} from "baseui";
import WmModel, {getWms} from "../common/wm_model";
// import ls from "local-storage";

const SavedWm: React.FC<{triggerReload: Function}> = ({triggerReload}) => {

    const [css, theme] = useStyletron();
    const [results, setResults] = React.useState<WmModel[]>([]);

    React.useEffect(() => {
        triggerReload(() => triggerToReload);
        if(results.length === 0){
            const tmpWms: WmModel[] = getWms();
            if(tmpWms !== null){
                setResults(tmpWms);
            }
        }
    }, [results]);

    const triggerToReload = () => {
        const tmpWms: WmModel[] = getWms();
        if(tmpWms !== null){
            setResults(tmpWms);
        }
    }

    return(
        <div className={css({ marginTop: "40px"})}>
            {
                results.map((result: WmModel, index: number) => {
                    return(
                        <div key={result.id}>
                            {result.text}
                        </div>
                    )
                })
            }
        </div>
    );
}

export default SavedWm;
