import React from "react";
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader} from "baseui/modal";
import {useStyletron} from "baseui";


const CommonImagePopUp: React.FC<{isOpen: boolean, setIsOpen: Function, imageSrc: string}> = (
    {
        isOpen,
        setIsOpen,
        imageSrc
    }
) => {


    const [css, theme] = useStyletron();

    return(<>
        <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
            <ModalHeader>Export Image</ModalHeader>
            <ModalBody>

                <div className={css({
                    position: 'relative',
                    width: '100%',
                    marginBottom: "14px"
                })}>
                </div>
                <img src={imageSrc} width="100%"/>
            </ModalBody>
            <ModalFooter>
                <ModalButton kind="tertiary" onClick={() => setIsOpen(false)}>
                    Okay
                </ModalButton>
            </ModalFooter>
        </Modal>
    </>);
}

export default CommonImagePopUp;
