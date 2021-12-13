import * as React from 'react';
import {useEffect} from 'react';
import {useStyletron} from 'baseui';
import HeaderNav from "../components/header";
import ImageUploader from "../components/image_uploader";
import {Card, StyledAction, StyledBody} from "baseui/card";
import {Button} from "baseui/button";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import {BlockProps} from "baseui/block";
import CropWindow from "../components/crop_window";
import AdjustWindow from "../components/adjust_window";
import FilterWindow from "../components/filter_window";
import WatermarkWindow from "../components/watermark_window";
import {H6, Label2, Paragraph2, Paragraph3} from "baseui/typography";
import {SIZE, Textarea} from "baseui/textarea";
import SettingAccordion, {PositionEnum, positionOption} from "../components/setting_accordion";
import AdvancedAccordion from "../components/advanced_accordion";
import MainCanvas from "../components/main_canvas";
import ExportWindow from "../components/export_window";
import {Item} from "@rarible/api-client";
import {
    Checkbox,
    STYLE_TYPE,
    LABEL_PLACEMENT
} from "baseui/checkbox";
import StampCanvas from "./stamp_canvas";
import QRCode from 'qrcode'
import {Accordion, Panel} from "baseui/accordion";
import {Slider} from "baseui/slider";
import {generateShortLink} from "../common/helper";
import {Delete} from "baseui/icon";
import {DURATION, useSnackbar} from "baseui/snackbar";


