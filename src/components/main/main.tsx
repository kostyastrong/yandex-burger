import styles from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {ModalVisibility} from "../../services/slices/modal-slice";
import Modal from "../modal/modal";
import React from "react";
import {useSelector} from "react-redux";

export default function Main() {

    const modalState = useSelector((state: { modal: { visibility: ModalVisibility } }) => state.modal.visibility);
    // console.log("modal: " + JSON.stringify(modalState));
    // console.log("comparison with closed: ", modalState.valueOf() !== ModalVisibility.CLOSED.valueOf());
    // console.log("difference: " + modalState.valueOf() + " " + ModalVisibility.CLOSED.valueOf());
    return (
        <main className={styles.main}>
            <BurgerIngredients/>
            <BurgerConstructor/>
            {modalState as ModalVisibility !== ModalVisibility.CLOSED as ModalVisibility &&
                <Modal/>
            }
        </main>
    );
}