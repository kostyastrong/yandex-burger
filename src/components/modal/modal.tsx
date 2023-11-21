import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './modal.module.css';
import {Ingredient} from "../utlis/types";
import ModalPFC from "../modal-pfc/modal-pfc";
import {ReactNode} from "react";

export default function Modal({ onClose, children }: { onClose: () => void, children: ReactNode }) {

    return (
        <div className={styles.modal}>
            <button className={styles.closeButton} onClick={onClose}>
                <CloseIcon type="primary" />
            </button>
            {children}
        </div>
    );
}
