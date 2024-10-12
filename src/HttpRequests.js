import { URL_API } from "./constants";

export async function HttpGetRequest(route) {
    try {
        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });

        const response = await fetch(URL_API + route, {
            method: 'GET',
            headers,
            mode: 'cors',
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function HttpPostRequest(route, body, isFormData=false) {
    try {
        let headers = new Headers({
            'Accept': '*/*',
            'Content-Type': 'application/json',
        });

        const response = await fetch(URL_API + route, {
            method: 'POST',
            headers: isFormData ? undefined : headers,
            mode: 'cors',
            body: isFormData
                ? body
                : JSON.stringify(body)
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function HttpPutRequest(route, body) {
    try {
        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });

        const response = await fetch(URL_API + route, {
            method: 'PUT',
            headers,
            mode: 'cors',
            body: JSON.stringify(body)
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function HttpDeleteRequest(route, body) {
    try {
        let headers = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });

        const response = await fetch(URL_API + route, {
            method: 'DELETE',
            headers,
            mode: 'cors',
            body: JSON.stringify(body)
        });
        return response;
    } catch (error) {
        console.error(error);
    }
}