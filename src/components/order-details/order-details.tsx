import styles from "./order-details.module.css";
import done from "../../images/done.png";
import {useCallback, useEffect, useState} from "react";
import {ChosenIngredientsState} from "../../services/slices/chosen-ingredients";
import {useSelector} from "react-redux";

interface OrderResponse {
    name: string;
    order: {
        number: number;
    };
    success: boolean;
}

enum ServerResponse {
    loading,
    error,
    success
}

export default function OrderDetails() {
    const chosenIngredients: ChosenIngredientsState = useSelector((state: {
        chosenIngredients: ChosenIngredientsState
    }) => state.chosenIngredients);
    const [serverUrl, setServerUrl] = useState('https://norma.nomoreparties.space/api/orders');
    const [success, setSuccess] = useState(ServerResponse.loading);
    const [orderNumber, setOrderNumber] = useState('');

    const fetchOrder = useCallback(async () => {
        const componentsId = [chosenIngredients.bun._id, ...chosenIngredients.ingredients.map(ingredient => ingredient._id), chosenIngredients.bun._id];
        console.log("componentsId: ", componentsId);

        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 2000);

        const response = await fetch(serverUrl,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ingredients: componentsId}),
                signal: controller.signal
            },);
        clearTimeout(id);
        if (response.ok) {
            const json = await response.json();
            console.log('Order fetched successfully', json);
            return json;
        }
        throw new Error('Network response was not ok: ' + response.statusText);
    }, [chosenIngredients])

    useEffect(() => {
        const getData = async () => {
            try {
                const data: OrderResponse = await fetchOrder();
                setSuccess(ServerResponse.success);
                const orderNumber = data.order.number.toString();
                setOrderNumber("0".repeat(6 - orderNumber.length < 6 ? 6 - orderNumber.length : 0) + orderNumber.toString())
                console.log('Order fetched successfully');
            } catch (error) {
                setSuccess(ServerResponse.error)
                console.error('Error fetching order:', error);
            }
        };
        getData();
    }, [serverUrl, fetchOrder]);

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