const StampEditor: React.FC<{ onImageSavedToLocal: Function, item: Item }> = (
    {
        onImageSavedToLocal,
        item
    }
) => {
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
    const [currText, setCurrText] = React.useState(item.meta.description);
    const [nftUrl, setNftUrl] = React.useState(`https://markyour.id/item/${item.id}`);
    const [opacity, setOpacity] = React.useState(0.5);
    const [horizontalPosition, setHorizontalPosition] = React.useState(undefined);
    const [verticalPosition, setVerticalPosition] = React.useState(undefined);
    const [showDesc, setShowDesc] = React.useState<boolean>(false);
    const [qrCodeImage, setQrCodeImage] = React.useState<string>(null);
    const [showQr, setShowQr] = React.useState<boolean>(true);

    const [horizontalQrPosition, setHorizontalQrPosition] = React.useState<number>(0);
    const [verticalQrPosition, setVerticalQrPosition] = React.useState<number>(0);

    const [horizontalQrPlaceHolderPosition, setHorizontalQrPlaceHolderPosition] = React.useState<number>(0);
    const [verticalQrPlaceHolderPosition, setVerticalQrPlaceHolderPosition] = React.useState<number>(0);

    const [maxVerticalPos, setMaxVerticalPos] = React.useState<number>(0);
    const [maxHorizontalPos, setMaxHorizontalPos] = React.useState<number>(0);

    const [useRaribleUrl, setUseRaribleUrl] = React.useState<boolean>(false);
    const [useShortLink, setUseShortLink] = React.useState<boolean>(false);

    const [shortLinkMyid, setShortLinkMyid] = React.useState<string>(null)
    const [shortLinkRarible, setShortLinkRarible] = React.useState<string>(null);

    const {enqueue, dequeue} = useSnackbar();




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
                    setMaxHorizontalPos(img.width);
                    setMaxVerticalPos(img.height);


                    setHorizontalQrPosition(0);
                    setHorizontalQrPlaceHolderPosition(0)
                    setVerticalQrPosition(img.height);
                    setVerticalQrPlaceHolderPosition(img.height);
                }
            }
        }

        if (nftUrl) {
            QRCode.toDataURL(nftUrl)
                .then(url => {
                    setQrCodeImage(url);
                })
                .catch(err => {
                    console.error(err)
                })
        }

    }, [imageFile, nftUrl]);

    const itemProps: BlockProps = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };


    const chooseUrlMode = (isRarible: boolean) => {
        if(isRarible){
            setNftUrl(`https://rarible.com/token/${item.id.replace("ETHEREUM:", "")}`);
        } else {
            setNftUrl(`https://markyour.id/${item.id}`)
        }
        if(useShortLink){
            setUseShortLink(false);
        }
    }

    const errorWhileGetShort = () => {
        enqueue({
            message: 'Oops! Something went wrong, try again later.',
            startEnhancer: ({size}) => <Delete size={size}/>,
        });
        setUseShortLink(false);
    }

    const enQueueLoadingSnackBar = (message: string) => {
        enqueue(
            {
                message: message,
                progress: true,
            },
            DURATION.infinite,
        );
    }

    const dequeueLoadingSnackBar = () => {
        dequeue();
    }

    const decideShortLinkMode = (useShortLink: boolean) => {
        if(!useShortLink){
            chooseUrlMode(useRaribleUrl);
        } else {
            if(nftUrl.startsWith("https://markyour.id/")){
                if(shortLinkMyid === null){
                    enQueueLoadingSnackBar("generating short url")
                    generateShortLink(nftUrl).then((data) => {
                        setShortLinkMyid(data.url.shortLink);
                        setNftUrl(data.url.shortLink);
                        dequeueLoadingSnackBar()
                    }).catch((err) => {
                        console.log(err);
                        dequeueLoadingSnackBar();
                        errorWhileGetShort();

                    })
                } else setNftUrl(shortLinkMyid);
            } else {
                if(shortLinkRarible === null){
                    enQueueLoadingSnackBar("generating short url")
                    generateShortLink(nftUrl).then((data) => {
                        setShortLinkRarible(data.url.shortLink);
                        setNftUrl(data.url.shortLink);
                        dequeueLoadingSnackBar()
                    }).catch((err) => {
                        console.log(err)
                        dequeueLoadingSnackBar();
                        errorWhileGetShort();
                    })
                } else setNftUrl(shortLinkRarible);
            }

        }
    }

    const applyWaterMark = async (tempImage?: any) => {
        setImageSrc(tempImage);
        definedQrPosProperties(tempImage);
    }


    const definedQrPosProperties = (image: any) => {
        const img = new Image();
        img.src = image;
        img.onload = () => {
            setHorizontalQrPosition(0);
            setHorizontalQrPlaceHolderPosition(0)
            setVerticalQrPosition(img.height);
            setVerticalQrPlaceHolderPosition(img.height);
        }
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
                <FlexGridItem {...itemProps}>
                    {imageSrc !== "" && <Card
                        overrides={{Root: {style: {marginTop: "40px"}}}}
                        title="Stamp to image"
                    >
                        {
                            imageSrc !== "" && <StampCanvas
                                imageSrc={imageSrc}
                                textProps={
                                    {
                                        fontSize: fontSize,
                                        color: wmColor,
                                        nftUrl: nftUrl,
                                        showQr: showQr,
                                        qrcodeImage: qrCodeImage,
                                        qrHorizontal: horizontalQrPosition,
                                        qrVertical: verticalQrPosition,
                                        // @ts-ignore
                                        position: position.id,
                                        text: currText,
                                        opacity: opacity,
                                        horizontal: horizontalPosition,
                                        vertical: verticalPosition,
                                        rectColor: rectColor,
                                        rectEnable: enableRect,
                                        showText: showDesc
                                    }
                                } onImageResized={(uri) => {
                                setImageSrc(uri);
                                setPrevImageSrc(uri);
                            }}/>
                        }

                        <StyledBody>

                            <Checkbox
                                checked={showDesc}
                                checkmarkType={STYLE_TYPE.toggle_round}
                                // @ts-ignore
                                onChange={e => setShowDesc(e.target.checked)}
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
                                Stamp Description Text
                            </Checkbox>

                            <Label2>Description Text</Label2>
                            <Paragraph2 marginBottom="14px">Make sure the text is as close to the original source as
                                possible.</Paragraph2>
                            <Textarea
                                disabled={!showDesc}
                                value={currText}
                                size={SIZE.compact}
                                // @ts-ignore
                                onChange={e => setCurrText(e.target.value)}
                                placeholder="Description Text"
                                clearOnEscape
                            />
                            {showDesc && <SettingAccordion
                                onFontSizeChanged={setFontSize}
                                onWmColoChanged={setWmColor}
                                onPositionChanged={setPosition}
                                onOpacityChanged={setOpacity}
                                imageSrc={imageSrc}
                                onHorizontalPosChanged={setHorizontalPosition}
                                onVerticalPosChanged={setVerticalPosition}
                                onEnableRectChanged={setEnableRect}
                                onRectColorChanged={setRectColor}
                                title="Customize Description Text"
                            />}
                            <Checkbox
                                checked={showQr}
                                checkmarkType={STYLE_TYPE.toggle_round}
                                // @ts-ignore
                                onChange={e => setShowQr(e.target.checked)}
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
                                Stamp QR Code
                            </Checkbox>
                            <Label2 marginBottom="14px" marginTop="14px">Link to your NFT</Label2>
                            <Textarea
                                value={nftUrl}
                                disabled
                                size={SIZE.compact}
                                // @ts-ignore
                                onChange={e => setNftUrl(e.target.value)}
                                placeholder="NFT URL"
                                clearOnEscape
                            />

                            <Accordion>
                                <Panel title="Customize QR Code">
                                    <Checkbox
                                        checked={useRaribleUrl}
                                        checkmarkType={STYLE_TYPE.toggle_round}

                                        onChange={e => {
                                            // @ts-ignore
                                            const isRarible = e.target.checked;
                                            setUseRaribleUrl(isRarible);
                                            chooseUrlMode(isRarible);
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
                                    <Checkbox
                                        checked={useShortLink}
                                        checkmarkType={STYLE_TYPE.toggle_round}

                                        onChange={e => {
                                            // @ts-ignore
                                            const isShortLink = e.target.checked;
                                            setUseShortLink(isShortLink);
                                            decideShortLinkMode(isShortLink);
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
                                        Use shorted link
                                    </Checkbox>
                                    <Label2>Horizontal Position</Label2>
                                    <Slider
                                        value={[horizontalQrPlaceHolderPosition]}
                                        onChange={({value}) => value && setHorizontalQrPlaceHolderPosition(value[0])}
                                        onFinalChange={({value}) => {
                                            setHorizontalQrPosition(value[0])
                                            // onHorizontalPosChanged(value[0])
                                        }}
                                        step={maxHorizontalPos/50}
                                        marks
                                        min={0}
                                        max={maxHorizontalPos}
                                    />
                                    <Label2>Vertical Position</Label2>
                                    <Slider
                                        value={[verticalQrPlaceHolderPosition]}
                                        onChange={({value}) => value && setVerticalQrPlaceHolderPosition(value[0])}
                                        onFinalChange={({value}) => {
                                            setVerticalQrPosition(value[0])
                                            // onHorizontalPosChanged(value[0])
                                        }}
                                        step={maxVerticalPos/50}
                                        marks
                                        min={0}
                                        max={maxVerticalPos}
                                    />
                                </Panel>
                            </Accordion>

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

export default StampEditor;
