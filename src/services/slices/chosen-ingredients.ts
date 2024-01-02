import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Ingredient, IngredientChangePosition, IngredientConstructor} from "../../utils/types";
import {bunMock} from "../../components/burger-constructor/bun_mock";


export interface ChosenIngredientsState {
    ingredients: IngredientConstructor[],
    bun: Ingredient,
    actionNumber: number,
}

const CHOSEN_INGREDIENTS = 'CHOSEN_INGREDIENTS';
const initialState = {
    ingredients: [], bun: bunMock, actionNumber: 0,
} as ChosenIngredientsState;

const chosenIngredients = createSlice({
    name: CHOSEN_INGREDIENTS,
    initialState: initialState,
    reducers: {
        pushBack: (state, action: PayloadAction<Ingredient>) => {
            // to create unique ids for constructor's ingredients, we use actionNumber
            state.actionNumber += 1;
            let ingredient = action.payload;  // Ingredient
            if (ingredient.type === "bun") {
                state.bun = ingredient;
            } else {
                state.ingredients.push({...ingredient, constructor_id: state.actionNumber});
            }
        },
        changePosition: (state, action: PayloadAction<IngredientChangePosition>) => {
            let request = action.payload;  // Ingredient
            // find index of requested ingredient
            let oldIndex = state.ingredients.findIndex((ingredient) => ingredient.constructor_id === request.dragged_constructor_id);
            if (oldIndex === -1) {
                console.error("no ingredient with id " + request.dragged_constructor_id + " are found ");
                return;
            }
            const newIndex = request.hovered_constructor_id === null ? 0 : state.ingredients.findIndex((ingredient) => ingredient.constructor_id === request.hovered_constructor_id);
            const ingredient = state.ingredients.splice(oldIndex, 1)[0];
            console.log("oldIndex: " + oldIndex + " newIndex: " + newIndex);
            state.ingredients.splice(newIndex, 0, ingredient);
        },

        // remove with constructor id
        removeWithId: (state, action: PayloadAction<number>) => {
            // insert decrement operation if using map
            state.ingredients = state.ingredients.filter((ingredient) => ingredient.constructor_id !== action.payload);
        },

        // remove with index in array
        removeAt: (state, action: PayloadAction<number>) => {
            state.ingredients.splice(action.payload, 1);
        },
    },
});

export const {
    pushBack,
    changePosition,
    removeWithId
} = chosenIngredients.actions;
export default chosenIngredients.reducer;  // export to use reducer outside the class