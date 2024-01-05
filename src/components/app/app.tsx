import React, {useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Main from "../main/main";
import {useDispatch} from "react-redux";
import {fetchIngredients} from "../../services/actions/fetch-ingredients";
import {AppDispatch} from "../../services/reducers/root-reducer";

export default function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    return (
        <div className={styles.App}>
            <AppHeader/>
            <DndProvider backend={HTML5Backend}>
                <Main/>
            </DndProvider>
        </div>
    );  // ingredient["_id"] should be used carefully, e.g. when ingredients are not fetch, it brakes
}

