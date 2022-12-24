import 'dotenv/config'
import cors from 'cors';
import usuarioCotroller from './Controller/usuarioController.js';
import filmeCotroller from './Controller/filmeController.js'; 
import express from 'express'



const server = express();
server.use(cors());
server.use(express.json());

//liberar arquivos da storage
server.use('/src/Storage/CapaFilmes', express.static('storage/CapaFilmes'));

//configurando açoes no banco de dados
server.use(usuarioCotroller);
server.use(filmeCotroller);

// Startando a API lendo a variavel de porta executando uma funçao que nao recebe paramentros
server.listen(process.env.PORT,()=>console.log(`conectado na porta ${process.env.PORT}`));