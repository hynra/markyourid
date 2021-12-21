import React from "react";
import {useStyletron} from "baseui";


const CanvasResizer: React.FC<{ }> = ({}) => {

    const [css, theme] = useStyletron();
    const [canvas, setCanvas] = React.useState();


    React.useEffect(() => {

    }, [])

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
                <canvas
                        className={css({
                            position: 'relative',
                            width: '100%',
                            marginBottom: "14px"
                        })}
                        ref={refHandler}
                        id="canvasResize"
                    />
            </div>
        </>
    );
}

export default CanvasResizer;
