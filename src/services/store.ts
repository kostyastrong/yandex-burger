import {configureStore} from '@reduxjs/toolkit'
import rootReducer from "./reducers/root-reducer";

export default configureStore({
    reducer: rootReducer,
    // https://redux.js.org/tutorials/essentials/part-5-async-logic
    // official docs: Redux Toolkit's configureStore function automatically sets up the thunk middleware by default,
    // and we recommend using thunks as a standard approach for writing async logic with Redux.
    devTools: process.env.NODE_ENV !== 'production',
})