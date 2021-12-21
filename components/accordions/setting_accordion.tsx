import React from "react";
import {Accordion, Panel} from "baseui/accordion";
import {Label2} from "baseui/typography";
import {Slider} from "baseui/slider";
import {StatefulPopover} from "baseui/popover";
import {Button} from "baseui/button";
import {Overflow} from "baseui/icon";
import {Select} from "baseui/select";
import {TwitterPicker} from 'react-color'
import {Checkbox, LABEL_PLACEMENT, STYLE_TYPE} from "baseui/checkbox";


export const colorSwatches = ['#4D4D4D',
    '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00',
    '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333',
    '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00',
    '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000',
    '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900',
    '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E']

export enum PositionEnum {
    KananBawah,
    KananAtas,
    KiriBawah,
    KiriAtas,
    Tengah
}

export const positionOption = [
    {label: "Kanan Bawah", id: PositionEnum.KananBawah},
    {label: "Kanan Atas", id: PositionEnum.KananAtas},
    {label: "Kiri Bawah", id: PositionEnum.KiriBawah},
    {label: "Kiri Atas", id: PositionEnum.KiriAtas},
    {label: "Tengah", id: PositionEnum.Tengah},
]

const SettingAccordion: React.FC<{
    onFontSizeChanged: Function, onWmColoChanged: Function, onPositionChanged: Function,
    onOpacityChanged: Function, imageSrc: string, onHorizontalPosChanged: Function, onVerticalPosChanged: Function,
    onRectColorChanged: Function, onEnableRectChanged: Function, title?: string
}> = ({
          onFontSizeChanged,
          onWmColoChanged,
          onPositionChanged,
          onOpacityChanged,
          imageSrc,
          onHorizontalPosChanged,
          onVerticalPosChanged,
          onEnableRectChanged,
          onRectColorChanged,
          title = "Customize",
      }
) => {

    const [fontSize, setFontSize] = React.useState(48);
    const [wmColor, setWmColor] = React.useState('#fff');
    const [opacity, setOpacity] = React.useState(0.5);
    const [horizontalPosition, setHorizontalPosition] = React.useState(null);
    const [maxHorizontal, setMaxHorizontal] = React.useState(null);
    const [verticalPosition, setVerticalPosition] = React.useState(null);
    const [maxVertical, setMaxVertical] = React.useState(null);
    const [reactColor, setRectColor] = React.useState('#000');
    const [enableRect, setEnableRect] = React.useState(true);


    React.useEffect(() => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = function () {
            const width = img.width;
            const height = img.height;
            setMaxHorizontal(width);
            setMaxVertical(height);
            onHorizontalPosChanged(width / 2);
            onVerticalPosChanged(height / 2);
            setHorizontalPosition(width / 2);
            setVerticalPosition(height / 2);

        }
    }, [imageSrc]);


    return (
        <Accordion>
            <Panel title={title}>
                <Label2>Font Size</Label2>
                <Slider
                    value={[fontSize]}
                    onChange={({value}) => value && setFontSize(value[0])}
                    onFinalChange={({value}) => {
                        setFontSize(value[0])
                        onFontSizeChanged(value[0])
                    }}
                    min={14}
                    max={450}
                />
                <Label2>Horizontal Position</Label2>
                <Slider
                    value={[horizontalPosition]}
                    onChange={({value}) => value && setHorizontalPosition(value[0])}
                    onFinalChange={({value}) => {
                        setHorizontalPosition(value[0])
                        onHorizontalPosChanged(value[0])
                    }}
                    min={0}
                    max={maxHorizontal}
                />
                <Label2>Vertical Position</Label2>
                <Slider
                    value={[verticalPosition]}
                    onChange={({value}) => value && setVerticalPosition(value[0])}
                    onFinalChange={({value}) => {
                        setVerticalPosition(value[0])
                        onVerticalPosChanged(value[0])
                    }}
                    min={0}
                    max={maxVertical}
                />
                <Label2>Opacity</Label2>
                <Slider
                    value={[opacity * 100]}
                    onChange={({value}) => value && setOpacity(value[0] / 100)}
                    onFinalChange={({value}) => {
                        setOpacity(value[0] / 100);
                        onOpacityChanged(value[0] / 100);
                    }}
                    min={10}
                    max={100}
                />
                <StatefulPopover
                    content={
                        <TwitterPicker
                            disableAlpha
                            color={wmColor}
                            triangle={"hide"}
                            onChangeComplete={(color) => {
                                setWmColor(color.hex);
                                onWmColoChanged(color.hex);
                            }}
                            colors={colorSwatches}
                        />
                    }
                    accessibilityType={'tooltip'}
                >
                    <Button
                        overrides={{
                            BaseButton: {
                                style: {
                                    width: '100%',
                                    marginTop: "14px",
                                    marginBottom: "18px"
                                }
                            }
                        }}
                        endEnhancer={() => <Overflow size={24}/>}
                    >
                        Select text color
                    </Button>
                </StatefulPopover>
                <Checkbox
                    checked={enableRect}
                    checkmarkType={STYLE_TYPE.toggle_round}
                    onChange={e => {
                        // @ts-ignore
                        setEnableRect(e.target.checked)
                        // @ts-ignore
                        onEnableRectChanged(e.target.checked)
                    }}
                    labelPlacement={LABEL_PLACEMENT.left}
                    overrides={{
                        Root: {
                            style: {
                                width: '100%',
                                marginTop: "14px",
                                marginBottom: "18px",
                                alignItems: 'center',
                                justifyContent: 'center'
                            }
                        }
                    }}
                >
                    With Text Background
                </Checkbox>
                {
                    enableRect &&
                    <StatefulPopover
                        content={
                            <TwitterPicker
                                disableAlpha
                                color={reactColor}
                                triangle={"hide"}
                                onChangeComplete={(color) => {
                                    setRectColor(color.hex);
                                    onRectColorChanged(color.hex);
                                }}
                                colors={colorSwatches}
                            />
                        }
                        accessibilityType={'tooltip'}
                    >
                        <Button
                            overrides={{
                                BaseButton: {
                                    style: {
                                        width: '100%',
                                        marginTop: "14px",
                                        marginBottom: "18px"
                                    }
                                }
                            }}
                            endEnhancer={() => <Overflow size={24}/>}
                        >
                            Select background text color
                        </Button>
                    </StatefulPopover>
                }
            </Panel>
        </Accordion>
    )
}


export default SettingAccordion;
