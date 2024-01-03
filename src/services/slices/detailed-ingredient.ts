import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Ingredient} from "../../utils/types";
import {bunMock} from "../../components/burger-constructor/bun_mock";

interface modalState {
    currentIngredient: Ingredient;
}

const initialState: modalState = {
    currentIngredient: bunMock,
};

const detailedIngredientSlice = createSlice({
    name: 'DETAILED_INGREDIENT',
    initialState: initialState,
    reducers: {
        setCurrentIngredient: (state, action: PayloadAction<Ingredient>) => {
            state.currentIngredient = action.payload;
        },
    },
});

export const {setCurrentIngredient} = detailedIngredientSlice.actions;

export default detailedIngredientSlice.reducer;