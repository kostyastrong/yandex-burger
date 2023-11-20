import TabsBar from "../burger-ingredients-tabs-bar/tabs-bar";
import styles from './burger-ingredients.module.css';
import Menu from "../burger-ingredients-menu/menu";
import {Ingredient, BurgerIngredientProps} from "../utlis/types";
import {useState} from "react";


export default function BurgerIngredients( { ingredients }: BurgerIngredientProps) {
    const [activeTab, setActiveTab] = useState("bun");

    return (
        <div className={styles.burger_ingredients}>
            <div className={styles.title}>
                <h2 className="text text_type_main-large">Соберите бургер</h2>
            </div>
            <TabsBar activeTab={activeTab} setActiveTab={setActiveTab}/>
            <Menu ingredients={ingredients} activeTab={activeTab} setActiveTab={setActiveTab}/>
        </div>
    );
}