import React from "react";
import {useStyletron} from "baseui";
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader} from "baseui/modal";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {Button, KIND, SHAPE} from "baseui/button";
import {addFilters, FilterMode, saveImageAsUrl} from "../common/filters";
import {BlockProps} from "baseui/block";

const FilterWindow: React.FC<{
    imageSrc: string, isOpen: boolean, setIsOpen: Function, onFiltered: Function
}> = ({
          imageSrc,
          isOpen,
          setIsOpen,
          onFiltered
      }) => {

    const [css, theme] = useStyletron();
    const [selectedFilter, setSelectedFilter] = React.useState<FilterMode>(null);

    let img: any = null;
    let canvas;

    const checkSelectedFilter = (filter: FilterMode) => {
        return filter === selectedFilter
    }

    const saveImage = () => {
        const canvas = document.getElementById("canvas");
        const uri = saveImageAsUrl(canvas);
        onFiltered(uri);
        setSelectedFilter(null);
    }

    const applyFilter = (filterToApply: FilterMode) => {
        if (filterToApply === selectedFilter)
            return;
        if (canvas) {
            // @ts-ignore
            window.Caman("#canvas", img, function () {
                this.revert();
                //initCanvas();
            })
        }
        addFilters(filterToApply, img);
        setSelectedFilter(filterToApply)
    }

    const itemProps: BlockProps = {
        height: 'scale1000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const initCanvas = () => {
        let context = canvas.getContext("2d");

        img = new Image();

        img.src = imageSrc;

        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
    }

    const refHandler = (_canvas) => {
        if (!_canvas) return;
        canvas = _canvas;

        initCanvas();
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
                        id="canvas"
                    />
                </div>
                <div>
                    <FlexGrid
                        flexGridColumnCount={[2, 3, 4]}
                        flexGridColumnGap="scale1000"
                        flexGridRowGap="scale800"
                        marginBottom="scale800"
                    >
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.Vintage)}
                                                             isSelected={checkSelectedFilter(FilterMode.Vintage)}
                                                             kind={KIND.secondary}>Vintage</Button></FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.Lomo)}
                                                             isSelected={checkSelectedFilter(FilterMode.Lomo)}
                                                             kind={KIND.secondary}>Lomo</Button></FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.Clarity)}
                                                             isSelected={checkSelectedFilter(FilterMode.Clarity)}
                                                             kind={KIND.secondary}>Clarity</Button></FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.SinCity)}
                                                             isSelected={checkSelectedFilter(FilterMode.SinCity)}
                                                             kind={KIND.secondary}>SinCity</Button></FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.Nostalgia)}
                                                             isSelected={checkSelectedFilter(FilterMode.Nostalgia)}
                                                             kind={KIND.secondary}>Nostalgia</Button></FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.Sunrise)}
                                                             isSelected={checkSelectedFilter(FilterMode.Sunrise)}
                                                             kind={KIND.secondary}>Sunrise</Button></FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.CrossProcess)}
                                                             isSelected={checkSelectedFilter(FilterMode.CrossProcess)}
                                                             kind={KIND.secondary}>Cross</Button></FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.OrangePeel)}
                                                             isSelected={checkSelectedFilter(FilterMode.OrangePeel)}
                                                             kind={KIND.secondary}>O-Peel</Button></FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.Concentrate)}
                                                             isSelected={checkSelectedFilter(FilterMode.Concentrate)}
                                                             kind={KIND.secondary}>Concentrate</Button></FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.Love)}
                                                             isSelected={checkSelectedFilter(FilterMode.Love)}
                                                             kind={KIND.secondary}>Love</Button></FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.Grungy)}
                                                             isSelected={checkSelectedFilter(FilterMode.Grungy)}
                                                             kind={KIND.secondary}>Grungy</Button></FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.Jarques)}
                                                             isSelected={checkSelectedFilter(FilterMode.Jarques)}
                                                             kind={KIND.secondary}>Jarques</Button></FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.Pinhole)}
                                                             isSelected={checkSelectedFilter(FilterMode.Pinhole)}
                                                             kind={KIND.secondary}>Pinhole</Button></FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.OldBoot)}
                                                             isSelected={checkSelectedFilter(FilterMode.OldBoot)}
                                                             kind={KIND.secondary}>OldBoot</Button></FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.GlowingSun)}
                                                             isSelected={checkSelectedFilter(FilterMode.GlowingSun)}
                                                             kind={KIND.secondary}>Glowing</Button></FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.HazyDays)}
                                                             isSelected={checkSelectedFilter(FilterMode.HazyDays)}
                                                             kind={KIND.secondary}>Hazy</Button></FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.HerMajesty)}
                                                             isSelected={checkSelectedFilter(FilterMode.HerMajesty)}
                                                             kind={KIND.secondary}>Majesty</Button></FlexGridItem>
                        <FlexGridItem {...itemProps}><Button onClick={() => applyFilter(FilterMode.Hemingway)}
                                                             isSelected={checkSelectedFilter(FilterMode.Hemingway)}
                                                             kind={KIND.secondary}>Hemingway</Button></FlexGridItem>
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

export default FilterWindow;
