import React from "react";
import {useStyletron} from "baseui";

const MainCanvas: React.FC<{imageSrc: string}> = ({imageSrc}) => {

    const [css, theme] = useStyletron();
    const [canvas, setCanvas] = React.useState();


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
                console.log(canvas)
            };
        }

    },[canvas, imageSrc])

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
