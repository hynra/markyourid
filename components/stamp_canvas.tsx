import React from "react";
import {useStyletron} from "baseui";
import {saveImageAsUrl} from "../common/filters";

export interface StampCanvasProps {
    fontSize: number;
    color: string;
    text: string;
    opacity: number;
    horizontal?: number;
    vertical?: number;
    qrHorizontal: number;
    qrVertical: number;
    rectColor: string;
    rectEnable: boolean;
    showText: boolean;
    showQr: boolean;
    nftUrl: string;
    qrcodeImage: string;
    qrSize: number,
    qrOpacity: number;
}


const StampCanvas: React.FC<{
    imageSrc: string, canvasProps: StampCanvasProps,
    onImageResized: Function,
}> = ({
          imageSrc,
          canvasProps,
          onImageResized,
      }) => {

    const [css, theme] = useStyletron();
    const [canvas, setCanvas] = React.useState();
    const MAX_IMAGE_WIDTH: number = 1440;
    const MAX_IMAGE_HEIGHT: number = 1440;


    function toMultiLine(text) {
        let textArr: any[];
        text = text.replace(/\n\r?/g, '<br/>');
        textArr = text.split("<br/>");
        return textArr;
    }

    function getHeight(length, ratio) {
        const height = ((length) / (Math.sqrt((Math.pow(ratio, 2) + 1))));
        return Math.round(height);
    }

    const loadQrImage = (): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const qrImage = new Image();
            qrImage.src = canvasProps.qrcodeImage;
            qrImage.onload = function () {
                qrImage.width = qrImage.width * canvasProps.qrSize;
                qrImage.height = qrImage.height * canvasProps.qrSize;
                resolve(qrImage);

            }
        })
    }

    const draw = (img, qrImage) => {

        // @ts-ignore
        let context = canvas.getContext("2d");

        if (img.width > MAX_IMAGE_WIDTH) {

            const maxWidth = MAX_IMAGE_WIDTH;
            const maxHeight = MAX_IMAGE_HEIGHT;
            let ratio = 0;
            const width = img.width;
            const height = img.height;
            let desiredWidth;
            let desiredHeight;
            if (width > maxWidth && width > height) {

                ratio = width / height;
                desiredHeight = maxWidth / ratio;
                desiredWidth = maxWidth
            } else if (height > maxHeight && height > width) {

                ratio = height / width;
                desiredWidth = maxHeight / ratio
                desiredHeight = maxHeight
            } else {

                desiredWidth = maxWidth
                desiredHeight = maxHeight
            }

            // @ts-ignore
            canvas.width = desiredWidth;
            // @ts-ignore
            canvas.height = desiredHeight;



            context.drawImage(img, 0, 0, desiredWidth, desiredHeight);
            const uri = saveImageAsUrl(canvas);
            onImageResized(uri);

        } else {
            // @ts-ignore
            canvas.width = img.width;
            // @ts-ignore
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
        }

        if (canvasProps.qrcodeImage && canvasProps.showQr) {
            // context.globalAlpha = textProps.opacity;

            context.globalAlpha = canvasProps.qrOpacity;
            const qrXpos = (canvasProps.qrHorizontal - qrImage.width < 0) ? canvasProps.qrHorizontal : canvasProps.qrHorizontal - qrImage.width;
            const qrYpos = (canvasProps.qrVertical - qrImage.height < 0) ? canvasProps.qrVertical : canvasProps.qrVertical - qrImage.height;
            context.clearRect(qrImage, qrXpos, qrYpos, qrImage.width, qrImage.height);
            context.drawImage(qrImage, qrXpos, qrYpos, qrImage.width, qrImage.height);
        }

        context.globalAlpha = canvasProps.opacity;
        context.font = `${canvasProps.fontSize}px Josefin Slab`;
        context.textAlign = "left";
        context.textBaseline = "top";

        const currText: string[] = toMultiLine(canvasProps.text);

        let rectWidth = 0;
        let rectHeight = 0;

        if (canvasProps.rectEnable) {

            for (let i = 0; i < currText.length; i++) {
                const textMetricWidth = context.measureText(currText[i]).width;
                if (textMetricWidth > rectWidth) {
                    rectWidth = textMetricWidth;
                }
                rectHeight += canvasProps.fontSize * 1.286;
            }

            rectWidth += canvasProps.fontSize;
            context.fillStyle = canvasProps.rectColor;
            if (canvasProps.showText) {
                context.fillRect(
                    // @ts-ignore
                    canvasProps.horizontal - canvasProps.fontSize / 2 || canvas.width / 2,
                    // @ts-ignore
                    canvasProps.vertical - canvasProps.fontSize || canvas.height / 2,
                    // metrics.width + 20,
                    rectWidth,
                    // textProps.fontSize *  1.286
                    rectHeight
                );
            }
        }

        context.font = `${canvasProps.fontSize}px Josefin Slab`;
        context.fillStyle = canvasProps.color;
        context.textAlign = "left";
        context.textBaseline = "middle";


        let lineSpacing = canvasProps.fontSize;


        // @ts-ignore
        let x = canvasProps.horizontal || canvas.width / 2;
        // @ts-ignore
        let y = canvasProps.vertical || canvas.height / 2;
        // draw each line on canvas.
        for (let i = 0; i < currText.length; i++) {
            if (canvasProps.showText) {
                context.fillText(currText[i], x, y);
            }
            y += lineSpacing;
        }

        context.restore();
    }

    React.useEffect(() => {
        if (canvas) {
            const img = new Image();
            img.src = imageSrc;
            img.onload = async function () {
                const qrImage = await loadQrImage();
                draw(img, qrImage);
            };
        }

    }, [canvas, imageSrc, canvasProps])

    const refHandler = (currCanvas) => {
        if (!currCanvas) return;
        if (!canvas) setCanvas(currCanvas);
    }


    return (
        <>
            <div className={css({
                position: 'relative',
                width: '100%',
                marginBottom: "14px"
            })}>
                {
                    imageSrc !== "" && <canvas
                        className={css({
                            position: 'relative',
                            width: '100%',
                            marginBottom: "14px",
                            borderRadius: '5px'
                        })}
                        ref={refHandler}
                        id="canvas"
                    />
                }
            </div>
        </>
    );
}

export default StampCanvas;
