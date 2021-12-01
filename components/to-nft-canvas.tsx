import React from "react";
import {useStyletron} from "baseui";
import {Label1, Label2, Paragraph2, Paragraph4} from "baseui/typography";
import {SIZE, Textarea} from "baseui/textarea";
import {StyledBody} from "baseui/card";
import {Input} from "baseui/input";
import {Button, KIND} from "baseui/button";
import AvatarPopUp from "./avatar_popup";
import {Accordion, Panel} from "baseui/accordion";
import {ButtonGroup} from "baseui/button-group";
import InitialPopUp from "./initials_popup";
import CropWindow from "./crop_window";
import {Checkbox, LABEL_PLACEMENT, STYLE_TYPE} from "baseui/checkbox";
import {ModalBody} from "baseui/modal";
import WmModel from "../common/wm_model";
import {ChevronRight, Upload} from "baseui/icon";
import CommonImagePopUp from "./common_image_popup";
import {downloadCanvasToImage, saveImageAsUrl} from "../common/filters";
import CommonPopUp from "./common_popup";

export enum AvatarMethod {
    Generation,
    Initials,
    Upload
}

interface CurrentAvatar {
    url: string,
    Method: AvatarMethod,
}

const NON_EKTP_IMAGE = "/mock0.png";
const EKTP_IMAGE = "/mock1.png";

