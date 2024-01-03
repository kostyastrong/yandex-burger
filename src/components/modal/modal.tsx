import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './modal.module.css';
import {useEffect} from "react";
import ModalOverlay from "./overlay/modal-overlay";
import {createPortal} from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import {closeModal, ModalVisibility} from "../../services/slices/modal-slice";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

export default function Modal() {

    const modalState = useSelector((state: { modal: { visibility: ModalVisibility } }) => state.modal.visibility);
    const dispatch = useDispatch();
    const onClose = () => {
        console.log("onClose");
        dispatch(closeModal());
    }  // no callback, independent

    const children = modalState.valueOf() === ModalVisibility.INGREDIENT_DETAILS.valueOf() ? <IngredientDetails/> :
        <OrderDetails/>

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {

            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return (
        createPortal(
            <ModalOverlay onClick={() => onClose()}>
                <div className={styles.modal} onClick={(event) => {
                    event.stopPropagation()
                }}>
                    <button className={styles.closeButton} onClick={() => onClose()}>
                        <CloseIcon type="primary"/>
                    </button>
                    {children}
                </div>
            </ModalOverlay>, document.getElementById("modals") as HTMLElement)
    );
}
