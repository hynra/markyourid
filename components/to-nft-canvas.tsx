import React from "react";
import {useStyletron} from "baseui";
import {Label2} from "baseui/typography";
import {SIZE, Textarea} from "baseui/textarea";
import {StyledBody} from "baseui/card";
import {Input} from "baseui/input";
import {Button} from "baseui/button";
import AvatarPopUp from "./avatar_popup";
import {Accordion, Panel} from "baseui/accordion";
import {ButtonGroup} from "baseui/button-group";
import InitialPopUp from "./initials_popup";

export enum AvatarMethod {
    Generation,
    Initials,
    Upload
}

interface CurrentAvatar {
    url: string,
    Method: AvatarMethod,
}

const ToNftCanvas: React.FC<{ accountAddress: string, currText: string }> = (
    {
        accountAddress,
        currText
    }
) => {

    const [css, theme] = useStyletron();
    const [canvas, setCanvas] = React.useState();
    const [additionalText, setAdditionalText] = React.useState<string>('Name: YourName');
    const [selfImage, setSelfImage] = React.useState<any>(null);
    const [avatarPopUpOpened, setAvatarPopUpOpened] = React.useState<boolean>(false);
    const [initialsPopUpOpened, setInitialsPopUpOpened] = React.useState<boolean>(false);
    const [selectedAvatar, setSelectedAvatar] = React.useState<CurrentAvatar>(null);

    const refHandler = (currCanvas) => {
        if (!currCanvas) return;
        if (!canvas) setCanvas(currCanvas);
    }

    function toMultiLine(text) {
        let textArr: any[];
        text = text.replace(/\n\r?/g, '<br/>');
        textArr = text.split("<br/>");
        return textArr;
    }


    React.useEffect(() => {
        if (canvas) {
            const img = new Image();
            img.src = '/mock0.png';
            img.onload = function () {
                // @ts-ignore
                let context = canvas.getContext("2d");
                // @ts-ignore
                canvas.width = img.width;
                // @ts-ignore
                canvas.height = img.height;
                context.drawImage(img, 0, 0, img.width, img.height);


                context.font = `bold 25px monospace`;
                context.textAlign = "left";
                context.textBaseline = "middle";
                const textWidth = context.measureText(accountAddress).width;
                // @ts-ignore
                context.fillText(accountAddress, (canvas.width / 2) - (textWidth / 2), 80);


                const texts: string[] = toMultiLine(currText + '\n' + additionalText);
                let lineSpacing = 25;
                let x = 50;
                let y = 185;
                // draw each line on canvas.
                for (let i = 0; i < texts.length; i++) {
                    context.fillText(texts[i], x, y);
                    y += lineSpacing;
                }

                if (selectedAvatar) {
                    const avaImage = new Image();
                    avaImage.src = selectedAvatar.url;
                    avaImage.onload = function () {
                        context.drawImage(avaImage, 570, 177, 140, 140);
                    }

                }

            }
        }

        if (selfImage === null) {

        }

    }, [canvas, currText, additionalText, selfImage, selectedAvatar])


    return (
        <>
            <AvatarPopUp
                isOpen={avatarPopUpOpened}
                setIsOpen={setAvatarPopUpOpened}
                onAvatarSelected={(url) => {
                    setSelectedAvatar({
                        Method: AvatarMethod.Generation,
                        url: url
                    })
                }}
            />
            <InitialPopUp
                isOpen={initialsPopUpOpened}
                setIsOpen={setInitialsPopUpOpened}
                onInitialSelected={(url) => {
                    setSelectedAvatar({
                        Method: AvatarMethod.Initials,
                        url: url
                    })
                }}
            />
            <div className={css({
                position: 'relative',
                width: '100%',
                marginBottom: "14px"
            })}>
                {
                    <>
                        <canvas
                            className={css({
                                position: 'relative',
                                width: '100%',
                                marginBottom: "14px"
                            })}
                            ref={refHandler}
                            id="to-nft-canvas"
                        />
                        <Label2 marginBottom="14px">Main Text</Label2>
                        <Textarea
                            value={currText}
                            size={SIZE.compact}
                            disabled
                            // @ts-ignore
                            onChange={e => setCurrText(e.target.value)}
                            placeholder="Controlled Input"
                            clearOnEscape
                        />
                        <Label2 marginBottom="14px">Additional Text</Label2>
                        <Input
                            value={additionalText}
                            // @ts-ignore
                            onChange={e => setAdditionalText(e.target.value)}
                            placeholder="Additional Text"
                            clearOnEscape
                        />

                        <Accordion
                            onChange={({expanded}) => console.log(expanded)}
                            accordion
                        >
                            <Panel title="Avatar">
                                <Label2 marginBottom="14px">Select Avatar from:</Label2>
                                <ButtonGroup
                                    overrides={{
                                        Root: {
                                            style: {
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginBottom: "1px"
                                            }
                                        }
                                    }}
                                >
                                    <Button onClick={() => setAvatarPopUpOpened(true)}>Avatar Generation</Button>
                                    <Button onClick={() => setInitialsPopUpOpened(true)}>Initials</Button>
                                    <Button>Upload Avatar</Button>
                                </ButtonGroup>
                            </Panel>

                        </Accordion>
                    </>
                }
            </div>
        </>
    );
}

export default ToNftCanvas;
