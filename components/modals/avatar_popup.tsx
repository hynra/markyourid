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
import {saveImageAsUrl} from "../../common/filters";

enum AvatarType {
    Avataaars = 'avataaars',
    Bottts = 'bottts',
    Identicon = 'identicon',
    OpenPeeps = 'open-peeps'
}

const avatarOptions = [
    {label: AvatarType.Avataaars, id: AvatarType.Avataaars},
    {label: AvatarType.Bottts, id: AvatarType.Bottts},
    {label: AvatarType.Identicon, id: AvatarType.Identicon},
    {label: AvatarType.OpenPeeps, id: AvatarType.OpenPeeps},
]

const AvatarPopUp: React.FC<{ isOpen: boolean, setIsOpen: Function, onAvatarSelected: Function }> = (
    {
        isOpen,
        setIsOpen,
        onAvatarSelected
    }
) => {

    const [css, theme] = useStyletron();
    const [sprite, setSprite] = React.useState(AvatarType.Avataaars);
    const [seed, setSeed] = React.useState('')
    const [imageSrc, setImageSrc] = React.useState(`https://avatars.dicebear.com/api/${sprite}/${seed}.svg?size=450&flip=1`);
    const [selectedAvatarOption, setSelectedAvatarOption] = React.useState(avatarOptions[0]);
    const [selectedAvatarType, setSelectedAvatarType] = React.useState<AvatarType>(AvatarType.Avataaars);
    const [canvas, setCanvas] = React.useState<any>(null);

    const refHandler = (_canvas) => {
        if (!_canvas) return;
        setCanvas(_canvas);
    }


    const onTypeChange = (type: any) => {
        const tmpSeed = ""
        setSeed(tmpSeed);
        setSprite(type.id);
        setImageSrc(`https://avatars.dicebear.com/api/${type.id}/${tmpSeed}.svg?size=450&flip=1`)
    }

    const onNextRandom = () => {
        const tempRandom = seed + getRandomChar(1);
        setSeed(tempRandom);
        setImageSrc(`https://avatars.dicebear.com/api/${sprite}/${tempRandom}.svg?size=450&flip=1`)
    }

    const onPreviousAvatar = () => {
        let tempSeed: string = ""
        if(seed.length <= 1){
                tempSeed = "";
        } else {
            tempSeed = seed.substring(0, seed.length - 1);
        }
        setSeed(tempSeed);
        setImageSrc(`https://avatars.dicebear.com/api/${sprite}/${tempSeed}.svg?size=450&flip=1`)
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
        const canvas = document.getElementById("canvasAvatarGeneration");
        const uri = saveImageAsUrl(canvas, "image/png");
        onAvatarSelected(uri);
    }

    return (
        <>
            <Modal
                onClose={() => setIsOpen(false)}
                isOpen={isOpen}
                closeable={false}
            >
                <ModalHeader>Generate Avatar</ModalHeader>
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
                                id="canvasAvatarGeneration"
                            />

                            <Label2 marginBottom="14px">Select Avatar Type</Label2>
                            <Select
                                clearable={false}
                                searchable={false}
                                options={avatarOptions}
                                value={[selectedAvatarOption]}
                                placeholder="Select Avatar Type"
                                onChange={params => {
                                    onTypeChange(params.value[0]);
                                    // @ts-ignore
                                    setSelectedAvatarOption(params.value[0])
                                }}
                            />
                            <ButtonGroup
                                overrides={
                                    {
                                        Root:
                                            {
                                                style:
                                                    {
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        marginTop: "14px"
                                                    }
                                            }
                                    }
                                }
                            >
                                <Button
                                    disabled={seed === ''}
                                    onClick={onPreviousAvatar}
                                >
                                    Prev</Button>
                                <Button
                                    onClick={onNextRandom}
                                >
                                    Random Next</Button>
                            </ButtonGroup>

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

export default AvatarPopUp;
