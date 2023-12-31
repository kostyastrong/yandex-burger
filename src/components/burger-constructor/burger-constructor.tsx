import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {dndTypes, Ingredient} from "../../utils/types";
import styles from './burger-constructor.module.css';
import Modal from "../modal/modal";
import {useState} from "react";
import OrderDetails from "../order-details/order-details";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {chosenIngredientsState, pushBack} from "../../services/slices/chosen-ingredients";
import {availableIngredientsState} from "../../services/slices/available-ingredients";
import {DndItemMenu} from "../../utils/classes";

export default function BurgerConstructor() {
    const ingredients: Ingredient[] = useSelector((state: {
        availableIngredients: availableIngredientsState
    }) => state.availableIngredients.ingredients);

    // state consists of bun and ingredients with their individual constructor id-s
    const chosenIngredients: chosenIngredientsState = useSelector((state: {
        chosenIngredients: chosenIngredientsState
    }) => state.chosenIngredients);
    const dispatch = useDispatch();


    const order = ingredients.map((ingredient) => ingredient["_id"])
    let bun = chosenIngredients.bun;
    if (chosenIngredients.bun === undefined) {
    }


    const [collectedProps, drop] = useDrop(() => ({
        accept: dndTypes.MENU_ITEM,
        drop: (item: DndItemMenu, monitor) => {
            console.log(`Dropped item: ${JSON.stringify(item)}`);
            dispatch(pushBack(item.getIngredient()));
        },
    }))
    const [modal, setModal] = useState(false);
    return (
        <div ref={drop} className={styles.burger_constructor}>
            <div className={styles.burger}>
                <ConstructorElement
                    key={"top"}
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    extraClass={"ml-8"}
                />
                <div className={styles.scroll}>
                    {chosenIngredients.ingredients
                        .filter((ingredient) => order.includes(ingredient._id))
                        .filter((ingredient) => ingredient.type !== 'bun')
                        .map((ingredient) => (
                            <div key={ingredient._id} className={styles.swappable}>
                                <DragIcon type="primary"/>
                                <ConstructorElement
                                    isLocked={ingredient.type === 'bun'}
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                    handleClose={() => {
                                        console.log("close " + ingredient._id);
                                    }}
                                />
                            </div>
                        ))}
                </div>
                <ConstructorElement
                    key={"bottom"}
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    extraClass={"ml-8"}
                />
            </div>
            <div className={styles.place_order}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium">1488</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={() => setModal(true)}>
                    Оформить заказ
                </Button>
            </div>
            {modal && <Modal onClose={() => setModal(false)}>
                <OrderDetails/>
            </Modal>}
        </div>
    );
}