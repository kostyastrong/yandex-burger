import {createSlice} from '@reduxjs/toolkit';

export enum ModalVisibility {
    CLOSED,
    INGREDIENT_DETAILS,
    ORDER_DETAILS,
}

const initialState = {
    visibility: ModalVisibility.CLOSED,
};

const modalSlice = createSlice({
    name: 'MODAL_STATE',
    initialState: initialState,
    reducers: {
        closeModal: (state) => {
            state.visibility = ModalVisibility.CLOSED;
        },
        openModalIngredient: (state) => {
            state.visibility = ModalVisibility.INGREDIENT_DETAILS
        },
        openModalOrder: (state) => {
            state.visibility = ModalVisibility.ORDER_DETAILS
        }
    },
});

export const {openModalOrder, openModalIngredient, closeModal} = modalSlice.actions;

export default modalSlice.reducer;