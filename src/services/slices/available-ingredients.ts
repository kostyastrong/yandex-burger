import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Ingredient} from "../../utils/types";

interface availableIngredientsState {
    ingredients: Ingredient[],
}

const initialState = {ingredients: []} as availableIngredientsState;

// availableIngredients saves fetched data about ingredients. We set it once and don't touch ever.
const availableIngredientsSlice = createSlice({
    name: "AVAILABLE_INGREDIENTS",
    initialState: initialState, reducers: {
        // in case we need to reset ingredients
        reset: (state, action: PayloadAction<Ingredient[]>) => {
            // we can mutate the state because slice will generate some immutable function instead
            // if we wrote reducer only, we should have written:
            // return {...state, ingredients: action.payload};
            state.ingredients = action.payload;
        },
    },
});

// here we describe all possible actions with the slice
export const {reset} = availableIngredientsSlice.actions;
export const selectAvailableIngredients = (state: {
    availableIngredients: { ingredients: Ingredient[] }
}) => state.availableIngredients.ingredients;

// basically, the action is "what" to do, when the reducer is "how" to do it
export default availableIngredientsSlice.reducer;
