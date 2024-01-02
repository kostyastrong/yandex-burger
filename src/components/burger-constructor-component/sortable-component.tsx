import styles from "./sortable-component.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {changePosition, ChosenIngredientsState, removeWithId} from "../../services/slices/chosen-ingredients";
import {dndTypes} from "../../utils/types";
import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {useCallback} from "react";

interface Item {
    constructorId: number;
    originalIndex: number;
}

interface SortableComponentProps {
    constructorId: number;
}

// list with drag and drop items, as in docs: https://react-dnd.github.io/react-dnd/examples/sortable/simple
export default function SortableComponent(props: SortableComponentProps) {
    const chosenIngredients: ChosenIngredientsState = useSelector((state: {
        chosenIngredients: ChosenIngredientsState
    }) => state.chosenIngredients);

    const findIndexIngredient = useCallback(
        (constructorId: number) => {
            return chosenIngredients.ingredients.findIndex((i) => i.constructor_id === constructorId);
        },
        [chosenIngredients.ingredients],
    )
    const ingredient = chosenIngredients.ingredients[findIndexIngredient(props.constructorId)];
    const dispatch = useDispatch();
    const [collected, drag] = useDrag({
        type: dndTypes.CONSTRUCTOR_ITEM,
        item: {constructorId: ingredient.constructor_id, originalIndex: findIndexIngredient(ingredient.constructor_id)},
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const didDrop = monitor.didDrop();
            // if the item wasn't dropped, return to previous position
            if (!didDrop) {
                console.log("dropped outside");
                const oldIndex = findIndexIngredient(item.constructorId)
                const moveInfo = {
                    old_index: oldIndex, // the index of the ingredient to be moved
                    new_index: item.originalIndex // the constructor_id of the ingredient above the one is being hovered
                };
                dispatch(changePosition(moveInfo));
            }
        }
    }, [chosenIngredients, ingredient.constructor_id]);

    const [, drop] = useDrop({
        accept: dndTypes.CONSTRUCTOR_ITEM,
        hover({constructorId: draggedIngredientId}: Item, monitor) {
            console.log("HOVER IS TRIGGERED")
            // for some reason, the ingredient.constructor_id doesn't change and it's being triggered again and again
            // for example, we can drag 1 item over 2 and it detects this. It changes position of dragged element to the position of 2
            // everything is fine, render completes in BurgerConstructor component.
            // Then, for some reason, hover is triggered again with the same parameters 1 and 2 and swaps everything back.
            // to overcome this issue the dispatch is performed every 5th time with the following lines of code:
            // if (state.actionNumber % 5 !== 0) {
            //   return;
            // }
            if (draggedIngredientId !== ingredient.constructor_id) {
                console.log("Dragged, hovered: " + draggedIngredientId + " " + ingredient.constructor_id);
                // ingredient is underneath, item (draggedIngredient) is above
                const oldIndex = findIndexIngredient(draggedIngredientId);
                const newIndex = findIndexIngredient(ingredient.constructor_id);

                const moveInfo = {
                    old_index: oldIndex,
                    new_index: newIndex
                };
                setTimeout(() => dispatch(changePosition(moveInfo)), 0);
            }
        },
    }, [chosenIngredients, ingredient.constructor_id]);

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