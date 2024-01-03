import {combineReducers} from 'redux';
import availableIngredientsReducer from '../slices/available-ingredients';
import chosenIngredientsReducer from '../slices/chosen-ingredients';
import detailedIngredientReducer from '../slices/detailed-ingredient';
import modalReducer from '../slices/modal-slice';
// import numberOfIngredient from "../slices/number-of-ingredient";

// When we pass in an object like {counter: counterReducer}, that says that
// we want to have a state.counter section of our Redux state object, and that
// we want the counterReducer function to be in charge of deciding if and how to update
// the state.counter section whenever an action is dispatched

const rootReducer = combineReducers({
    availableIngredients: availableIngredientsReducer,
    chosenIngredients: chosenIngredientsReducer,
    detailedIngredient: detailedIngredientReducer,
    modal: modalReducer,
});

export default rootReducer;