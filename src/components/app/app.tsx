import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";


export default function App() {

    const url = "https://norma.nomoreparties.space/api/ingredients";
    // fetch data from url
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetch(url).then((response) => {
            if (response.ok) {
                response.json().then(json => {
                    setIngredients(json.data)
                    console.log('Data fetched successfully');
                });
                return;
            }
            throw new Error('Network response was not ok: ' + response.statusText);
        }).catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className={styles.App}>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients ingredients={ingredients}/>
                <BurgerConstructor ingredients={ingredients}
                                   order={ingredients.map((ingredient) => ingredient["_id"])}/>
            </main>
        </div>
    );  // ingredient["_id"] should be used carefully, e.g. when ingredients are not fetch, it brakes
}

