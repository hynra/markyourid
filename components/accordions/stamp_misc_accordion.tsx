import React from "react";
import {Accordion, Panel} from "baseui/accordion";
import {Button, KIND} from "baseui/button";
import {ChevronRight} from "baseui/icon";
import {ButtonGroup} from "baseui/button-group";
import CommonImagePopUp from "../modals/common_image_popup";

const StampMiscAccordion: React.FC<{
    qrCodeImageUrl: string,
    nftImageUrl: string,
    onQrDownloaded: (qrCodeImageUrl: string) => void
}> = ({
          qrCodeImageUrl,
          nftImageUrl,
          onQrDownloaded
      }) => {

    const [imagePopUpOpened, setImagePopUpOpened] = React.useState<boolean>(false);

    return (
        <Accordion>
            <Panel title="Misc">
                <CommonImagePopUp
                    isOpen={imagePopUpOpened}
                    setIsOpen={setImagePopUpOpened}
                    imageSrc={nftImageUrl}
                    />
                <ButtonGroup
                    overrides={{Root: {style: {alignItems: 'center', justifyContent: 'center', marginBottom: "1px"}}}}
                >
                    <Button startEnhancer={() => <ChevronRight size={24}/>} kind={KIND.primary}
                            onClick={() => onQrDownloaded(qrCodeImageUrl)}>Download QR Code</Button>
                    <Button startEnhancer={() => <ChevronRight size={24}/>} kind={KIND.primary}
                            onClick={() => setImagePopUpOpened(true)}>View NFT Image</Button>
                </ButtonGroup>
            </Panel>
        </Accordion>
    );
}

export default StampMiscAccordion;
