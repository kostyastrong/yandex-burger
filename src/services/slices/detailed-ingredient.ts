import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Ingredient} from "../../utils/types";

interface modalState {
    currentIngredient: Ingredient | null;
}

const initialState: modalState = {
    currentIngredient: null,
};

const detailedIngredientSlice = createSlice({
    name: 'DETAILED_INGREDIENT',
    initialState: initialState,
    reducers: {
        setCurrentIngredient: (state, action: PayloadAction<Ingredient>) => {
            state.currentIngredient = action.payload;
        },
        clearCurrentIngredient: (state) => {
            state.currentIngredient = null;
        },
    },
});

export const {setCurrentIngredient, clearCurrentIngredient} = detailedIngredientSlice.actions;

export default detailedIngredientSlice.reducer;