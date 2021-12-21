import React from "react";
import {Modal, ModalBody, ModalButton, ModalFooter, ModalHeader} from "baseui/modal";



export interface ComponentPopUpProps
{
    isOpen: boolean,
    setIsOpen: Function,
    children: React.ReactNode;
    onAccepted: Function,
    modalInfo?: string,
    isClosable?: boolean
    showActionButton?: boolean
}


const ComponentPopUp: React.FC<ComponentPopUpProps> = (
    {
        isOpen,
        setIsOpen,
        children,
        onAccepted,
        modalInfo = "Info",
        isClosable = true,
        showActionButton = true,
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
                {children}
            </ModalBody>
            {showActionButton && <ModalFooter>
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
            </ModalFooter>}
        </Modal>
    </>);
}

export default ComponentPopUp;
