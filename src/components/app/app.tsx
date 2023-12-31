import React, {useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {reset} from "../../services/slices/available-ingredients";
import {Ingredient} from '../../utils/types';
import {useDispatch} from "react-redux";
import store from "../../services/store";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


async function getIngredientsFromServer(url: string) {
    const response = await fetch(url);
    if (response.ok) {
        const json = await response.json();
        console.log('Data fetched successfully');
        return json.data;
    }
    throw new Error('Network response was not ok: ' + response.statusText);
}

const setIngredients = async (dispatch: (arg0: {
    payload: Ingredient[];
    type: "AVAILABLE_INGREDIENTS/reset";
}) => void, getState: any) => {
    const data = await getIngredientsFromServer("https://norma.nomoreparties.space/api/ingredients");
    dispatch(reset(data));
    console.log('Data fetched successfully');
}

export default function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                await store.dispatch(setIngredients);
                console.log('Ingredients fetched successfully');
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        };

        fetchIngredients();
    }, []);

    return (
        <div className={styles.App}>
            <AppHeader/>
            <DndProvider backend={HTML5Backend}>
                <main className={styles.main}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </main>
            </DndProvider>
        </div>
    );  // ingredient["_id"] should be used carefully, e.g. when ingredients are not fetch, it brakes
}

