import styles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {changePosition, ChosenIngredientsState, removeWithId} from "../../services/slices/chosen-ingredients";
import {dndTypes, IngredientConstructor} from "../../utils/types";
import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from "react-dnd";

// list with drag and drop items, as in docs: https://react-dnd.github.io/react-dnd/examples/sortable/simple
export default function SortableComponent(ingredient: IngredientConstructor) {
    const dispatch = useDispatch();
    const chosenIngredients: ChosenIngredientsState = useSelector((state: {
        chosenIngredients: ChosenIngredientsState
    }) => state.chosenIngredients);

    const originalIndex = chosenIngredients.ingredients.findIndex((chosenIngredient) => chosenIngredient.constructor_id === ingredient.constructor_id);
    const [collected, drag] = useDrag({
        type: dndTypes.CONSTRUCTOR_ITEM,
        item: ingredient,
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const didDrop = monitor.didDrop();
            // if the item wasn't dropped, return to previous position
            if (!didDrop) {
                const ingredientChangePosition = {
                    dragged_constructor_id: ingredient.constructor_id,
                    hovered_constructor_id: originalIndex // the constructor_id of the ingredient above the one is being hovered
                };
                dispatch(changePosition(ingredientChangePosition));
            }
        }
    }, []);

    const [, drop] = useDrop(
        () => ({
            accept: dndTypes.CONSTRUCTOR_ITEM,
            hover(item: IngredientConstructor, monitor) {
                if (item !== ingredient) {
                    const ingredientChangePosition = {
                        dragged_constructor_id: item.constructor_id, // the constructor_id of the ingredient to be moved

                        // self constructor_id
                        hovered_constructor_id: ingredient.constructor_id // the constructor_id of the ingredient above the one is being hovered
                    };
                    dispatch(changePosition(ingredientChangePosition));
                }
            },
        }),
        []
    );

    const opacity = collected.isDragging ? 0 : 1
    return (
        <div style={{opacity}} ref={(node) => drag(drop(node))} className={styles.swappable}>
            <DragIcon type="primary"/>
            <ConstructorElement
                isLocked={ingredient.type === 'bun'}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => {
                    dispatch(removeWithId(ingredient.constructor_id));
                    console.log("removed " + ingredient.constructor_id);
                }}
            />
        </div>
    );
}