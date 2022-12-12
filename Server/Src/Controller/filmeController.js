import { alterarFilme, alterarImagem, buscarPorId, buscarPorNome, inserirFilme, listarTodosFilmes, removerFilme, } from "../repository/filmeRepository.js";
import multer from 'multer'

import { Router } from'express';

const server = Router();
const upload = multer({ dest: 'Storage/capaFilmes'});

server.post('/filme', async (req, resp)=>{
    try {
        const novoFilme = req.body;

        if(!novoFilme.nome)
        throw new Error('Nome do filme é obrigatório')

        if(!novoFilme.sinopse)
        throw new Error('Sinopse do filme é obrigatório')

        if(novoFilme.avaliacao == undefined || novoFilme.avaliacao < 0)
        throw new Error('Avaliação do filme é obrigatório')

        if(!novoFilme.lancamento)
        throw new Error('Lançamento do filme é obrigatório')

        if(!novoFilme.disponivel)
        throw new Error('Campo disponivel é obrigatório')

        if(!novoFilme.usuario)
        throw new Error('Usuario não logado')

        const filme = await inserirFilme(novoFilme);

        resp.send(filme);

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


server.put('/filme/:id/capa' , upload.single('capa') , async(req,resp) =>{
    try {
        if(!req.file)
        throw new Error('Não foi possível salvar a imagem')

        const { id } = req.params;
        const imagem =req.file.path;

        const resposta = await alterarImagem(imagem, id );

        if(resposta !=1){
            throw new Error('A imagem não pode ser salva.')
        }
        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/filme' , async(req,resp)=>{
    try {
        const resposta = await listarTodosFilmes();
        resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/filme/busca' , async(req,resp)=>{
    try {
        const { nome } = req.query
        const resposta = await buscarPorNome(nome);
        if(!resposta)
            resp.status(404).send([])
        else        
            resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.get('/filme/:id' , async(req,resp)=>{
    try {
        const { id } = req.params
        const resposta = await buscarPorId(id);
        if(!resposta)
            resp.status(404).send([])
        else        
            resp.send(resposta);
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.delete('/filme/:id' , async(req,resp)=>{
    try {
        const { id } = req.params;

        const resposta = await removerFilme(id);
        if(resposta != 1 ){
            throw new Error('Filme não pode ser removido.');
        }
        resp.status(204).send(); 
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
    
})

server.put('/filme/:id', async (req,resp)=>{
    try {
        const { id } = req.params;
        const filme = req.body;

        if(!filme.nome)
            throw new Error('Nome do filme é obrigatório')

        if(!filme.sinopse)
            throw new Error('Sinopse do filme é obrigatório')

        if(filme.avaliacao == undefined || filme.avaliacao < 0)
            throw new Error('Avaliação do filme é obrigatório')

        if(!filme.lancamento)
            throw new Error('Lançamento do filme é obrigatório')

        if(filme.disponivel == undefined)
            throw new Error('Campo disponivel é obrigatório')

        if(!filme.usuario)
            throw new Error('Usuario não logado')

        const resposta = await alterarFilme(id, filme);

        if(resposta !=1){
            throw new Error('Filme não pode ser alterado');
        }else{
            resp.status(204).send()
        }
    } catch (err) {
        console.log(err)
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default server;