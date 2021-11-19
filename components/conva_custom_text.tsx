import React from "react";
import {Stage, Layer, Transformer, Text} from 'react-konva';

const ConvaCustomText: React.FC<{ textProps, isSelected, onSelect, onChange }> = ({ textProps, isSelected, onSelect, onChange }) => {

    const textRef = React.useRef();
    const trRef = React.useRef();
    React.useEffect(() => {
        if (isSelected) {
            // @ts-ignore
            trRef.current?.nodes([textRef.current]);
            // @ts-ignore
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return(
        <React.Fragment>
            <Text
                onClick={onSelect}
                onTap={onSelect}
                ref={textRef}
                {...textProps}
                draggable
                onDragEnd={(e) => {
                    onChange({
                        ...textProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}
                onTransformEnd={(e) => {
                    const node = textRef.current;
                    // @ts-ignore
                    const scaleX = node.scaleX();
                    // @ts-ignore
                    const scaleY = node.scaleY();
                    // @ts-ignore
                    node.scaleX(1);
                    // @ts-ignore
                    node.scaleY(1);
                    onChange({
                        ...textProps,
                        fontSize: textProps.fontSize * scaleX,
                        scale: {x: 1, y: 1},
                        // @ts-ignore
                        x: node.x(),
                        // @ts-ignore
                        y: node.y(),
                        // @ts-ignore
                        width: Math.max(5, node.width() * scaleX),
                        // @ts-ignore
                        height: Math.max(node.height() * scaleY),
                    });
                }}
            />
            {isSelected && (
                <Transformer
                    keepRatio={true}
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
            )}
        </React.Fragment>
    )
}

export default ConvaCustomText;
