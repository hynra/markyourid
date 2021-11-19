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
import {Accordion, Panel} from "baseui/accordion";
import {Slider} from "baseui/slider";
import {H6, Label2, Paragraph3} from "baseui/typography";
import {SketchPicker, CompactPicker, ChromePicker, TwitterPicker} from 'react-color'
import {StatefulPopover} from "baseui/popover";
import {Overflow, Upload} from "baseui/icon";
import {Select} from "baseui/select";
import {SIZE, Textarea} from "baseui/textarea";

const colorSwatches = ['#4D4D4D',
    '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00',
    '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333',
    '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', '#B0BC00',
    '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000',
    '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00', '#808900',
    '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E']

enum PositionEnum {
    KananBawah,
    KananAtas,
    KiriBawah,
    KiriAtas,
    Tengah
}

const positionOption = [
    {label: "Kanan Bawah", id: PositionEnum.KananBawah},
    {label: "Kanan Atas", id: PositionEnum.KananAtas},
    {label: "Kiri Bawah", id: PositionEnum.KiriBawah},
    {label: "Kiri Atas", id: PositionEnum.KiriAtas},
    {label: "Tengah", id: PositionEnum.Tengah},
]


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
    const [currText, setCurrText] =  React.useState(`${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`);
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
                }}/>
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
                        <img src={imageSrc} width="100%"/>
                        <StyledBody>

                            <ButtonGroup
                                overrides={{Root: {style: {alignItems: 'center', justifyContent: 'center',}}}}
                            >
                                <Button onClick={() => setIsCropOpen(true)}>Crop</Button>
                                <Button onClick={() => setIsAdjustOpen(true)}>Adjust</Button>
                                <Button onClick={() => setIsFilterOpen(true)}>Filter</Button>
                            </ButtonGroup>

                            <Label2 marginBottom="14px"> Edit Text</Label2>
                            <Textarea
                                value={currText}
                                size={SIZE.compact}
                                // @ts-ignore
                                onChange={e => setCurrText(e.target.value)}
                                placeholder="Controlled Input"
                                clearOnEscape
                            />
                            <Accordion>
                                <Panel title="Sesuaikan">
                                    <Label2>Atur Ukuran Huruf</Label2>
                                    <Slider
                                        value={[fontSize]}
                                        onChange={({value}) => value && setFontSize(value[0])}
                                        onFinalChange={({value}) => setFontSize(value[0])}
                                        min={24}
                                        max={250}
                                    />
                                    <Label2>Atur Opacity</Label2>
                                    <Slider
                                        value={[opacity*100]}
                                        onChange={({value}) => value && setOpacity(value[0]/100)}
                                        onFinalChange={({value}) => setOpacity(value[0]/100)}
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
                                                    setWmColor(color.hex)
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
                                        }}
                                    />

                                </Panel>
                            </Accordion>
                        </StyledBody>
                        <StyledAction>
                            <Button
                                overrides={{BaseButton: {style: {width: '100%'}}}}
                                onClick={() => {
                                    // setIsWMOpen(true)
                                    applyWaterMark().then()
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
