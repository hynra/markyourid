import React from "react";
import {useStyletron} from "baseui";
import {Label1, Label2, Paragraph2, Paragraph3, Paragraph4} from "baseui/typography";
import {SIZE, Textarea} from "baseui/textarea";
import {Card, StyledBody} from "baseui/card";
import {Input} from "baseui/input";
import {Button, KIND} from "baseui/button";
import AvatarPopUp from "../modals/avatar_popup";
import {Accordion, Panel} from "baseui/accordion";
import {ButtonGroup} from "baseui/button-group";
import InitialPopUp from "../modals/initials_popup";
import CropWindow from "../modals/crop_window";
import {Checkbox, LABEL_PLACEMENT, STYLE_TYPE} from "baseui/checkbox";
import {ModalBody} from "baseui/modal";
import WmModel from "../../common/wm_model";
import {Alert, ArrowUp, ChevronRight, Delete, Show, Upload} from "baseui/icon";
import CommonImagePopUp from "../modals/common_image_popup";
import {downloadCanvasToImage, saveImageAsUrl} from "../../common/filters";
import CommonPopUp from "../modals/common_popup";
import {AvatarMethod, BlockChainType} from "../../common/common_enum";
import ComponentPopUp from "../modals/component_popup";
import {ethBackground} from "../../common/card_background";
import AdjustWindow from "../modals/adjust_window";
import {NftMetadata, Trait} from "../../common/nft_metadata";
import {FlexGrid, FlexGridItem} from "baseui/flex-grid";
import MainLayout from "../main_layout";
import {
    Table,
    SIZE as TableSize,
    DIVIDER
} from "baseui/table-semantic";
import {useSnackbar} from "baseui/snackbar";
import {TRIGGER_TYPE} from "baseui/tooltip";
import {Block} from "baseui/block";
import {Popover, StatefulPopover} from "baseui/popover";


interface CurrentAvatar {
    url: string,
    Method: AvatarMethod,
}

const buttonGroupOverrides = {
    Root: {
        style: {
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: "1px"
        }
    }
}


