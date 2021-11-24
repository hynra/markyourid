import React from "react";
import {useStyletron} from "baseui";
import WmModel, {deleteWm, getWms} from "../common/wm_model";
import {Card, StyledAction, StyledBody, StyledThumbnail} from "baseui/card";
import {Button, SHAPE} from "baseui/button";
import {Label2} from "baseui/typography";
// import ls from "local-storage";

const SavedWm: React.FC<{ triggerReload: Function }> = ({triggerReload}) => {

    const [css, theme] = useStyletron();
    const [results, setResults] = React.useState<WmModel[]>([]);

    React.useEffect(() => {
        triggerReload(() => triggerToReload);
        if (results.length === 0) {
            const tmpWms: WmModel[] = getWms();
            if (tmpWms !== null) {
                setResults(tmpWms);
            }
        }
    }, [results]);

    const triggerToReload = () => {
        const tmpWms: WmModel[] = getWms();
        if (tmpWms !== null) {
            setResults(tmpWms);
        }
    }

    const removeWm = (wm: WmModel) => {
        deleteWm(wm);
        const tmpWms: WmModel[] = getWms();
        if (tmpWms !== null) {
            setResults(tmpWms);
        }
    }

    return (
        <div className={css({marginTop: "40px"})}>
            {
                results.map((result: WmModel, index: number) => {
                    let mappedText: string[] = result.text.split('\n');
                    mappedText = mappedText.map((s) => s.replace('\n', ''));
                    return (
                        <div key={result.id}>
                            <Card
                                overrides={
                                    {
                                        Root: {
                                            style:
                                                {width: '100%', marginBottom: '14px'}
                                        }
                                    }
                                }
                            >
                                <StyledThumbnail
                                    src={result.image}
                                />
                                <StyledBody>
                                    {
                                        mappedText.map((text, index) => {
                                            return (<Label2 key={index}>
                                                {text}
                                            </Label2>);
                                        })
                                    }
                                </StyledBody>
                                <StyledAction>
                                    <Button shape={SHAPE.pill} onClick={() => removeWm(result)}>
                                        Remove
                                    </Button>
                                </StyledAction>
                            </Card>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default SavedWm;
