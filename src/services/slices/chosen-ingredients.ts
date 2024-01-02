import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Ingredient, IngredientConstructor, MoveInfo} from "../../utils/types";
import {bunMock} from "../../components/burger-constructor/bun_mock";


export interface ChosenIngredientsState {
    ingredients: IngredientConstructor[],
    bun: Ingredient,
    // to count number of calls:
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
        changePosition: (state, action: PayloadAction<MoveInfo>) => {
            state.actionNumber += 1;
            if (state.actionNumber % 5 !== 0) {
                return;
            }
            let request = action.payload;  // Ingredient
            // find index of requested ingredient
            const oldIndex = request.old_index;
            const newIndex = request.new_index;
            if (oldIndex === -1) {
                console.error("no ingredient with id " + request.old_index + " are found ");
                return;
            }
            console.log("Start " + state.actionNumber)
            // deep copy, structuredClone doesn't work with Proxy objects, another option is to use JSON.parse and JSON.stringify
            const newIngredients = [...state.ingredients];
            const ingredient = newIngredients.splice(oldIndex, 1)[0];
            // console.log("state: " + JSON.stringify(state.ingredients.map((i) => i.constructor_id)))
            // console.log("newIngredients: " + newIngredients.map((i: IngredientConstructor) => i.constructor_id))
            // console.log("ingredient: " + JSON.stringify(ingredient));
            // console.log("oldIndex: " + oldIndex + " newIndex: " + newIndex);
            newIngredients.splice(newIndex, 0, ingredient);
            // console.log("state: " + JSON.stringify(state.ingredients.map((i) => i.constructor_id)))
            // console.log("newIngredients: " + newIngredients.map((i: IngredientConstructor) => i.constructor_id))
            state.ingredients = newIngredients;
            console.log("End")
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