import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Ingredient} from "../../utils/types";
import styles from './burger-constructor.module.css';
import {bunMock} from "./bun_mock";
import Modal from "../modal/modal";
import {useState} from "react";
import OrderDetails from "../order-details/order-details";

export default function BurgerConstructor({ingredients, order}: {
    ingredients: Ingredient[],
    order: string[]
}) {
    let bun = ingredients.find((ingredient) => ingredient.type === 'bun');
    if (bun === undefined) {
        bun = bunMock;
    }
    const [modal, setModal] = useState(false);
    return (
        <div className={styles.burger_constructor}>
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
                    {ingredients
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