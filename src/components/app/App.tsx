import React from 'react';
import styles from './App.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

export default function App() {
    return (
        <div className={styles.App}>
            <AppHeader></AppHeader>
            <div className={styles.main}>
                <BurgerIngredients></BurgerIngredients>
                <BurgerConstructor></BurgerConstructor>
            </div>
        </div>
    );
}

