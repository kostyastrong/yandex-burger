import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './modal.module.css';
import {ReactNode, useEffect} from "react";
import ModalOverlay from "./overlay/modal-overlay";
import {createPortal} from "react-dom";

export default function Modal({onClose, children}: { onClose: () => void, children: ReactNode }) {

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return (
        createPortal(
            <ModalOverlay onClick={onClose}>
                <div className={styles.modal} onClick={(event) => {
                    event.stopPropagation()
                }}>
                    <button className={styles.closeButton} onClick={onClose}>
                        <CloseIcon type="primary"/>
                    </button>
                    {children}
                </div>
            </ModalOverlay>, document.getElementById("modals") as HTMLElement)
    );
}
