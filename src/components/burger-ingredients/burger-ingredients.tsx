import TabsBar from "../burger-ingredients-tabs-bar/tabs-bar";
import styles from './burger-ingredients.module.css';
import Menu from "../burger-ingredients-menu/menu";
export default function BurgerIngredients() {
    return (
        <div className={styles.burger_ingredients}>
            <div className={styles.title}>
                <h2 className="text text_type_main-large">Соберите бургер</h2>
            </div>
            <TabsBar/>
            <Menu/>
        </div>
    );
}