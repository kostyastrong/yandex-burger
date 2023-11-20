import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Ingredient} from "../utlis/types";
import styles from './burger-constructor.module.css';
import {bunMock} from "./bun_mock";

export default function BurgerConstructor({ingredients, order}: {
    ingredients: Ingredient[],
    order: string[]
}) {
    let bun = ingredients.find((ingredient) => ingredient.type === 'bun');
    if (bun === undefined) {
        bun = bunMock;
    }
    return (
        <div className={styles.burger_constructor}>
            <div className={styles.burger}>
                <ConstructorElement
                    key={bun._id}
                    type="top"
                    isLocked={true}
                    text={bun.name}
                    price={bun.price}
                    thumbnail={bun.image}
                />
                <div className={styles.scroll}>
                    {ingredients
                        .filter((ingredient) => order.includes(ingredient._id))
                        .filter((ingredient) => ingredient.type !== 'bun')
                        .map((ingredient) => (
                            <div className={styles.row}>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    key={ingredient._id}
                                    isLocked={ingredient.type === 'bun'}
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                />
                            </div>
                        ))}
                </div>
                <ConstructorElement
                    key={bun._id}
                    type="bottom"
                    isLocked={true}
                    text={bun.name}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>
            <div className={styles.place_order}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium">1488</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}