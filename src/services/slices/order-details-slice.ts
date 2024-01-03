import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface OrderDetailsState {
    orderNumber: string;
}

const initialState: OrderDetailsState = {
    orderNumber: '',
};

const orderDetailsSlice = createSlice({
    name: 'ORDER_DETAILS',
    initialState: initialState,
    reducers: {
        setOrderNumber: (state, action: PayloadAction<string>) => {
            state.orderNumber = action.payload;
        },
        clearOrderNumber: (state) => {
            state.orderNumber = '';
        },
    },
});

export const {setOrderNumber, clearOrderNumber} = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;