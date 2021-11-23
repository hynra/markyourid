import * as React from 'react';
import {useEffect} from 'react';
import {useStyletron} from 'baseui';
import HeaderNav from "../components/header";
import ImageUploader from "../components/image_uploader";
import {Card, StyledAction, StyledBody} from "baseui/card";
import {Button} from "baseui/button";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {BlockProps} from "baseui/block";
import {Input} from "baseui/input";
import {ButtonGroup} from "baseui/button-group";
import CropWindow from "../components/crop_window";
import AdjustWindow from "../components/adjust_window";
import FilterWindow from "../components/filter_window";
import WatermarkWindow from "../components/watermark_window";
import getWatermark from "../components/custom_wm";
import {H6, Label2, Paragraph3} from "baseui/typography";
import {SIZE, Textarea} from "baseui/textarea";
import SettingAccordion, {PositionEnum, positionOption} from "../components/setting_accordion";
import AdvancedAccordion from "../components/advanced_accordion";
import MainCanvas from "../components/main_canvas";
import CanvasResizer from "../components/canvas_resizer";
import ExportWindow from "../components/export_window";


const MainEditor: React.FC<{onImageSavedToLocal: Function}> = ({onImageSavedToLocal}) => {
    const [css, theme] = useStyletron();
    const [errorMessage, setErrorMessage] = React.useState("");
    const [imageSrc, setImageSrc] = React.useState<string>("");
    const [prevImageSrc, setPrevImageSrc] = React.useState("");
    const [imageFile, setImageFile] = React.useState<File>(null);
    const [isCropOpen, setIsCropOpen] = React.useState<boolean>(false);
    const [isAdjustOpen, setIsAdjustOpen] = React.useState<boolean>(false);
    const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);
    const [isWMOpen, setIsWMOpen] = React.useState<boolean>(false);
    const [isExportOpen, setIsExportOpen] = React.useState<boolean>(false);
    const [fontSize, setFontSize] = React.useState(48);
    const [wmColor, setWmColor] = React.useState('#fff')
    const [rectColor, setRectColor] = React.useState('#000');
    const [enableRect, setEnableRect] = React.useState(true);
    const [position, setPosition] = React.useState([positionOption[0]]);
    const [currText, setCurrText] = React.useState(
        `Description: Write description\nDate: ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
    );
    const [opacity, setOpacity] = React.useState(0.5);
    const [horizontalPosition, setHorizontalPosition] = React.useState(undefined);
    const [verticalPosition, setVerticalPosition] = React.useState(undefined);


    useEffect(() => {
        if (imageFile !== null) {
            let reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result as string;
                img.onload = () => {
                    setImageSrc(reader.result as string);
                    setPrevImageSrc(reader.result as string);
                }
            }
        }
    }, [imageFile]);

    const itemProps: BlockProps = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };


    const applyWaterMark = async (tempImage?: any) => {
        setImageSrc(tempImage)
    }


    // @ts-ignore
    return (
        <div>
            <CropWindow
                imageSrc={(prevImageSrc !== '') ? prevImageSrc : imageSrc}
                isOpen={isCropOpen}
                setIsOpen={setIsCropOpen}
                onCropped={(newImage => {
                    if (prevImageSrc !== '') {
                        setPrevImageSrc(newImage);
                        applyWaterMark(newImage).then();
                    } else setImageSrc(newImage)
                })}/>
            <AdjustWindow
                imageSrc={(prevImageSrc !== '') ? prevImageSrc : imageSrc}
                isOpen={isAdjustOpen}
                setIsOpen={setIsAdjustOpen}
                onAdjust={(uri) => {
                    if (prevImageSrc !== '') {
                        setPrevImageSrc(uri);
                        applyWaterMark(uri).then();
                    } else setImageSrc(uri)
                }}/>
            <FilterWindow
                imageSrc={(prevImageSrc !== '') ? prevImageSrc : imageSrc}
                isOpen={isFilterOpen}
                setIsOpen={setIsFilterOpen}
                onFiltered={(uri) => {
                    if (prevImageSrc !== '') {
                        setPrevImageSrc(uri);
                        applyWaterMark(uri).then();
                    } else setImageSrc(uri)
                }}/>
            <WatermarkWindow
                imageSrc={(prevImageSrc !== '') ? prevImageSrc : imageSrc}
                isOpen={isWMOpen}
                setIsOpen={setIsWMOpen}
                onWaterMarked={(img) => {
                    if (prevImageSrc !== '') {
                        setPrevImageSrc(img);
                        applyWaterMark(img).then();
                    } else setImageSrc(img)
                }}
                predefinedText={currText}
            />
            <ExportWindow
                imageSrc={imageSrc}
                isOpen={isExportOpen}
                setIsOpen={setIsExportOpen}
                desc={currText}
                onImageSaved={onImageSavedToLocal}/>
            <FlexGrid
                flexGridColumnCount={1}
                flexGridColumnGap="scale800"
                flexGridRowGap="scale800"
            >
                {/*<FlexGridItem {...itemProps}>
                    <h3>Upload an image</h3>
                </FlexGridItem>*/}
                <FlexGridItem {...itemProps}>
                    {imageSrc !== "" && <Card
                        overrides={{Root: {style: { marginTop: "40px"}}}}
                        title="Add Watermark"
                    >
                        {/*<img src={imageSrc} width="100%"/>*/}
                        {
                            imageSrc !== "" && <MainCanvas
                                imageSrc={imageSrc}
                                textProps={
                                    {
                                        fontSize: fontSize,
                                        color: wmColor,
                                        // @ts-ignore
                                        position: position.id,
                                        text: currText,
                                        opacity: opacity,
                                        horizontal: horizontalPosition,
                                        vertical: verticalPosition,
                                        rectColor: rectColor,
                                        rectEnable: enableRect
                                    }
                                } onImageResized={(uri) => {
                                setImageSrc(uri);
                                setPrevImageSrc(uri);
                            }}/>
                        }

                        <StyledBody>

                            <Label2 marginBottom="14px"> Edit Text</Label2>
                            <Textarea
                                value={currText}
                                size={SIZE.compact}
                                // @ts-ignore
                                onChange={e => setCurrText(e.target.value)}
                                placeholder="Controlled Input"
                                clearOnEscape
                            />
                            <SettingAccordion
                                onFontSizeChanged={setFontSize}
                                onWmColoChanged={setWmColor}
                                onPositionChanged={setPosition}
                                onOpacityChanged={setOpacity}
                                imageSrc={imageSrc}
                                onHorizontalPosChanged={setHorizontalPosition}
                                onVerticalPosChanged={setVerticalPosition}
                                onEnableRectChanged={setEnableRect}
                                onRectColorChanged={setRectColor}
                            />
                            <AdvancedAccordion
                                onOpenCropWindow={setIsCropOpen}
                                onOpenAdjustWindow={setIsAdjustOpen}
                                onOpenFilterOption={setIsFilterOpen}
                                onOpenWmWindow={setIsWMOpen}
                            />
                        </StyledBody>
                        <StyledAction>
                            <Button
                                overrides={{BaseButton: {style: {width: '100%'}}}}
                                onClick={() => {
                                    setIsExportOpen(true)
                                }}>
                                Export
                            </Button>
                        </StyledAction>
                    </Card>}
                </FlexGridItem>
                <FlexGridItem {...itemProps}>
                    {imageFile === null && <ImageUploader
                        errorMessage={errorMessage}
                        onDrop={(file: File) => {
                            setImageFile(file);
                        }}/>}
                </FlexGridItem>
            </FlexGrid>

        </div>
    );
};

export default MainEditor;