const ToNftCanvas: React.FC<{ accountAddress: string, currText: string, currModel?: WmModel, onPublish: Function }> = (
    {
        accountAddress,
        currText,
        currModel,
        onPublish
    }
) => {

    const [css, theme] = useStyletron();
    const [canvas, setCanvas] = React.useState();
    const [additionalText, setAdditionalText] = React.useState<string>('Name: YourName');
    const [selfImage, setSelfImage] = React.useState<any>(null);
    const [avatarPopUpOpened, setAvatarPopUpOpened] = React.useState<boolean>(false);
    const [initialsPopUpOpened, setInitialsPopUpOpened] = React.useState<boolean>(false);
    const [uploadPopUpOpened, setUploadPopUpOpened] = React.useState<boolean>(false);
    const [selectedAvatar, setSelectedAvatar] = React.useState<CurrentAvatar>(null);
    const [currentText, setCurrentText] = React.useState(currText);
    const [mainBackground, setMainBackground] = React.useState(NON_EKTP_IMAGE);
    const [isEktp, setIsEktp] = React.useState(false);
    const [origImgWindowOpened, setOrigImgWindowOpened] = React.useState(false);
    const [commonWindowOpened, setCommonWindowOpened] = React.useState(false);
    const [title, setTitle] = React.useState(`Identity Card submission for <service-name>`);

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

    const saveAvatarToLocal = () => {
        downloadCanvasToImage(selectedAvatar.url);
    }

    const submitNft = () => {
        const url = saveImageAsUrl(canvas);
        onPublish(title, url, additionalText);
    }


    React.useEffect(() => {
        if (canvas) {
            const img = new Image();
            img.src = mainBackground;
            img.onload = function () {
                // @ts-ignore
                let context = canvas.getContext("2d");
                // @ts-ignore
                canvas.width = img.width;
                // @ts-ignore
                canvas.height = img.height;
                context.fillStyle = "white";
                context.drawImage(img, 0, 0, img.width, img.height);


                context.fillStyle = "black";
                context.font = `bold 25px monospace`;
                context.textAlign = "left";
                context.textBaseline = "middle";
                const textWidth = context.measureText(accountAddress).width;
                // @ts-ignore
                context.fillText(accountAddress, (canvas.width / 2) - (textWidth / 2), 80);


                const texts: string[] = toMultiLine(currentText + '\n' + additionalText);
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

    }, [canvas, currText, additionalText, selfImage, selectedAvatar, currentText, mainBackground])



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
            <CropWindow
                isOpen={uploadPopUpOpened}
                setIsOpen={setUploadPopUpOpened}
                title="Upload & crop your avatar"
                ratio={1}
                onCropped={(newImage => {
                    setSelectedAvatar({
                        Method: AvatarMethod.Upload,
                        url: newImage
                    })
                })}/>
                <CommonImagePopUp
                    isOpen={origImgWindowOpened}
                    setIsOpen={setOrigImgWindowOpened}
                    imageSrc={currModel.image}
                />
                <CommonPopUp
                    isOpen={commonWindowOpened}
                    setIsOpen={setCommonWindowOpened}
                    text="The image will be uploaded (Lazy Minting) to the Rarible platform at no cost, are you sure want to continue?"
                    onAccepted={submitNft}
                />
            <div className={css({
                position: 'relative',
                width: '100%',
                marginBottom: "14px"
            })}>
                {
                    <>
                        <Label1 marginBottom="scale800">Create NFT Version</Label1>
                        <canvas
                            className={css({
                                position: 'relative',
                                width: '100%',
                                marginBottom: "14px"
                            })}
                            ref={refHandler}
                            id="to-nft-canvas"
                        />
                        <Label2 marginBottom="scale100">NFT title</Label2>
                        <Paragraph2 marginTop="scale100">It will be used to name your NFT on the marketplace</Paragraph2>
                        <Input
                            value={title}
                            // @ts-ignore
                            onChange={e => setTitle(e.target.value)}
                        />

                        <Label2 marginBottom="scale100" marginTop="scale500">Main Text</Label2>
                        <Paragraph2 marginTop="scale100">Please keep the Main Text similar to the original
                            text</Paragraph2>

                        <Textarea
                            value={currentText}
                            size={SIZE.compact}
                            // disabled
                            // @ts-ignore
                            onChange={e => setCurrentText(e.target.value)}
                            onKeyPress={(e) => {
                                const re = /[ \\n]+/g;
                                if (!re.test(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            onKeyDown={(evt => {
                                const t = evt.target;
                                if (evt.keyCode === 8) {
                                    // @ts-ignore
                                    const deletedChar = t.value[t.selectionStart - 1];
                                    if (deletedChar !== "\n" && deletedChar !== " ") {
                                        evt.preventDefault()
                                    }
                                } else if (evt.keyCode === 46) {
                                    // @ts-ignore
                                    const deletedChar = t.value[t.selectionStart];
                                    if (deletedChar !== "\n" && deletedChar !== " ") {
                                        evt.preventDefault()
                                    }
                                }
                            })}
                            placeholder="Controlled Input"
                            clearOnEscape
                        />
                        <Label2 marginBottom="14px" marginTop="14px">Additional Text</Label2>
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
                                    <Button onClick={() => setUploadPopUpOpened(true)}>Upload Avatar</Button>
                                </ButtonGroup>
                            </Panel>
                            <Panel title="Misc.">
                                <Checkbox
                                    checked={isEktp}
                                    checkmarkType={STYLE_TYPE.toggle_round}
                                    onChange={e => {
                                        // @ts-ignore
                                        const isEnable = e.target.checked;
                                        setIsEktp(isEnable)
                                        if (isEnable === true) {
                                            setMainBackground(EKTP_IMAGE);
                                        } else setMainBackground(NON_EKTP_IMAGE);
                                    }}
                                    labelPlacement={LABEL_PLACEMENT.left}
                                    overrides={{
                                        Root: {
                                            style: {
                                                width: '100%',
                                                marginTop: "2px",
                                                marginBottom: "2px",
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }
                                        }
                                    }}
                                >
                                    Is E-KTP (Indonesia E-ID Card)?
                                </Checkbox>
                                <ButtonGroup
                                    overrides={{Root: {style: {alignItems: 'center', justifyContent: 'center', marginTop: "14px"}}}}
                                >
                                    <Button
                                        startEnhancer={() => <ChevronRight  size={24} /> }
                                        kind={KIND.primary}
                                        onClick={() => setOrigImgWindowOpened(true)}
                                    >
                                        View Original Image
                                    </Button>
                                    {
                                        selectedAvatar &&
                                        <Button
                                            startEnhancer={() => <ChevronRight size={24}/>}
                                            kind={KIND.primary}
                                            onClick={saveAvatarToLocal}
                                        >
                                            Download
                                            Avatar Image
                                        </Button>
                                    }

                                </ButtonGroup>
                            </Panel>
                        </Accordion>
                        <Button
                            overrides={{
                                BaseButton: {
                                    style: {
                                        width: '100%',
                                        marginTop: "14px",
                                        marginBottom: "18px"
                                    }
                                }
                            }}
                            endEnhancer={() => <Upload size={24}/>}
                            onClick={() => setCommonWindowOpened(true)}
                        >
                            Submit NFT Version
                        </Button>
                    </>
                }
            </div>
        </>
    );
}

export default ToNftCanvas;