const ToNftCanvas: React.FC<{ accountAddress: string, onPublish: Function, blockChainType?: BlockChainType }> = (
    {
        accountAddress,
        onPublish,
        blockChainType = BlockChainType.Ethereum
    }
) => {


    const DEFAULT_ATTRIBUTES = [
        {
            trait_type: "powered by",
            value: "https://markyour.id"
        },
        {
            trait_type: "curator",
            value: accountAddress
        },
        {
            trait_type: "created at",
            value: new Date().toUTCString()
        },
    ]

    const [css, theme] = useStyletron();
    const [canvas, setCanvas] = React.useState();
    const [selfImage, setSelfImage] = React.useState<any>(null);
    const [avatarPopUpOpened, setAvatarPopUpOpened] = React.useState<boolean>(false);
    const [initialsPopUpOpened, setInitialsPopUpOpened] = React.useState<boolean>(false);
    const [uploadPopUpOpened, setUploadPopUpOpened] = React.useState<boolean>(false);
    const [selectedAvatar, setSelectedAvatar] = React.useState<CurrentAvatar>(null);
    const [currentText, setCurrentText] = React.useState(
        `Name: Your Name\nDesc: Write a description\nDate: ${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
    );
    const [mainBackground, setMainBackground] = React.useState('/card/eth/0.png');
    const [commonWindowOpened, setCommonWindowOpened] = React.useState(false);
    const DEFAULT_TITLE: string = `Identity Card submission for <service-name>`;
    const [title, setTitle] = React.useState(DEFAULT_TITLE);
    const [selectBackgroundOpened, setSelectBackgroundOpened] = React.useState<boolean>(false);
    const [adjustWindowOpened, setAdjustWindowOpened] = React.useState<boolean>(false);
    const [attrWindowOpened, setAttrWindowOpened] = React.useState<boolean>(false);
    const [attributes, setAttributes] = React.useState<Trait[]>(DEFAULT_ATTRIBUTES);
    const [newTraitType, setNewTraitType] = React.useState<string>("");
    const [newTraitValue, setNewTraitValue] = React.useState<string>("");
    const {enqueue} = useSnackbar();
    const [isLazyMint, setIsLazyMint] = React.useState<boolean>(true);

    const refHandler = (currCanvas) => {
        if (!currCanvas) return;
        if (!canvas) setCanvas(currCanvas);
    }

    function toMultiLine(text) {
        let textArr: any[];
        text = text.replace(/\n\r?/g, '<br/>');
        textArr = text.split("<br/>");
        return textArr;
    }

    const saveAvatarToLocal = () => {
        downloadCanvasToImage(selectedAvatar.url);
    }

    const submitNft = () => {
        const url = saveImageAsUrl(canvas);
        const metadata: NftMetadata = {
            attributes: attributes,
            description: currentText,
            image: url,
            name: title

        }
        onPublish(metadata, isLazyMint);
    }

    const validateSubmitButton = () : boolean => {
        return selectedAvatar === null || title === DEFAULT_TITLE || currentText.includes("Your Name")
    }

    const tabulateAttrData = (): any[] => {
        let data = [];
        attributes.map((attr) => {
            const traits = [attr.trait_type, attr.value];
            data.push(traits);
        })

        return data;
    }

    React.useEffect(() => {
        if (canvas) {
            const img = new Image();
            img.src = mainBackground;
            img.onload = function () {
                // @ts-ignore
                let context = canvas.getContext("2d");
                // @ts-ignore
                canvas.width = img.width;
                // @ts-ignore
                canvas.height = img.height;
                context.fillStyle = "white";
                context.drawImage(img, 0, 0, img.width, img.height);


                context.fillStyle = "black";
                context.font = `bold 32px monospace`;
                context.textAlign = "left";
                context.textBaseline = "middle";
                const textWidth = context.measureText(`${blockChainType}:${accountAddress}`).width;
                // @ts-ignore
                context.fillText(`${blockChainType}:${accountAddress}`, (canvas.width / 2) - (textWidth / 2), 120);


                const texts: string[] = toMultiLine(currentText);
                let lineSpacing = 32;
                let x = 155;
                let y = 280;
                // draw each line on canvas.
                for (let i = 0; i < texts.length; i++) {
                    context.fillText(texts[i], x, y);
                    y += lineSpacing;
                }

                if (selectedAvatar) {
                    const avaImage = new Image();
                    avaImage.src = selectedAvatar.url;
                    avaImage.onload = function () {
                        context.drawImage(avaImage, 925, 266, 180, 180);
                    }

                }

            }
        }

        if (selfImage === null) {

        }

    }, [canvas, selfImage, selectedAvatar, currentText, mainBackground])


    function appendNewTrait() {
        if (newTraitType === "" || newTraitValue === "") {
            enqueue({
                message: 'Please add correct attribute.',
                startEnhancer: ({size}) => <Delete size={size}/>,
            });
            return;
        }

        const newTrait: Trait = {
            trait_type: newTraitType,
            value: newTraitValue
        }

        setNewTraitType("");
        setNewTraitValue("");

        const tmpAttributes: Trait[] = [...attributes, newTrait];
        setAttributes(tmpAttributes);

    }

    return (
        <>
            <AvatarPopUp
                isOpen={avatarPopUpOpened}
                setIsOpen={setAvatarPopUpOpened}
                onAvatarSelected={(url) => {
                    setSelectedAvatar({
                        Method: AvatarMethod.Generation,
                        url: url
                    })
                }}
            />
            <InitialPopUp
                isOpen={initialsPopUpOpened}
                setIsOpen={setInitialsPopUpOpened}
                onInitialSelected={(url) => {
                    setSelectedAvatar({
                        Method: AvatarMethod.Initials,
                        url: url
                    })
                }}
            />
            <AdjustWindow
                imageSrc={mainBackground}
                isOpen={adjustWindowOpened}
                setIsOpen={setAdjustWindowOpened}
                onAdjust={(uri) => {
                    setMainBackground(uri);
                }}/>
            <ComponentPopUp
                isOpen={selectBackgroundOpened}
                setIsOpen={setSelectBackgroundOpened}
                onAccepted={null}
                showActionButton={false}
                modalInfo="Select Background"
            >
                {
                    ethBackground.map((bg, index) => {
                        return (
                            <div className={css({marginBottom: '14px'})}
                                 key={index}
                            >
                                <img src={bg.thumb} width="100%" className={css({borderRadius: '15px'})}/>
                                <Button
                                    kind={KIND.minimal}
                                    overrides={{BaseButton: {style: {width: '100%'}}}}
                                    onClick={() => {
                                        setMainBackground(bg.full);
                                        setSelectBackgroundOpened(false);
                                    }}
                                >
                                    Select</Button>
                            </div>
                        )
                    })
                }
            </ComponentPopUp>
            <ComponentPopUp
                isOpen={attrWindowOpened}
                setIsOpen={setAttrWindowOpened}
                onAccepted={() => {
                    appendNewTrait();
                }}
                showActionButton={true}
                modalInfo="Add attribute"
            >
                <FlexGrid
                    flexGridColumnCount={2}
                    marginBottom="scale200"
                    flexGridColumnGap="scale200"
                >
                    <FlexGridItem>
                        <Input
                            value={newTraitType}
                            placeholder="Trait Type"
                            clearOnEscape
                            // @ts-ignore
                            onChange={e => setNewTraitType(e.target.value.toLowerCase())}
                        />
                    </FlexGridItem>
                    <FlexGridItem>
                        <Input
                            // @ts-ignore
                            onChange={e => setNewTraitValue(e.target.value)}
                            value={newTraitValue}
                            placeholder="Value"
                            clearOnEscape
                        />
                    </FlexGridItem>
                </FlexGrid>
            </ComponentPopUp>
            <CropWindow
                isOpen={uploadPopUpOpened}
                setIsOpen={setUploadPopUpOpened}
                title="Upload & crop your avatar"
                ratio={1}
                onCropped={(newImage => {
                    setSelectedAvatar({
                        Method: AvatarMethod.Upload,
                        url: newImage
                    })
                })}/>
            <ComponentPopUp
                isOpen={commonWindowOpened}
                setIsOpen={setCommonWindowOpened}
                onAccepted={submitNft}
                modalInfo="Upload NFT"
            >

                <Checkbox
                    checked={isLazyMint}
                    checkmarkType={STYLE_TYPE.toggle_round}
                    // @ts-ignore
                    onChange={e => setIsLazyMint(e.target.checked)}
                    labelPlacement={LABEL_PLACEMENT.right}
                >
                    Free minting
                </Checkbox>
                <Accordion>
                    <Panel title={<Show size={24} />}>
                    {isLazyMint &&
                    <Paragraph2>{"You don't have to pay gas fees, but your NFT won't be minted into the blockchain until someone buys it or you transfer it yourself."}
                        <a href="https://rarible.medium.com/create-nfts-for-free-on-rarible-com-via-a-new-lazy-minting-feature-91cb4b7c68e6"> Lean more.</a>
                    </Paragraph2>}
                    {!isLazyMint &&
                    <Paragraph2>{"You will mint your NFT directly into the blockchain, gas fees are required and may be very high."}</Paragraph2>}
                    </Panel>
                </Accordion>
                <Label2 marginTop="scale500">{`The image will be minted as an NFT ${(isLazyMint) ? "without gas fees" : "with gas fees"}, are you sure want to continue?`}</Label2>
            </ComponentPopUp>
            <div className={css({
                position: 'relative',
                width: '100%',
                marginBottom: "14px"
            })}>
                {
                    <>
                        <Label1 marginBottom="scale800">Create NFT</Label1>
                        <canvas
                            className={css({
                                position: 'relative',
                                width: '100%',
                                marginBottom: "14px",
                                borderRadius: '15px'
                            })}

                            ref={refHandler}
                            id="to-nft-canvas"
                        />
                        <Label2 marginBottom="scale100">NFT Title</Label2>
                        <Paragraph2 marginTop="scale100">It will be used to name your NFT on the
                            marketplace</Paragraph2>
                        <Input
                            value={title}
                            // @ts-ignore
                            onChange={e => setTitle(e.target.value)}
                        />

                        <Label2 marginBottom="scale100" marginTop="scale500">Content</Label2>
                        <Paragraph2 marginTop="scale100">Describe your purpose to create this NFT</Paragraph2>

                        <Textarea
                            value={currentText}
                            size={SIZE.compact}
                            // disabled
                            // @ts-ignore
                            onChange={e => setCurrentText(e.target.value)}
                            placeholder="Content"
                            clearOnEscape
                        />


                        <Accordion
                            accordion
                        >
                            <Panel title="Attributes">
                                <Table
                                    columns={["Trait Type", "Value"]}
                                    data={tabulateAttrData()}
                                    divider={DIVIDER.grid}
                                    size={TableSize.spacious}
                                />

                                <ButtonGroup overrides={buttonGroupOverrides}>

                                    <Button
                                        kind={KIND.minimal}
                                        overrides={{BaseButton: {style: {width: '100%'}}}}
                                        onClick={() => {
                                            setAttrWindowOpened(true)
                                        }}
                                    >
                                        Add more attributes
                                    </Button>
                                    <Button
                                        kind={KIND.minimal}
                                        overrides={{BaseButton: {style: {width: '100%'}}}}
                                        onClick={() => {
                                            setAttributes(DEFAULT_ATTRIBUTES)
                                        }}
                                    >
                                        Reset attributes
                                    </Button>
                                </ButtonGroup>
                            </Panel>
                            <Panel title="Customize">
                                <Label2 marginBottom="14px">Background</Label2>
                                <ButtonGroup overrides={buttonGroupOverrides}>
                                    <Button onClick={() => setSelectBackgroundOpened(true)}>Select Background</Button>
                                </ButtonGroup>
                                <Label2 marginBottom="14px">Select Avatar</Label2>
                                <ButtonGroup overrides={buttonGroupOverrides}>
                                    <Button onClick={() => setAvatarPopUpOpened(true)}>Avatar Generation</Button>
                                    <Button onClick={() => setInitialsPopUpOpened(true)}>Initials</Button>
                                    <Button onClick={() => setUploadPopUpOpened(true)}>Upload Avatar</Button>
                                </ButtonGroup>
                            </Panel>
                            <Panel title="Misc.">
                                <ButtonGroup overrides={buttonGroupOverrides}>
                                    <Button
                                        onClick={() => setAdjustWindowOpened(true)}
                                        startEnhancer={() => <ChevronRight size={24}/>}
                                        kind={KIND.primary}
                                    >
                                        Adjust Color</Button>
                                    {
                                        selectedAvatar &&
                                        <Button
                                            startEnhancer={() => <ChevronRight size={24}/>}
                                            kind={KIND.primary}
                                            onClick={saveAvatarToLocal}
                                        >
                                            Download
                                            Avatar Image
                                        </Button>
                                    }
                                </ButtonGroup>
                            </Panel>
                        </Accordion>
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
                            endEnhancer={() => <Upload size={24}/>}
                            onClick={() => setCommonWindowOpened(true)}
                            disabled={validateSubmitButton()}
                        >
                            Submit NFT
                        </Button>
                    </>
                }
            </div>
        </>
    );
}

export default ToNftCanvas;
