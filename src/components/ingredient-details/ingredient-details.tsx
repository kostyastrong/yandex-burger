import {Ingredient} from "../utlis/types";
import styles from "./ingredient-details.module.css";

export default function IngredientDetails({ingredient}: { ingredient: Ingredient }) {  // protein fat carbohydrate
    return (
        <div className={styles.pfc}>
            <h2 className={`${styles.title} text text_type_main-large mt-10 ml-10`}>Детали ингредиента</h2>
            <img className="ml-5 mr-5" src={ingredient?.image_large} alt={ingredient?.name}/>
            <p className={`text text_type_main-medium mt-4`}>{ingredient?.name}</p>
            <ul className={`${styles.nutrients} mt-8 mb-15`}>
                <li className={styles.value}>
                    <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Калории,ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient?.calories}</p>
                </li>
                <li className={styles.value}>
                    <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient?.proteins}</p>
                </li>
                <li className={styles.value}>
                    <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient?.fat}</p>
                </li>
                <li className={styles.value}>
                    <p className={`${styles.text} text text_type_main-default text_color_inactive`}>Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{ingredient?.carbohydrates}</p>
                </li>
            </ul>
        </div>
    );
}