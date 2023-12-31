import {dndTypes, Ingredient} from "../../utils/types";
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './component.module.css';
import {useDrag} from "react-dnd";
import {DndItemMenu} from "../../utils/classes";
import {useDispatch, useSelector} from "react-redux";
import {ChosenIngredientsState} from "../../services/slices/chosen-ingredients";
import {openModalIngredient} from "../../services/slices/modal-slice";
import {setCurrentIngredient} from "../../services/slices/detailed-ingredient";
import {AppDispatch} from "../../services/reducers/root-reducer";

// components which are shown
export default function Component({ingredient}: {
    ingredient: Ingredient,
}) {
    const dispatch = useDispatch<AppDispatch>();
    // map<string, number> doesn't serialize well, but docs has similar example:
    // https://redux.js.org/tutorials/essentials/part-4-using-data
    // const post = useSelector(state =>
    //     state.posts.find(post => post.id === postId)
    //   )
    // by this they keep tracking each post individually, though it is less efficient than having map with number of the specific type as a value
    const counter: number = useSelector((state: {
        chosenIngredients: ChosenIngredientsState
    }) => state.chosenIngredients.ingredients.filter((chosenIngredient) => chosenIngredient._id === ingredient._id).length);

    const [collected, drag, dragPreview] = useDrag(() => ({
        type: dndTypes.MENU_ITEM,
        item: new DndItemMenu(ingredient),
        end: () => {
            console.log("drag ended, no actions on drag");
        }
        // collect prop is unnecessary, because application doesn't change when dragging of a menu component begins
    }), [])
    return (
        <div ref={drag}>
            <div className={styles.component} onClick={() => {
                dispatch(setCurrentIngredient(ingredient))
                dispatch(openModalIngredient())
            }}>
                {counter > 0 && <Counter count={counter} size="default" extraClass="m-1"/>}
                <img className="ml-4 mr-4" src={ingredient.image} alt={ingredient.name}/>
                <div className={`${styles.price} mt-1 mb-2`}>
                    <p className="text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <p className={`${styles.subtitle} text text_type_main-default`}>{ingredient.name}</p>
            </div>
        </div>
    );
}