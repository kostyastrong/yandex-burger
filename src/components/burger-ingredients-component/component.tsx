import {useState} from "react";
import {dndTypes, Ingredient} from "../../utils/types";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './component.module.css';
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {useDrag} from "react-dnd";
import {DndItemMenu} from "../../utils/classes";

// components which are shown
export default function Component({ingredient, showModal, setShowModal}: {
    ingredient: Ingredient,
    showModal: string,
    setShowModal: (value: string) => void
}) {
    const [counter, setCounter] = useState(0);

    const [collected, drag, dragPreview] = useDrag(() => ({
        type: dndTypes.MENU_ITEM,
        item: new DndItemMenu(ingredient),
        end: () => {
            console.log("drag ended, no actions on drag");
        }
        // collect prop is unnecessary, because application doesn't change when dragging of a menu component begins
    }))
    return (
        <div ref={drag}>
            <div className={styles.component} onClick={() => setShowModal(ingredient._id)}>
                {counter > 0 && <Counter count={counter} size="default" extraClass="m-1"/>}
                <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name}/>
                <div className={`${styles.price} mt-1 mb-2`}>
                    <p className="text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={`${styles.subtitle} text text_type_main-default`}>{ingredient.name}</p>
            </div>
            {showModal === ingredient._id &&
                <Modal onClose={() => setShowModal("undefined")}>
                    <IngredientDetails ingredient={ingredient}/>
                </Modal>
            }
        </div>
    );
}