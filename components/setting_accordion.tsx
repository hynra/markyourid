import React from "react";
import {Accordion, Panel} from "baseui/accordion";
import {Label2} from "baseui/typography";
import {Slider} from "baseui/slider";
import {StatefulPopover} from "baseui/popover";
import {Button} from "baseui/button";
import {Overflow} from "baseui/icon";
import {Select} from "baseui/select";
import {TwitterPicker} from 'react-color'


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

const SettingAccordion: React.FC<{ onFontSizeChanged: Function, onWmColoChanged: Function, onPositionChanged: Function, onOpacityChanged: Function }> = (
    {onFontSizeChanged, onWmColoChanged, onPositionChanged, onOpacityChanged}
) => {

    const [fontSize, setFontSize] = React.useState(48);
    const [wmColor, setWmColor] = React.useState('#fff');
    const [position, setPosition] = React.useState([positionOption[0]]);
    const [opacity, setOpacity] = React.useState(0.5);

    React.useEffect(() => {

    }, [fontSize, wmColor, position, opacity]);


    return (
        <Accordion>
            <Panel title="Sesuaikan">
                <Label2>Atur Ukuran Huruf</Label2>
                <Slider
                    value={[fontSize]}
                    onChange={({value}) => value && setFontSize(value[0])}
                    onFinalChange={({value}) => {
                        setFontSize(value[0])
                        onFontSizeChanged(value[0])
                    }}
                    min={24}
                    max={250}
                />
                <Label2>Atur Opacity</Label2>
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
                                    marginBottom: "14px"
                                }
                            }
                        }}
                        endEnhancer={() => <Overflow size={24}/>}
                    >
                        Pilih Warna Huruf
                    </Button>
                </StatefulPopover>
                <Label2>Pilih letak Watermark</Label2>
                <Select
                    overrides={{
                        Root: {
                            style: {
                                width: '100%',
                                marginTop: "14px",
                                marginBottom: "14px"
                            }
                        }
                    }}
                    options={positionOption}
                    clearable={false}
                    value={position}
                    placeholder="Pilih Posisi"
                    onChange={params => {
                        // @ts-ignore
                        setPosition(params.value)
                        onPositionChanged(params.value);
                    }}
                />

            </Panel>
        </Accordion>
    )
}


export default SettingAccordion;
