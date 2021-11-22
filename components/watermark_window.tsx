import React from "react";
import {useStyletron} from "baseui";
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader} from "baseui/modal";
import dynamic from "next/dynamic";

const CustomStage = dynamic(() => import('./custom_stage'), {ssr: false});


const WatermarkWindow: React.FC<{
    imageSrc: string, isOpen: boolean, setIsOpen: Function, onWaterMarked: Function, predefinedText: string
}> = ({
          imageSrc,
          isOpen,
          setIsOpen,
          predefinedText,
          onWaterMarked
      }) => {

    const [css, theme] = useStyletron();
    const [getImage, setGetImage] = React.useState<Function>(null);


    function handleExport() {
        const url = getImage();
        onWaterMarked(url);

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
                    <CustomStage
                        imgSrc={imageSrc}
                        predefinedText={predefinedText}
                        getImage={(newImage) => {
                            setGetImage(newImage)
                        }}
                    />
                </div>
                <div>

                </div>
            </ModalBody>
            <ModalFooter>
                <ModalButton kind="tertiary" onClick={() => setIsOpen(false)}>
                    Cancel
                </ModalButton>
                <ModalButton onClick={() => {
                    handleExport();
                    setIsOpen(false);
                }}>Okay</ModalButton>
            </ModalFooter>
        </Modal>
    )
}

export default WatermarkWindow;
