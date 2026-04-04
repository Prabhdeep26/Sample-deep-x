import axios  from "axios"

export const authapi = axios.create({
    baseURL : import.meta.env.VITE_AUTH_URL,
    withCredentials : true
});

export const documentapi = axios.create({
    baseURL : import.meta.env.VITE_DOC_URL,
    withCredentials : true
});



