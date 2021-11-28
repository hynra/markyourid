import React from "react";
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader} from "baseui/modal";


const CommonPopUp: React.FC<{ isOpen: boolean, setIsOpen: Function, text: string, onAccepted: Function }> = (
    {
        isOpen,
        setIsOpen,
        text,
        onAccepted
    }
) => {


    return (<>
        <Modal onClose={() => setIsOpen(false)} isOpen={isOpen}>
            <ModalHeader>Info</ModalHeader>
            <ModalBody>
                {text}
            </ModalBody>
            <ModalFooter>
                <ModalButton kind="tertiary" onClick={() => setIsOpen(false)}>
                    Cancel
                </ModalButton>
                <ModalButton onClick={() => {
                    onAccepted();
                    setIsOpen(false)
                }}>
                    Okay
                </ModalButton>
            </ModalFooter>
        </Modal>
    </>);
}

export default CommonPopUp;
