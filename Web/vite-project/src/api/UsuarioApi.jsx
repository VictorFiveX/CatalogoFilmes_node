import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:3030/",
    timeout: 2000,
    headers: {
        "Content-Type": "application/json",
}});




export async function login (email, senha)  {

    const resp = await api.post('/usuario/login', {
        email: email,
        senha: senha
    });

    return resp.data;
  }
