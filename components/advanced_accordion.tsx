import React from "react";
import {Accordion, Panel} from "baseui/accordion";
import {Label2} from "baseui/typography";
import {Button, KIND} from "baseui/button";
import {ButtonGroup} from "baseui/button-group";
import {ChevronRight, Overflow, Upload} from "baseui/icon";

const AdvancedAccordion: React.FC<{onOpenCropWindow: Function, onOpenAdjustWindow: Function, onOpenFilterOption: Function, onOpenWmWindow}> =  (
    {onOpenAdjustWindow, onOpenCropWindow, onOpenFilterOption, onOpenWmWindow}
) => {
    return(
        <Accordion>
            <Panel title="Advanced">
                <ButtonGroup
                    overrides={{Root: {style: {alignItems: 'center', justifyContent: 'center', marginBottom: "14px"}}}}
                >
                    <Button startEnhancer={() => <ChevronRight  size={24} /> } kind={KIND.primary} onClick={() => onOpenCropWindow(true)}>Crop</Button>
                    <Button startEnhancer={() => <ChevronRight  size={24} /> } kind={KIND.primary} onClick={() => onOpenAdjustWindow(true)}>Adjust</Button>
                    <Button startEnhancer={() => <ChevronRight  size={24} /> } kind={KIND.primary} onClick={() => onOpenFilterOption(true)}>Filter</Button>
                </ButtonGroup>

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
                    kind={KIND.secondary}
                    startEnhancer={() => <ChevronRight  size={24} /> }
                    onClick={() => onOpenWmWindow(true)}
                >Manual</Button>

            </Panel>
        </Accordion>
    )
}

export default AdvancedAccordion;
