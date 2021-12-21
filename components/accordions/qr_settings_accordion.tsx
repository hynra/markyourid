import React from "react";
import {Accordion, Panel} from "baseui/accordion";
import {Checkbox, LABEL_PLACEMENT, STYLE_TYPE} from "baseui/checkbox";
import {Label2} from "baseui/typography";
import {Slider} from "baseui/slider";
import {StyledBody} from "baseui/card";


export interface QrSettingAccordionProps {
    useRaribleUrl: boolean,
    setUseRaribleUrl: (useRarible: boolean) => void,
    horizontalQrPosition: number,
    setHorizontalQrPosition: (pos: number) => void,
    maxHorizontalPos: number,
    verticalQrPosition: number,
    setVerticalQrPosition: (pos: number) => void,
    maxVerticalPos: number,
    qrSize: number,
    setQrSize: (size: number) => void,
    qrOpacity: number,
    setQrOpacity: (opacity: number) => void,
    onUrlTypeChanged: (isRarible: boolean) => void
}


const QrSettingsAccordion: React.FC<QrSettingAccordionProps> = (props: QrSettingAccordionProps) => {
    return(
        <Accordion>
            <Panel title="Customize QR Code">
                <Checkbox
                    checked={props.useRaribleUrl}
                    checkmarkType={STYLE_TYPE.toggle_round}

                    onChange={e => {
                        // @ts-ignore
                        const isRarible = e.target.checked;
                        props.setUseRaribleUrl(isRarible);
                        props.onUrlTypeChanged(isRarible);
                    }}
                    labelPlacement={LABEL_PLACEMENT.right}
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
                    Use Rarible URL
                </Checkbox>
                <Label2>Horizontal Position</Label2>
                <Slider
                    value={[props.horizontalQrPosition]}
                    onChange={({value}) => value && props.setHorizontalQrPosition(value[0])}
                    onFinalChange={({value}) => {
                        props.setHorizontalQrPosition(value[0])
                    }}

                    min={0}
                    max={props.maxHorizontalPos}
                />
                <Label2>Vertical Position</Label2>
                <Slider
                    value={[props.verticalQrPosition]}
                    onChange={({value}) => value && props.setVerticalQrPosition(value[0])}
                    onFinalChange={({value}) => {
                        props.setVerticalQrPosition(value[0])
                    }}

                    min={0}
                    max={props.maxVerticalPos}
                />
                <Label2>QR Code size</Label2>
                <Slider
                    value={[props.qrSize * 10]}
                    onChange={({value}) => value && props.setQrSize(value[0] / 10)}
                    onFinalChange={({value}) => {
                        props.setQrSize(value[0] / 10)
                    }}

                    min={0}
                    max={20}
                />
                <Label2>QR Code Opacity</Label2>
                <Slider
                    value={[props.qrOpacity * 100]}
                    onChange={({value}) => value && props.setQrOpacity(value[0] / 100)}
                    onFinalChange={({value}) => {
                        props.setQrOpacity(value[0] / 100)
                    }}

                    min={0}
                    max={100}
                />
            </Panel>
        </Accordion>
    );
}

export default QrSettingsAccordion;
