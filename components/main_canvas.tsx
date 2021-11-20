import React from "react";
import {useStyletron} from "baseui";
import {PositionEnum} from "./setting_accordion";

export interface MainCanvasTextProps {
    fontSize: number;
    color: string;
    position: PositionEnum;
    text: string;
    opacity: number;
}



const MainCanvas: React.FC<{imageSrc: string, textProps: MainCanvasTextProps}> = ({imageSrc, textProps}) => {

    const [css, theme] = useStyletron();
    const [canvas, setCanvas] = React.useState();


    function toMultiLine(text){
        let textArr: any[];
        text = text.replace(/\n\r?/g, '<br/>');
        textArr = text.split("<br/>");
        return textArr;
    }


    React.useEffect(() => {
        if(canvas){
            // @ts-ignore
            let context = canvas.getContext("2d");
            const img = new Image();
            img.src = imageSrc;
            img.onload = function () {
                // @ts-ignore
                canvas.width = img.width;
                // @ts-ignore
                canvas.height = img.height;
                context.drawImage(img, 0, 0, img.width, img.height);

                context.globalAlpha = textProps.opacity;
                context.font = `${textProps.fontSize}px Josefin Slab`;
                context.fillStyle = textProps.color;
                context.textAlign = "center";
                context.textBaseline = "Middle";

                const currText = toMultiLine(textProps.text);
                let lineSpacing = textProps.fontSize;
                // @ts-ignore
                let x = canvas.width/2;
                // @ts-ignore
                let y = canvas.height/2;
                // draw each line on canvas.
                for(let i = 0; i < currText.length; i++){
                    context.fillText(currText[i], x, y);
                    y += lineSpacing;
                }

                // @ts-ignore
                // context.fillText(textProps.text, canvas.width/2, canvas.height/2);
                // context.wrapText(textProps.text, canvas.width/2, canvas.height/2, canvas.width, canvas.height);
            };
        }

    },[canvas, imageSrc, textProps])

    const refHandler = (currCanvas) => {
        if (!currCanvas) return;
        if(!canvas) setCanvas(currCanvas);
    }


    return(
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
