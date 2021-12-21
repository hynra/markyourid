import React from "react";
import {Image, Layer, Stage} from 'react-konva';
import {useStyletron} from "baseui";
import ConvaCustomText from "./conva_custom_text";


const CustomStage: React.FC<{ imgSrc: string, predefinedText: string, getImage: Function }> = (
    {
        imgSrc,
        predefinedText,
        getImage
    }
) => {

    const [image, setImage] = React.useState<any>();
    const [css, theme] = useStyletron();
    const [canvas, setCanvas] = React.useState();
    const [textProps, setTextProps] = React.useState({
        text: predefinedText,
        draggable: true,
        fontSize: 36,
        fontFamily: 'Josefin Slab',
        fill: "#fff",
        stroke: '#000',
        opacity: 0.5,
        x: 40,
        y: 65,
    });


    const stageRef = React.useRef(null);

    React.useEffect(() => {
        getImage(() => handleExport);
        window.addEventListener('resize', () => {
            console.log('resized')
        })
    }, [])

    const handleExport = (): string => {
        return stageRef.current.toDataURL({pixelRatio: 2});
    };


    if (!image) {
        const img = new window.Image();
        img.src = imgSrc;
        setImage(img);
    }


    const refHandler = (_canvas) => {
        if (!_canvas) return;

        let context = _canvas.getContext("2d");

        const img = new window.Image();

        img.src = imgSrc;
        img.onload = async function () {
            _canvas.width = img.width;
            _canvas.height = img.height;
            // context.drawImage(img, 0, 0, img.width, img.height);
            console.log(_canvas.width, _canvas.height)
            console.log(_canvas.offsetWidth, _canvas.offsetHeight)
            console.log(_canvas.offsetWidth, _canvas.offsetHeight)

            if (!canvas)
                setCanvas(_canvas)
        }


    }


    const checkDeselect = (e) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setTextSelected(false);
        }
    };


    const parentRef = React.useRef(null);
    const [textSelected, setTextSelected] = React.useState(true);

    function downloadURI(uri, name) {
        let link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <>
            {image && <div ref={parentRef} id="stage-parent" className={css({
                position: 'relative',
                width: '100%',
                // height: "100%",
                marginBottom: "14px"
            })}>
                <canvas
                    className={css({
                        position: 'absolute',
                        width: '100%',
                        zIndex: -1
                    })}
                    ref={refHandler}
                    id="canvas2"
                />
                {canvas &&
                <Stage
                    ref={stageRef}
                    // @ts-ignore
                    width={canvas.offsetWidth}
                    // @ts-ignore
                    height={canvas.offsetHeight}
                    onMouseDown={checkDeselect}
                    onTouchStart={checkDeselect}
                    scaleX={1}
                    scaleY={1}
                >
                    <Layer>
                        <Image
                            // @ts-ignore
                            width={canvas.offsetWidth}
                            // @ts-ignore
                            height={canvas.offsetHeight}
                            image={image}
                            onClick={() => setTextSelected(false)}
                            onTap={() => setTextSelected(false)}
                            ref={node => {
                                console.log(stageRef.current)
                            }}
                        />
                        <ConvaCustomText
                            textProps={textProps}
                            isSelected={textSelected}
                            onSelect={() => {
                                setTextSelected(true);
                            }}
                            onChange={(newAttrs) => {
                                setTextProps(newAttrs);
                            }}
                        />
                    </Layer>
                </Stage>}
            </div>}
        </>
    )
}

export default CustomStage
