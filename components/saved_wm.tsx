import React from "react";
import {useStyletron} from "baseui";
import WmModel, {deleteWm, getWms} from "../common/wm_model";
import {Card, StyledAction, StyledBody, StyledThumbnail} from "baseui/card";
import {Button, SHAPE} from "baseui/button";
import {Label2} from "baseui/typography";
import {ButtonGroup} from "baseui/button-group";
import Router from "next/router";
// import ls from "local-storage";

const SavedWm: React.FC<{ triggerReload: Function }> = ({triggerReload}) => {

    const [css, theme] = useStyletron();
    const [results, setResults] = React.useState<WmModel[]>(null);

    React.useEffect(() => {
        if (triggerReload !== null)
            triggerReload(() => triggerToReload);

        if (results=== null) {
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

    const uploadAsNFT = (wmiD: string) => {
        Router.push(`to-nft/${wmiD}`).then();
    }

    return (
        <div className={css({marginTop: "40px"})}>
            {
                results && results.map((result: WmModel, index: number) => {
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
                                    <ButtonGroup>
                                        <Button shape={SHAPE.pill} onClick={() => removeWm(result)}>
                                            Remove
                                        </Button>
                                        {!result.nft && <Button shape={SHAPE.pill} onClick={() => uploadAsNFT(result.id)}>
                                            Mint as NFT
                                        </Button>}
                                    </ButtonGroup>
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
