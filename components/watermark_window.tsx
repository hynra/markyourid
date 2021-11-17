import React from "react";
import {useStyletron} from "baseui";
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader} from "baseui/modal";
import {FabricJSCanvas, useFabricJSEditor} from 'fabricjs-react'
import {Button} from "baseui/button";
import {fabric} from 'fabric'
import {CustomFabricCanvas} from "./custom_fabric_canvas";

const WatermarkWindow: React.FC<{
    imageSrc: string, isOpen: boolean, setIsOpen: Function, onWaterMarked: Function
}> = ({
          imageSrc,
          isOpen,
          setIsOpen,
          onWaterMarked
      }) => {

    const [css, theme] = useStyletron();
    const [canvas, setCanvas] = React.useState(null);

    let img: any = null;

    const initCanvas = () => (
        new fabric.Canvas('canvas', {
            height: img.height || 0,
            width: img.width || 0,
            backgroundColor: 'pink'
        })
    );

    const refHandler = (_canvas) => {
        if (!_canvas) return;

        let context = _canvas.getContext("2d");

        img = new Image();

        img.src = imageSrc;

        _canvas.width = img.width;
        _canvas.height = img.height;
        // context.drawImage(img, 0, 0, img.width, img.height);
        console.log(_canvas)
        if (canvas === null) {
            // console.log(img.width, img.height);
            // setCanvas(initCanvas());
        }
    }

    const {editor, onReady} = useFabricJSEditor()

    const onAddCircle = () => {
        editor?.addCircle()
        /*fabric.Image.fromURL(imageSrc, function (oImg) {
            editor?.canvas.add(oImg);
        });*/
    }
    const onAddRectangle = () => {
        editor?.addRectangle()
    }


    return (
        <Modal onClose={() => setIsOpen(false)} isOpen={isOpen} size='default'>
            <ModalHeader>Filters</ModalHeader>
            <ModalBody>
                <div className={css({
                    position: 'relative',
                    width: '100%',
                    marginBottom: "14px"
                })}>
                    {/*<canvas
                        className={css({
                            position: 'relative',
                            width: '100%',
                            marginBottom: "14px"
                        })}
                        ref={refHandler}
                        id="canvas"
                    />*/}
                    <Button onClick={onAddCircle}>Add circle</Button>
                    <Button onClick={onAddRectangle}>Add Rectangle</Button>
                    <CustomFabricCanvas
                        className={css({
                            position: 'relative',
                            width: '100%',
                            marginBottom: "14px"
                        })}
                        onReady={onReady}
                        imageSrc={imageSrc}
                        canvasRef={refHandler}
                    />
                </div>
                <div>

                </div>
            </ModalBody>
            <ModalFooter>
                <ModalButton kind="tertiary" onClick={() => setIsOpen(false)}>
                    Cancel
                </ModalButton>
                <ModalButton onClick={() => {
                    setIsOpen(false);
                }}>Okay</ModalButton>
            </ModalFooter>
        </Modal>
    )
}

export default WatermarkWindow;
