import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {closeModal, ModalVisibility} from "../../services/slices/modal-slice";
import Modal from "../modal/modal";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/reducers/root-reducer";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

export default function Main() {

    const modalState = useSelector((state: RootState) => state.modal.visibility);    // console.log("modal: " + JSON.stringify(modalState));
    // console.log("comparison with closed: ", modalState.valueOf() !== ModalVisibility.CLOSED.valueOf());
    // console.log("difference: " + modalState.valueOf() + " " + ModalVisibility.CLOSED.valueOf());
    const dispatch = useDispatch();
    const onClose = () => {
        console.log("onClose");
        dispatch(closeModal());
    }  // no callback, independent
    const children = modalState.valueOf() === ModalVisibility.INGREDIENT_DETAILS.valueOf() ? <IngredientDetails/> :
        <OrderDetails/>
    return (
        <main className={styles.main}>
            <BurgerIngredients/>
            <BurgerConstructor/>
            {modalState as ModalVisibility !== ModalVisibility.CLOSED as ModalVisibility &&
                <Modal onClose={onClose}>{children}</Modal>
            }
        </main>
    );
}