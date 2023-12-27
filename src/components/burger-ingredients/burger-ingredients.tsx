import TabsBar from "../burger-ingredients-tabs-bar/tabs-bar";
import styles from './burger-ingredients.module.css';
import Menu from "../burger-ingredients-menu/menu";
import {BurgerIngredientProps} from "../../utils/types";
import {useState} from "react";


export default function BurgerIngredients({ingredients}: BurgerIngredientProps) {
    const [activeTab, setActiveTab] = useState("bun");
    const [scrollEnable, setScrollEnable] = useState(true);

    return (
        <article className={styles.burger_ingredients}>
            <h2 className={`${styles.title} text text_type_main-large`}>Соберите бургер</h2>
            <TabsBar activeTab={activeTab} setActiveTab={setActiveTab} setScrollEnable={setScrollEnable}/>
            <Menu ingredients={ingredients} activeTab={activeTab} setActiveTab={setActiveTab} scroll={scrollEnable}
                  setScroll={setScrollEnable}/>
        </article>
    );
}