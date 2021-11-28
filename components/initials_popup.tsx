import React from "react";
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader} from "baseui/modal";
import Cropper from "react-easy-crop";
import {Label2} from "baseui/typography";
import {Slider} from "baseui/slider";
import {useStyletron} from "baseui";
import {Select} from "baseui/select";
import {Button} from "baseui/button";
import {ButtonGroup} from "baseui/button-group";
import {Panel} from "baseui/accordion";
import {saveImageAsUrl} from "../common/filters";
import {Input} from "baseui/input";


const InitialPopUp: React.FC<{ isOpen: boolean, setIsOpen: Function, onInitialSelected: Function }> = (
    {
        isOpen,
        setIsOpen,
        onInitialSelected
    }
) => {

    const [css, theme] = useStyletron();
    const [seed, setSeed] = React.useState('Your Initials')
    const [imageSrc, setImageSrc] = React.useState(`https://avatars.dicebear.com/api/initials/${seed}.svg?size=450`);
    const [canvas, setCanvas] = React.useState<any>(null);

    const refHandler = (_canvas) => {
        if (!_canvas) return;
        setCanvas(_canvas);
    }


    const onNextRandom = () => {
        const tempRandom = seed + getRandomChar(1);
        setSeed(tempRandom);
        setImageSrc(`https://avatars.dicebear.com/api/initials/${tempRandom}.svg?size=450&flip=1`)
    }

    const onPreviousAvatar = () => {
        let tempSeed: string = ""
        if (seed.length <= 1) {
            tempSeed = "";
        } else {
            tempSeed = seed.substring(0, seed.length - 1);
        }
        setSeed(tempSeed);
        setImageSrc(`https://avatars.dicebear.com/api/initials/${tempSeed}.svg?size=450&flip=1`)
    }

    const generateInitialsImage = () => {
        setImageSrc(`https://avatars.dicebear.com/api/initials/${seed}.svg?size=450`)
    }

    const getRandomChar = (length) => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }


    React.useEffect(() => {
        if (canvas) {
            drawImage();
        }
    }, [canvas, imageSrc])

    const drawImage = () => {
        let context = canvas.getContext("2d");
        const img = new Image();
        img.src = imageSrc;
        img.setAttribute('crossorigin', 'anonymous');
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            context.fillStyle = "white";
            context.fillRect(0, 0, img.width, img.height);
            context.drawImage(img, 0, 0, img.width, img.height);
        }
    }

    const saveImage = () => {
        const canvas = document.getElementById("canvasInitialGeneration");
        const uri = saveImageAsUrl(canvas, "image/png");
        onInitialSelected(uri);
    }


    return (
        <>
            <Modal
                onClose={() => setIsOpen(false)}
                isOpen={isOpen}
                closeable={false}
            >
                <ModalHeader>Select Self Image</ModalHeader>
                <ModalBody>
                    <div>
                        <div className={css({
                            position: 'relative',
                            width: '100%',
                            marginBottom: "14px"
                        })}>

                            <canvas
                                className={css({
                                    position: 'relative',
                                    width: '100%',
                                    marginBottom: "14px"
                                })}
                                ref={refHandler}
                                id="canvasInitialGeneration"
                            />

                            <Input
                                value={seed}
                                // @ts-ignore
                                onChange={e => setSeed(e.target.value)}
                                placeholder="Set Your Initials"
                                clearOnEscape
                            />
                            <Button
                                onClick={generateInitialsImage}
                                overrides={{
                                    BaseButton: {
                                        style: {
                                            width: '100%',
                                            marginTop: "14px",
                                            marginBottom: "18px"
                                        }
                                    }
                                }}
                            >
                                Generate
                            </Button>

                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <ModalButton kind="tertiary" onClick={() => setIsOpen(false)}>
                        Cancel
                    </ModalButton>
                    <ModalButton onClick={() => {
                        saveImage();
                        setIsOpen(false);
                    }}>Okay</ModalButton>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default InitialPopUp;
