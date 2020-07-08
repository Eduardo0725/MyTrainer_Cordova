class Api {
    url;
    headers = new Headers({ 
        'Content-Type': 'application/json', 
        'Accept-Charset': 'utf-8' 
    });
    method = {
        get: 'GET',
        post: 'POST', 
        put: 'PUT', 
        delete: 'DELETE'
    };
    mode = 'cors';

    constructor(url = ''){
        this.url = url
    }

    async get(urn = '')
    {
        return await fetch(this.url + urn, {
            method: this.method.get,
            headers: this.headers,
            mode: this.mode
        }).then(res => {
            if(!res.ok){
                throw new Error("HTTP error, status: " + res.status);
            }
            return res.json();
        }).then(res => res).catch(err => err);
    }

    async post(body, urn = '')
    {
        return await fetch(this.url + urn, {
            method: this.method.post,
            body: JSON.stringify(body),
            headers: this.headers,
            mode: this.mode
        }).then(res => {
            if(!res.ok){
                throw new Error("HTTP error, status: " + res.status);
            }
            return res.json();
        }).then(res => res).catch(err => err);
    }

    async put(body, urn = '')
    {
        return await fetch(this.url + urn, {
            method: this.method.put,
            body: JSON.stringify(body),
            headers: this.headers,
            mode: this.mode
        }).then(res => {
            if(!res.ok){
                throw new Error("HTTP error, status: " + res.status);
            }
            return res.json();
        }).then(res => res).catch(err => err);
    }

    async delete(body, urn = '')
    {
        return await fetch(this.url + urn, {
            method: this.method.delete,
            body: JSON.stringify(body),
            headers: this.headers,
            mode: this.mode
        }).then(res => {
            if(!res.ok){
                throw new Error("HTTP error, status: " + res.status);
            }
            return res.json();
        }).then(res => res).catch(err => err);
    }
}

try{
    module.exports = new Api;
} catch (e){
    //
}