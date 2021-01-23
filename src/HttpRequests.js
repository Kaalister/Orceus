const URL_API = "https://kf3hmnez3b.execute-api.eu-west-3.amazonaws.com/Orceus";

export async function HttpGetRequest(route) {
    try {
        let headers = new Headers ({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });

        const response = await fetch(URL_API + route, {
            method: "GET",
            headers
        });
        return(await response);
    } catch (error) {
        console.log(error);
    }
}

export async function HttpPostRequest(route, body) {
    try {
        let headers = new Headers ({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });

        const response = await fetch(URL_API + route, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        });
        return(await response);
    } catch (error) {
        console.log(error);
    }
}

export async function HttpPutRequest(route, body) {
    try {
        let headers = new Headers ({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });

        const response = await fetch(URL_API + route, {
            method: "PuT",
            headers,
            body: JSON.stringify(body)
        });
        return(await response);
    } catch (error) {
        console.log(error);
    }
}

export async function HttpDeleteRequest(route, body) {
    try {
        let headers = new Headers ({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });

        const response = await fetch(URL_API + route, {
            method: "DELETE",
            headers,
            body: JSON.stringify(body)
        });
        return(await response);
    } catch (error) {
        console.log(error);
    }
}