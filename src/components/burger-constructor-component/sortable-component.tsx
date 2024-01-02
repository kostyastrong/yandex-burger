import styles from "./sortable-component.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {removeWithId} from "../../services/slices/chosen-ingredients";
import {dndTypes, IngredientConstructor, MoveInfo} from "../../utils/types";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";

interface Item {
    ingredient: IngredientConstructor;
    originalIndex: number;
}

interface SortableComponentProps {
    findIndexIngredient: (constructorId: number) => number;
    moveIngredient: (moveInfo: MoveInfo) => void;
    ingredient: IngredientConstructor;
}

// list with drag and drop items, as in docs: https://react-dnd.github.io/react-dnd/examples/sortable/simple
export default function SortableComponent(props: SortableComponentProps) {
    const {findIndexIngredient, moveIngredient, ingredient} = props;
    const originalIndex = findIndexIngredient(ingredient.constructor_id);
    const dispatch = useDispatch();
    const [collected, drag] = useDrag({
        type: dndTypes.CONSTRUCTOR_ITEM,
        item: {ingredient, originalIndex},
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const didDrop = monitor.didDrop();
            // if the item wasn't dropped, return to previous position
            if (!didDrop) {
                console.log("dropped outside");
                const oldIndex = findIndexIngredient(item.ingredient.constructor_id)
                const moveInfo = {
                    old_index: oldIndex, // the index of the ingredient to be moved
                    new_index: item.originalIndex // the constructor_id of the ingredient above the one is being hovered
                };
                moveIngredient(moveInfo);
            }
        }
    }, [moveIngredient, findIndexIngredient, ingredient.constructor_id, originalIndex]);

    const [, drop] = useDrop({
        accept: dndTypes.CONSTRUCTOR_ITEM,
        hover({ingredient: draggedIngredient}: Item, monitor) {
            console.log("SOMETHING IS HAPPENING 222")
            if (draggedIngredient.constructor_id !== ingredient.constructor_id) {
                console.log("Dragged, hovered" + draggedIngredient.constructor_id + " " + ingredient.constructor_id);
                // ingredient is underneath, item (draggedIngredient) is above
                const oldIndex = findIndexIngredient(draggedIngredient.constructor_id);
                const newIndex = findIndexIngredient(ingredient.constructor_id);

                const moveInfo = {
                    old_index: oldIndex,
                    new_index: newIndex
                };
                moveIngredient(moveInfo)
            }
        },
    }, [moveIngredient, findIndexIngredient, ingredient]);
    console.log("SOMETHING IS HAPPENING 111")

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