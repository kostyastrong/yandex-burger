import {BASE_URL} from "./const";

function checkResponse(res: Response) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
}


export async function request(endpoint: string, options: RequestInit) {
    const url = BASE_URL + endpoint;
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(url, options).then(checkResponse)
}
