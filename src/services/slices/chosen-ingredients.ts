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
            let changeIndex = state.ingredients.findIndex((ingredient) => ingredient.constructor_id === request.constructor_id);
            // first remove, then insert
            if (changeIndex === -1) {
                console.error("no ingredient with id " + request.constructor_id + " are found ");
                return;
            }
            let aboveIndex = request.above_constructor_id === null ? -1 : state.ingredients.findIndex((ingredient) => ingredient.constructor_id === request.above_constructor_id);

        },

        removeWithId: (state, action: PayloadAction<number>) => {
            // decrement if using map
            state.ingredients = state.ingredients.filter((ingredient) => ingredient.constructor_id !== action.payload);
        },
        removeAt: (state, action: PayloadAction<number>) => {
            state.ingredients.splice(action.payload, 1);
        },
        // initFromIngredients: (state, action: PayloadAction<Ingredient[]>) => {
        //     for (const ingredient of action.payload) {
        //         state.amount.set(ingredient._id, 0);
        //     }
        //     state.amount.set(bunMock._id, 1);
        // },
        // updateMap: (state, action: PayloadAction<{ key: string; value: number }>) => {
        //     const {key, value} = action.payload;
        //     state.amount.set(key, value);
        // },
        // increment: (state, action: PayloadAction<string>) => {
        //     if (!state.amount.has(action.payload)) {
        //         console.log("no ingredient with id " + action.payload + " are found to increment value, so we created one with amount = 0");
        //         state.amount.set(action.payload, 0);
        //     }
        //     state.amount.set(action.payload, state.amount.get(action.payload)! + 1);
        // },
        // decrement: (state, action: PayloadAction<string>) => {
        //     if (!state.amount.has(action.payload)) {
        //         console.log("error, no ingredient with id " + action.payload + " are found to decrement value, so we created one with amount = 0");
        //         state.amount.set(action.payload, 0);
        //     }
        //     state.amount.set(action.payload, state.amount.get(action.payload)! - 1);
        // }
    },
});

export const {
    pushBack,
    // increment,
    // decrement,
    // updateMap,
    // initFromIngredients,
    changePosition,
    removeWithId
} = chosenIngredients.actions;
export default chosenIngredients.reducer;  // export to use reducer outside the class