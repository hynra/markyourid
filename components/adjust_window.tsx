import React from "react";
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader} from "baseui/modal";
import {useStyletron} from "baseui";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {BlockProps} from "baseui/block";
import {Button, SHAPE} from "baseui/button";
import Plus from 'baseui/icon/plus'
import CheckIndeterminate from 'baseui/icon/check-indeterminate'
import {addFilters, FilterMode, saveImageAsUrl} from "../common/filters";

const AdjustWindow: React.FC<{
    imageSrc: string, isOpen: boolean, setIsOpen: Function, onAdjust: Function
}> = ({
          imageSrc,
          isOpen,
          setIsOpen,
          onAdjust
      }) => {

    const [css, theme] = useStyletron();
    const [currImage, setCurrImage] = React.useState<any>(null);



    let img: any = null;

    const itemProps: BlockProps = {
        height: 'scale1000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };


    const applyFilter = (selectedFilter: FilterMode) => {
        addFilters(selectedFilter, img).then();
    }

    const saveImage = () => {
        const canvas = document.getElementById("canvasAdjust");
        const uri = saveImageAsUrl(canvas);
        onAdjust(uri);

    }

    const refHandler = (canvas) => {
        if (!canvas) return;

        let context = canvas.getContext("2d");

        img = new Image();

        img.src = imageSrc;
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
            if (currImage === null)
                setCurrImage(img);
        }
    }

    if (typeof window !== "undefined") {

    }

    return (
        <Modal onClose={() => setIsOpen(false)} isOpen={isOpen} size='default'>
            <ModalHeader>Filters</ModalHeader>
            <ModalBody>
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
                        id="canvasAdjust"
                    />
                </div>
                <div>
                    <FlexGrid
                        flexGridColumnCount={3}
                        flexGridColumnGap="scale800"
                        flexGridRowGap="scale800"
                        marginBottom="scale800"
                    >
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.BrightnessRemove)}
                                                             shape={SHAPE.circle}><CheckIndeterminate/></Button></FlexGridItem>
                        <FlexGridItem {...itemProps} backgroundColor="mono300">Brightness</FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.BrightnessAdd)}
                                                             shape={SHAPE.circle}><Plus/></Button></FlexGridItem>
                    </FlexGrid>
                    <FlexGrid
                        flexGridColumnCount={3}
                        flexGridColumnGap="scale800"
                        flexGridRowGap="scale800"
                        marginBottom="scale800"
                    >
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.ContrastRemove)}
                                                             shape={SHAPE.circle}><CheckIndeterminate/></Button></FlexGridItem>
                        <FlexGridItem {...itemProps} backgroundColor="mono300">Contrast</FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.ContrastAdd)}
                                                             shape={SHAPE.circle}><Plus/></Button></FlexGridItem>
                    </FlexGrid>
                    <FlexGrid
                        flexGridColumnCount={3}
                        flexGridColumnGap="scale800"
                        flexGridRowGap="scale800"
                        marginBottom="scale800"
                    >
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.SaturationRemove)}
                                                             shape={SHAPE.circle}><CheckIndeterminate/></Button></FlexGridItem>
                        <FlexGridItem {...itemProps} backgroundColor="mono300">Saturation</FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.SaturationAdd)}
                                                             shape={SHAPE.circle}><Plus/></Button></FlexGridItem>
                    </FlexGrid>
                    <FlexGrid
                        flexGridColumnCount={3}
                        flexGridColumnGap="scale800"
                        flexGridRowGap="scale800"
                        marginBottom="scale800"
                    >
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.VibranceRemove)}
                                                             shape={SHAPE.circle}><CheckIndeterminate/></Button></FlexGridItem>
                        <FlexGridItem {...itemProps} backgroundColor="mono300">Vibrance</FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.VibranceAdd)}
                                                             shape={SHAPE.circle}><Plus/></Button></FlexGridItem>
                    </FlexGrid>
                    <FlexGrid
                        flexGridColumnCount={3}
                        flexGridColumnGap="scale800"
                        flexGridRowGap="scale800"
                        marginBottom="scale800"
                    >
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.HueRemove)}
                                                             shape={SHAPE.circle}><CheckIndeterminate/></Button></FlexGridItem>
                        <FlexGridItem {...itemProps} backgroundColor="mono300">Hue</FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.HueAdd)}
                                                             shape={SHAPE.circle}><Plus/></Button></FlexGridItem>
                    </FlexGrid>
                    <FlexGrid
                        flexGridColumnCount={3}
                        flexGridColumnGap="scale800"
                        flexGridRowGap="scale800"
                        marginBottom="scale800"
                    >
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.GammaRemove)}
                                                             shape={SHAPE.circle}><CheckIndeterminate/></Button></FlexGridItem>
                        <FlexGridItem {...itemProps} backgroundColor="mono300">Gamma</FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.GammaAdd)}
                                                             shape={SHAPE.circle}><Plus/></Button></FlexGridItem>
                    </FlexGrid>
                </div>
            </ModalBody>
            <ModalFooter>
                <ModalButton kind="tertiary" onClick={() => setIsOpen(false)}>
                    Cancel
                </ModalButton>
                <ModalButton onClick={() => {
                    saveImage();
                    setIsOpen(false);
                }}>Okay</ModalButton>
            </ModalFooter>
        </Modal>
    )
}

export default AdjustWindow;
