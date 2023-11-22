import styles from "./order-details.module.css";
import done from "../../images/done.png";

export default function OrderDetails() {
    return (
        <div className={styles.model_order}>
            <h2 className={`${styles.title} ${styles.neon} text text_type_digits-large mt-30`}>034536</h2>
            <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
            <img className={"mt-15"} src={done} alt="Заказ подтвержден" />
            <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mt-2 mb-30">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}