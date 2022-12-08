import 'dotenv/config'
import usuarioCotroller from './Controller/usuarioController.js';
import express from 'express'

import cors from 'cors'

const server = express();
server.use(cors());
server.use(express.json());

//configurando açoes no banco de dados
server.use(usuarioCotroller);

// Startando a API lendo a variavel de porta executando uma funçao que nao recebe paramentros
server.listen(process.env.PORT,()=>console.log(`conectado na porta ${process.env.PORT}`));