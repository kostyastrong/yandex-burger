import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Ingredient, IngredientChangePosition, IngredientConstructor} from "../../utils/types";
import {bunMock} from "../../components/burger-constructor/bun_mock";

export interface chosenIngredientsState {
    ingredients: IngredientConstructor[],
    bun: Ingredient,
    actionNumber: number,
}

const CHOSEN_INGREDIENTS = 'CHOSEN_INGREDIENTS';
const initialState = {ingredients: [], bun: bunMock, actionNumber: 0,} as chosenIngredientsState;

const chosenIngredients = createSlice({
    name: CHOSEN_INGREDIENTS,
    initialState: initialState,
    reducers: {
        pushBack: (state, action: PayloadAction<Ingredient>) => {
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
        removeAt: (state, action: PayloadAction<number>) => {
            state.ingredients.splice(action.payload, 1);
        },
    },

    // to create unique ids for constructor's ingredients, we use actionNumber
    extraReducers: (builder) => {
        builder.addDefaultCase((state) => {
            state.actionNumber += 1;
        });
    }
});

export const {pushBack, changePosition} = chosenIngredients.actions;
export default chosenIngredients.reducer;  // export to use reducer outside the class