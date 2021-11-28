import React from "react";
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader} from "baseui/modal";
import Cropper from "react-easy-crop";
import {Label2} from "baseui/typography";
import {Slider} from "baseui/slider";
import {Button} from "baseui/button";
import {ArrowDown, Overflow, Upload} from "baseui/icon";
import {StatefulPopover} from "baseui/popover";
import {Checkbox, LABEL_PLACEMENT, STYLE_TYPE} from "baseui/checkbox";
import {Panel} from "baseui/accordion";
import {downloadCanvasToImage, saveImageAsUrl} from "../common/filters";
import WmModel, {saveWm} from "../common/wm_model";
import Router from "next/router";

const ExportWindow: React.FC<{ imageSrc: string, desc: string, isOpen: boolean, setIsOpen: Function, onImageSaved: Function }> = (
    {
        imageSrc,
        isOpen,
        setIsOpen,
        desc,
        onImageSaved
    }
) => {

    const [enableSave, setEnableSave] = React.useState<boolean>(true);
    const [downloaded, setDownloaded] = React.useState<boolean>(false);
    const [exportedWm, setExportedWm] = React.useState<string>();


    const downloadToLocal = () => {
        const url = saveImageAsUrl(document.getElementById('canvas'))
        downloadCanvasToImage(url);
        const wmToSave: WmModel = {
            createdAt: new Date(),
            id: new Date().getTime().toString(),
            image: url,
            text: desc
        }
        setExportedWm(wmToSave.id)
        saveWm(wmToSave);
        onImageSaved(wmToSave);
    }

    const toNft = () => {
        Router.push(`to-nft/${exportedWm}`).then();
    }

    return (
        <>
            <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
                <ModalHeader>Export Image</ModalHeader>
                <ModalBody>
                    <Checkbox
                        checked={enableSave}
                        checkmarkType={STYLE_TYPE.toggle_round}
                        onChange={e => {
                            // @ts-ignore
                            setEnableSave(e.target.checked)
                        }}
                        labelPlacement={LABEL_PLACEMENT.left}
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
                        Save result to local
                    </Checkbox>
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
                        onClick={() => {
                            downloadToLocal();
                            setDownloaded(true);
                        }}
                        endEnhancer={() => <ArrowDown size={24}/>}
                    >
                        Download Image
                    </Button>
                    {
                        downloaded && enableSave &&
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
                            onClick={toNft}
                            endEnhancer={() => <Upload size={24}/>}
                        >
                            Create NFT Version
                        </Button>
                    }

                </ModalBody>
                <ModalFooter>
                    <ModalButton kind="tertiary" onClick={() => setIsOpen(false)}>
                        Done
                    </ModalButton>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ExportWindow;
