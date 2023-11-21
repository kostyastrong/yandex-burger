import {useState} from "react";
import {Ingredient} from "../utlis/types";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './component.module.css';
import {createPortal} from "react-dom";
import Modal from "../modal/modal";
import ModalPFC from "../modal-pfc/modal-pfc";

export default function Component({ingredient, showModal, setShowModal}: {
    ingredient: Ingredient,
    showModal: string,
    setShowModal: (value: string) => void
}) {
    const [counter, setCounter] = useState(0);
    return (
        <div>
            <div className={styles.component} onClick={() => setShowModal(ingredient._id)}>
                {counter > 0 && <Counter count={counter} size="default" extraClass="m-1"/>}
                <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name}/>
                <div className={`${styles.price} mt-1 mb-2`}>
                    <p className="text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={`${styles.subtitle} text text_type_main-default`}>{ingredient.name}</p>
            </div>
            {showModal === ingredient._id && createPortal(
                <Modal children={<ModalPFC ingredient={ingredient} />} onClose={() => setShowModal("-1")}/>,
                document.body
            )}
        </div>
    );
}