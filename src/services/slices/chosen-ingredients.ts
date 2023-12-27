import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Ingredient} from "../../utils/types";

interface chosenIngredientsState {
    ingredients: Ingredient[],
    bun: Ingredient | null,
}

const CHOSEN_INGREDIENTS = 'CHOSEN_INGREDIENTS';
const initialState = {ingredients: [], bun: null,} as chosenIngredientsState;

const chosenIngredients = createSlice({
    name: CHOSEN_INGREDIENTS,
    initialState: initialState,
    reducers: {
        pushBack: (state, action: PayloadAction<Ingredient>) => {
            let ingredient = action.payload;  // Ingredient
            if (ingredient.type === "bun") {
                state.bun = ingredient;
            } else {
                state.ingredients.push(ingredient);
            }
        },
        insert: (state, action: PayloadAction<Ingredient>) => {
            let ingredient = action.payload;  // Ingredient
            if (ingredient.type === "bun") {
                state.bun = ingredient;
            } else {
                state.ingredients = [ingredient, ...state.ingredients];
            }
        }
    },
});

export const {pushBack, insert} = chosenIngredients.actions;
export default chosenIngredients.reducer;  // export to use reducer outside the class