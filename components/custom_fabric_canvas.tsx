import React, {useEffect, useRef, useState} from 'react'
import {fabric} from 'fabric'

export interface Props {
    className?: string
    onReady?: (canvas: fabric.Canvas) => void
    imageSrc?: string
    canvasRef: any
}

/**
 * Fabric canvas as component
 */
const CustomFabricCanvas = ({className, onReady, imageSrc, canvasRef}: Props) => {
    // const canvasEl = useRef(null)
    const canvasElParent = useRef<HTMLDivElement>(null)
    const [canvas, setCanvas] = useState(null);



    const refHandler = (_canvas) => {
        if (!_canvas) return;

        let context = _canvas.getContext("2d");

        const img = new Image();

        img.src = imageSrc;

        // _canvas.width = img.width;
        _canvas.height = img.height;
        // _canvas.style = null;
        _canvas.style.width = '100%';
        _canvas.style.height = null;
        _canvas.style.position = 'relative';
        _canvas.width = _canvas.offsetWidth;
        console.log(img.width, img.height)
        _canvas.height = _canvas.width * (img.height / img.width);

        console.log(_canvas)
        // context.drawImage(img, 0, 0, img.width, img.height);
        if (canvas === null) {
            setCanvas(_canvas);


            const fabricCanvas = new fabric.Canvas(_canvas)
            console.log(fabricCanvas)
            const setCurrentDimensions = () => {
                fabricCanvas.setHeight(_canvas.clientHeight || 0)
                fabricCanvas.setWidth(_canvas.clientWidth || 0)
                fabricCanvas.setDimensions({ width: _canvas.clientWidth, height: _canvas.clientHeight });
                fabricCanvas.calcOffset();
                fabricCanvas.renderAll()
            }
            const resizeCanvas = () => {
                setCurrentDimensions()
            }
            setCurrentDimensions()


            window.addEventListener('resize', resizeCanvas, false)

            if (onReady) {
                onReady(fabricCanvas)
            }

            return () => {
                fabricCanvas.dispose()
                window.removeEventListener('resize', resizeCanvas)
            }

        }
    }


    useEffect(() => {

        /*const img = new Image();
        img.src = imageSrc;*/

        /*canvasEl.current.width = img.width;
        canvasEl.current.height = img.height;
        canvasEl.current.style.width = "100%"*/

        /*const _canvas = new fabric.Canvas(canvas)
        const setCurrentDimensions = () => {
            _canvas.setHeight(canvasElParent.current?.clientHeight || 0)
            _canvas.setWidth(canvasElParent.current?.clientWidth || 0)
            _canvas.renderAll()
        }
        const resizeCanvas = () => {
            setCurrentDimensions()
        }
        setCurrentDimensions()


        window.addEventListener('resize', resizeCanvas, false)

        if (onReady) {
            onReady(_canvas)
        }

        return () => {
            _canvas.dispose()
            window.removeEventListener('resize', resizeCanvas)
        }*/
    }, [])
    return (
        <div ref={canvasElParent} className={className}>
            <canvas ref={refHandler}/>
        </div>
    )
}

export {CustomFabricCanvas}
