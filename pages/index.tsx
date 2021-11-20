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


const Index: React.FC = () => {
    const [css, theme] = useStyletron();
    const [errorMessage, setErrorMessage] = React.useState("");
    const [imageSrc, setImageSrc] = React.useState<string>("");
    const [prevImageSrc, setPrevImageSrc] = React.useState("");
    const [imageFile, setImageFile] = React.useState<File>(null);
    const [isCropOpen, setIsCropOpen] = React.useState<boolean>(false);
    const [isAdjustOpen, setIsAdjustOpen] = React.useState<boolean>(false);
    const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);
    const [isWMOpen, setIsWMOpen] = React.useState<boolean>(false);
    const [watermark, setWatermark] = React.useState<any>();
    const [fontSize, setFontSize] = React.useState(48);
    const [wmColor, setWmColor] = React.useState('#fff');
    const [position, setPosition] = React.useState([positionOption[0]]);
    const [currText, setCurrText] = React.useState(`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`);
    const [opacity, setOpacity] = React.useState(0.5);

    useEffect(() => {
        if (imageFile !== null) {
            setWatermark(getWatermark);
            let reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onload = () => {
                setImageSrc(reader.result as string);
                setPrevImageSrc("")
            }
        }
    }, [imageFile]);

    const itemProps: BlockProps = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };


    const applyWaterMark = async (tempImage?: any) => {
        let imgToApply = (prevImageSrc === '') ? imageSrc : prevImageSrc;
        if (tempImage) imgToApply = tempImage;
        let wmOption;
        switch (position[0].id) {
            case PositionEnum.KananBawah:
                wmOption = watermark.text.lowerRight(currText, `${fontSize}px Josefin Slab`, wmColor, opacity);
                break
            case PositionEnum.KananAtas:
                const ur = watermark.text.upperRight;
                wmOption = ur(currText, `${fontSize}px Josefin Slab`, wmColor, opacity, fontSize);
                break;
            case PositionEnum.KiriAtas:
                wmOption = watermark.text.upperLeft(currText, `${fontSize}px Josefin Slab`, wmColor, opacity)
                break;
            case PositionEnum.KiriBawah:
                wmOption = watermark.text.lowerLeft(currText, `${fontSize}px Josefin Slab`, wmColor, opacity)
                break;
            case PositionEnum.Tengah:
                wmOption = watermark.text.center(currText, `${fontSize}px Josefin Slab`, wmColor, opacity)
                break;
        }
        const _img = await watermark([imgToApply])
            .image(wmOption);
        if (prevImageSrc === '')
            setPrevImageSrc(imageSrc);
        setImageSrc(_img.src);
    }


    // @ts-ignore
    return (
        <div>
            <HeaderNav/>
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
            <FlexGrid
                flexGridColumnCount={1}
                flexGridColumnGap="scale800"
                flexGridRowGap="scale800"
            >
                <FlexGridItem {...itemProps}>
                    <h3>Upload an image</h3>
                </FlexGridItem>
                <FlexGridItem {...itemProps}>
                    {imageSrc !== "" && <Card
                        overrides={{Root: {style: {width: '580px', marginTop: "40px"}}}}
                        title="Example card"
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
                                        opacity: opacity
                                    }
                                }/>
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
                                    // setIsWMOpen(true)
                                    // applyWaterMark().then()
                                }}>
                                Generate
                            </Button>
                        </StyledAction>
                    </Card>}
                </FlexGridItem>
                <FlexGridItem {...itemProps}>
                    <ImageUploader
                        errorMessage={errorMessage}
                        onDrop={(file: File) => {
                            setImageFile(file);
                        }}/>
                </FlexGridItem>
            </FlexGrid>
        </div>
    );
};

export default Index;
