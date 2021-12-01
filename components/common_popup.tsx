import React from "react";
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader} from "baseui/modal";


const CommonPopUp: React.FC<{ isOpen: boolean, setIsOpen: Function, text: string, onAccepted: Function, modalInfo?: string, isClosable?: boolean }> = (
    {
        isOpen,
        setIsOpen,
        text,
        onAccepted,
        modalInfo = "Info",
        isClosable = true
    }
) => {


    return (<>
        <Modal
            onClose={() => {
                if (setIsOpen)
                    setIsOpen(false)
            }}
            isOpen={isOpen}
            closeable={isClosable}
        >
            <ModalHeader>{modalInfo}</ModalHeader>
            <ModalBody>
                {text}
            </ModalBody>
            <ModalFooter>
                <ModalButton kind="tertiary" onClick={() => {
                    if (setIsOpen)
                        setIsOpen(false)
                }}>
                    Cancel
                </ModalButton>
                <ModalButton onClick={() => {
                    onAccepted();
                    if (setIsOpen)
                        setIsOpen(false)
                }}>
                    Okay
                </ModalButton>
            </ModalFooter>
        </Modal>
    </>);
}

export default CommonPopUp;
