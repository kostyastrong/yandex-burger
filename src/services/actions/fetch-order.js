import {request} from '../../utils/check-response';
import {
    ServerResponse,
    setOrderNumber,
    setOrderStatus,
} from '../slices/order-details-slice';

const fetchOrder = componentsId => async () => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 2000);
    const endpoint = '/orders';

    try {
        const json = await request(endpoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ingredients: componentsId}),
            signal: controller.signal,
        });
        console.log('Order fetched successfully', json);
        return json;
    } catch (error) {
        console.error('Network response was not ok:', error);
        throw error;
    } finally {
        clearTimeout(id);
    }
};

export const getOrder = (chosenIngredients) => async (dispatch) => {
    const componentsId = [
        chosenIngredients.bun._id,
        ...chosenIngredients.ingredients.map(ingredient => ingredient._id),
        chosenIngredients.bun._id,
    ];

    dispatch(fetchOrder(componentsId)).then((data) => {
        dispatch(setOrderStatus(ServerResponse.success));
        dispatch(setOrderNumber(data.order.number.toString()));
        console.log('Order fetched successfully');
    }).catch(error => {
        dispatch(setOrderStatus(ServerResponse.error));
        console.error('Error fetching order:', error);
    });
};