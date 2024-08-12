import { toast } from 'sonner';

export const helpFetch = () => {
    const URL = "http://localhost:3000";

    const customFetch = async (endpoint, options = {}) => {
        options.method = options.method || "GET";
        options.headers = {
            "content-type": "application/json",
        }
        
    options.body = JSON.stringify(options.body);

    const response = await fetch(`${URL}${endpoint}`, options);
    console.log(response);
    return await (response.ok
        ? response.json()
        : toast.error(`Error ${response.status}: ${response.statusText}`) && Promise.reject({
            error: true,
            status: response.status,
            statusText: response.statusText
        }));
    }
    const get = (endpoint) => customFetch(endpoint);
    const post = (endpoint, options) => {
        options.method = "POST";
        console.log(options);
        return customFetch(endpoint, options)
    }
    return { get, post }
}