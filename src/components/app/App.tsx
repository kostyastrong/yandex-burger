import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {Ingredient} from "../utlis/types";

export default function App() {

    const url = "https://norma.nomoreparties.space/api/ingredients";
    // fetch data from url
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const dataJson = await response.json().then(data => data.data);
                console.log('data is fetched');

                setIngredients(dataJson);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={styles.App}>
            <AppHeader></AppHeader>
            <div className={styles.main}>
                <BurgerIngredients ingredients = {ingredients}></BurgerIngredients>
                <BurgerConstructor></BurgerConstructor>
            </div>
        </div>
    );
}

