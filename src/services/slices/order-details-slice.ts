import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum ServerResponse {
    loading,
    error,
    success
}


interface OrderDetailsState {
    orderNumber: string;
    status: ServerResponse;
}


const initialState: OrderDetailsState = {
    orderNumber: '',
    status: ServerResponse.loading,
};

const orderDetailsSlice = createSlice({
    name: 'ORDER_DETAILS',
    initialState: initialState,
    reducers: {
        setOrderNumber: (state, action: PayloadAction<string>) => {
            const orderNumber = action.payload;
            state.orderNumber = "0".repeat(6 - orderNumber.length < 6 ? 6 - orderNumber.length : 0) + orderNumber.toString();
        },
        setOrderStatus: (state, action: PayloadAction<ServerResponse>) => {
            state.status = action.payload;
        },
        clearOrderNumber: (state) => {
            state.orderNumber = '';
        },
    },
});

export const {setOrderNumber, setOrderStatus, clearOrderNumber} = orderDetailsSlice.actions;

export default orderDetailsSlice.reducer;