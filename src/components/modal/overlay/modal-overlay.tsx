import {inspect} from "util";
import styles from './modal-overlay.module.css';
import {ReactNode} from "react";

export default function ModalOverlay({children, onClick}: { children: ReactNode, onClick: () => void }) {
    return (
        <div className={styles.backdrop} onClick={onClick}>
            {children}
        </div>
    );
}