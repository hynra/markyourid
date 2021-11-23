import React from "react";
import {useStyletron} from "baseui";
import {PositionEnum} from "./setting_accordion";
import {saveImageAsUrl} from "../common/filters";

export interface MainCanvasTextProps {
    fontSize: number;
    color: string;
    text: string;
    opacity: number;
    horizontal?: number;
    vertical?: number;
    rectColor: string;
    rectEnable: boolean;
}


const MainCanvas: React.FC<{
    imageSrc: string, textProps: MainCanvasTextProps,
    onImageResized: Function
}> = ({
          imageSrc,
          textProps,
          onImageResized
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

    React.useEffect(() => {
        if (canvas) {
            // @ts-ignore
            let context = canvas.getContext("2d");
            const img = new Image();
            img.src = imageSrc;
            img.onload = function () {

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

                context.globalAlpha = textProps.opacity;
                context.font = `${textProps.fontSize}px Josefin Slab`;
                context.textAlign = "left";
                context.textBaseline = "top";

                const currText: string[] = toMultiLine(textProps.text);
                let metrics = context.measureText(textProps.text);

                let rectWidth = 0;
                let rectHeight = 0;

                if (textProps.rectEnable) {

                    for (let i = 0; i < currText.length; i++) {
                        const textMetricWidth = context.measureText(currText[i]).width;
                        if (textMetricWidth > rectWidth) {
                            rectWidth = textMetricWidth;
                        }
                        rectHeight += textProps.fontSize * 1.286;
                    }

                    rectWidth += textProps.fontSize;


                    context.fillStyle = textProps.rectColor;

                    context.fillRect(
                        // @ts-ignore
                        textProps.horizontal - textProps.fontSize / 2 || canvas.width / 2,
                        // @ts-ignore
                        textProps.vertical - textProps.fontSize || canvas.height / 2,
                        // metrics.width + 20,
                        rectWidth,
                        // textProps.fontSize *  1.286
                        rectHeight
                    );
                }

                context.font = `${textProps.fontSize}px Josefin Slab`;
                context.fillStyle = textProps.color;
                context.textAlign = "left";
                context.textBaseline = "middle";


                let lineSpacing = textProps.fontSize;


                // @ts-ignore
                let x = textProps.horizontal || canvas.width / 2;
                // @ts-ignore
                let y = textProps.vertical || canvas.height / 2;
                // draw each line on canvas.
                for (let i = 0; i < currText.length; i++) {
                    context.fillText(currText[i], x, y);
                    y += lineSpacing;
                }

                context.restore();
            };
        }

    }, [canvas, imageSrc, textProps])

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
                            marginBottom: "14px"
                        })}
                        ref={refHandler}
                        id="canvas"
                    />
                }
            </div>
        </>
    );
}

export default MainCanvas;
