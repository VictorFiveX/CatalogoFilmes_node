import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:3030/",
    timeout: 2000,
    headers: {
        "Content-Type": "application/json",
}});

export async function CadastrarFilmes(nome, avaliacao, lancamento, disponivel, sinopse, usuario) {
    const resposta = await api.post('/filme', {
        nome: nome,
        sinopse: sinopse,
        avaliacao: avaliacao,
        disponivel: disponivel,
        lancamento: lancamento,
        usuario: usuario
    
    });   
    
    return resposta.data;


}
export  async function imagemFilme(id, imagem) {

    const formdata = new FormData();
    formdata.append('capa', imagem);

    const response = await api.put(`/filme/${id}/capa`, formdata,{
            headers: { 'Content-Type': 'multipart/form-data'

    },
});
return  response.status;

}
export async function AlterarFilmes(nome, avaliacao, lancamento, disponivel, sinopse, usuario) {
    const resposta = await api.put(`/filme/${id}`, {
        nome: nome,
        sinopse: sinopse,
        avaliacao: avaliacao,
        disponivel: disponivel,
        lancamento: lancamento,
        usuario: usuario
    
    });   
    return resposta.data;

}