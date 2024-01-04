import styles from "./order-details.module.css";
import done from "../../images/done.png";
import {ChosenIngredientsState} from "../../services/slices/chosen-ingredients";
import {useSelector} from "react-redux";
import {RootState} from "../../services/reducers/root-reducer";
import {ServerResponse} from "../../services/slices/order-details-slice";


export default function OrderDetails() {
    const chosenIngredients: ChosenIngredientsState = useSelector((state: {
        chosenIngredients: ChosenIngredientsState
    }) => state.chosenIngredients);
    const success = useSelector((state: RootState) => state.orderDetails.status);
    const orderNumber = useSelector((state: RootState) => state.orderDetails.orderNumber);


    switch (success) {
        case ServerResponse.success:
            return <div className={styles.model_order}>
                <h2 className={`${styles.title} ${styles.neon} text text_type_digits-large mt-30`}>{orderNumber}</h2>
                <p className={`text text_type_main-medium mt-8`}>идентификатор заказа</p>
                <img className={"mt-15"} src={done} alt="Заказ подтвержден"/>
                <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
                <p className="text text_type_main-default text_color_inactive mt-2 mb-30">Дождитесь готовности на
                    орбитальной станции</p>
            </div>
        case ServerResponse.error:
            return <div className={styles.model_order}>
                <h2 className={`${styles.title} ${styles.neon} text text_type_digits-large mt-30`}>СЕРВЕР</h2>
                <h2 className={`${styles.title} ${styles.neon} text text_type_digits-large mt-30`}>ПОМЕР</h2>
                <p className={`text text_type_main-medium mt-8`}>Попробуйте повторить попытку.</p>
                <p className="text text_type_main-default mt-15">К сожалению, мы не смогли принять ваш заказ.</p>
                <p className="text text_type_main-default text_color_inactive mt-2 mb-30">
                    Если проблема не уходит, обратитесь на кассу.</p>
            </div>
        default:
            return <div className={styles.model_order}>
                <h2 className={`${styles.title} ${styles.neon} text text_type_digits-large mt-30`}>ЖДЁМ</h2>
                <p className="text text_type_main-default mt-15">Ожидание ответа от сервера.</p>
                <p className="text text_type_main-default text_color_inactive mt-2 mb-30">
                    Если статус не меняется, обратитесь на кассу.</p>
            </div>
    }
}