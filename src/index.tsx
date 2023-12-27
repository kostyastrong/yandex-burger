import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import {configureStore} from "@reduxjs/toolkit";
import availableIngredientsReducer from "./services/slices/available-ingredients";
import chosenIngredientsReducer from "./services/slices/chosen-ingredients";

const store = configureStore({
    reducer: {
        availableIngredients: availableIngredientsReducer,
        chosenIngredients: chosenIngredientsReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
