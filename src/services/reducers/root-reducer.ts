import {combineReducers} from 'redux';
import availableIngredientsReducer from '../slices/available-ingredients';
import chosenIngredientsReducer from '../slices/chosen-ingredients';
import detailedIngredientReducer from '../slices/detailed-ingredient';
import orderDetailsReducer from '../slices/order-details-slice';
import modalReducer from '../slices/modal-slice';
import store from "../store";
import {useDispatch} from "react-redux";

// When we pass in an object like {counter: counterReducer}, that says that
// we want to have a state.counter section of our Redux state object, and that
// we want the counterReducer function to be in charge of deciding if and how to update
// the state.counter section whenever an action is dispatched

export const rootReducer = combineReducers({
    availableIngredients: availableIngredientsReducer,
    chosenIngredients: chosenIngredientsReducer,
    detailedIngredient: detailedIngredientReducer,
    orderDetails: orderDetailsReducer,
    modal: modalReducer,
});

process.env.NODE_ENV === 'development' && console.log(rootReducer);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
