import {request} from '../../utils/check-response';
import {reset} from '../slices/available-ingredients';

export function fetchIngredients() {
    return async function(dispatch) {
        try {
            const response = await request('/ingredients', {method: 'GET'});
            dispatch(reset(response.data));
            console.log('Ingredients fetched successfully');
        } catch (error) {
            console.error('Error fetching ingredients:', error);
        }
    };
}

