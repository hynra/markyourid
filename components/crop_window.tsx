import React from "react";
import Cropper from 'react-easy-crop'
import {useStyletron} from "baseui";
import {Slider} from "baseui/slider";
import {Display4, H6, Label2} from "baseui/typography";
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader} from "baseui/modal";
import getCroppedImg from "../common/crop_image";

const CropWindow: React.FC<{ imageSrc: string, isOpen: boolean, setIsOpen: Function, onCropped: Function }> =
    ({imageSrc, isOpen, setIsOpen, onCropped}) => {

        const [crop, setCrop] = React.useState({x: 0, y: 0});
        const [zoom, setZoom] = React.useState(1);
        const [rotation, setRotation] = React.useState(0);
        const [css, theme] = useStyletron();
        const [zoomValue, setZoomValue] = React.useState([1]);
        const [rotationValue, setRotationValue] = React.useState([0]);
        const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<any>(null)


        if (typeof window !== "undefined") {

        }

        const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
            setCroppedAreaPixels(croppedAreaPixels);
        }, [])


        const saveCroppedImage = React.useCallback(async () => {
            try {
                const croppedImage = await getCroppedImg(
                    imageSrc,
                    croppedAreaPixels,
                    rotation
                )
                onCropped(croppedImage);

            } catch (e) {
                console.error(e)
            }
        }, [croppedAreaPixels])

        return (

            <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
                <ModalHeader>Crop image to common identity card aspect ratio</ModalHeader>
                <ModalBody>
                    <div>
                        <div className={css({
                            position: 'relative',
                            width: '100%',
                            height: "360px",
                            marginBottom: "14px"
                        })}>
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={19 / 12}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                rotation={rotation}
                            />
                        </div>
                        <Label2>Set Zoom</Label2>
                        <Slider
                            value={zoomValue}
                            onChange={({value}) => value && setZoomValue(value)}
                            onFinalChange={({value}) => setZoom(value[0])}
                            min={1}
                            max={10}
                        />
                        <Label2>Set Rotation</Label2>
                        <Slider
                            value={rotationValue}
                            onChange={({value}) => value && setRotationValue(value)}
                            onFinalChange={({value}) => setRotation(value[0])}
                            min={0}
                            max={360}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <ModalButton kind="tertiary" onClick={() => setIsOpen(false)}>
                        Cancel
                    </ModalButton>
                    <ModalButton onClick={() => {
                        saveCroppedImage().then(r => setIsOpen(false));
                    }}>Okay</ModalButton>
                </ModalFooter>
            </Modal>
        )
    }

export default CropWindow;
