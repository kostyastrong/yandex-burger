import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {dndTypes, IngredientConstructor} from "../../utils/types";
import styles from './burger-constructor.module.css';
import {useCallback, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {ChosenIngredientsState, pushBack} from "../../services/slices/chosen-ingredients";
import {DndItemMenu} from "../../utils/classes";
import SortableComponent from "../burger-constructor-component/sortable-component";
import {openModalOrder} from "../../services/slices/modal-slice";


export default function BurgerConstructor() {

    // state consists of a bun and ingredients with their individual constructor id-s
    const chosenIngredients: ChosenIngredientsState = useSelector((state: {
        chosenIngredients: ChosenIngredientsState
    }) => state.chosenIngredients);
    const dispatch = useDispatch();

    let bun = chosenIngredients.bun;

    const cost = useMemo(() => {
        return chosenIngredients.ingredients.reduce((sum, ingredient) => {
            return sum + ingredient.price
        }, 0)
    }, [chosenIngredients.ingredients]) + (bun ? bun.price * 2 : 0);

    // listen to a dropped item
    const [collectedProps, drop] = useDrop(() => ({
        accept: dndTypes.MENU_ITEM,
        drop: (item: DndItemMenu, monitor) => {
            console.log(`Dropped item: ${JSON.stringify(item)}`);
            dispatch(pushBack(item.getIngredient()));
        },
    }), [])

    const renderSortableComponent = useCallback(
        (ingredient: IngredientConstructor) => {
            return (
                <SortableComponent constructorId={ingredient.constructor_id}
                                   key={ingredient.constructor_id}/>
            )
        },
        [chosenIngredients.ingredients],
    )

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
                    extraClass={"ml-8 mb-2"}
                />
                <div className={styles.scroll}>
                    {chosenIngredients.ingredients
                        .map((ingredient) => {
                            console.log("RENDER ", ingredient.constructor_id)
                            return renderSortableComponent(ingredient)
                        })
                    }
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
                    <p className="text text_type_digits-medium">{cost}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={() => {
                    dispatch(openModalOrder())
                }}>
                    Оформить заказ
                </Button>
            </div>
        </div>
    );
}