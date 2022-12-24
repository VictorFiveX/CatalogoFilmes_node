import Menu from '../../components/menu'
import Cabecalho from '../../components/cabecalho'
import {ListarTodosFilmes, BuscarPorNome, RemoverFilme } from '../../api/FilmesApi/'
import {confirmAlert} from 'react-confirm-alert'
import './index.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Index() {

    const [filmes,setFilmes] = useState([]);
    const [filtro,setFiltro] = useState('');

    const Navigate = useNavigate();

    function abrirDetalhe(id){
        Navigate(`/admin/detalhe/${id}`);

    }

    async function carregarFilme(){
        const resp = await ListarTodosFilmes();
        setFilmes(resp);
    }

    async function Filtrar(){
        const resp = await BuscarPorNome(filtro);
        setFilmes(resp);
    }

    function editar(id){
        Navigate(`/admin/alterar/${id}`);
    }

    async function Remover(id, nome){

        confirmAlert({
            title: 'Remover Filme',
            message: `Deseja remover o filme ${nome} ?`,
            buttons: [
              {
                label: 'Sim',
                onClick: async() => {
                    alert (id +'' + nome);
                    const resp = await RemoverFilme(id);
                    if(filtro === ''){
                        carregarFilme();
                    }else{
                        Filtrar();
                    }
                }
              },
              {
                label: 'Nao',
              }
            ]
          });

    }


    useEffect(() => {
        carregarFilme();

    }, []);

    return (
        <main className='page page-consultar'>
            <Menu selecionado = 'consultar'/>
            <div className='container'>
                <Cabecalho />
                
                <div className='conteudo'>

                    <div className='caixa-busca'>
                        <input type="text" placeholder='Buscar filmes por nome'  value={filtro} onChange={e => setFiltro(e.target.value)}/>
                        <img src='../src/assets/images/icon-buscar.svg' alt='buscar' onClick={Filtrar}/>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>IDENTIFICAÇÃO</th>
                                <th>FILME</th>
                                <th>AVALIAÇÃO</th>
                                <th>LANÇAMENTO</th>
                                <th>DISPONÍVEL</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                        {filmes.map(item => 
                                    <tr key={item.id} onClick= {()=> abrirDetalhe(item.id)}>
                                    <td>{item.id}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.avaliacao}</td>
                                    <td>{item.lancamento.substr(0, 10) }</td>
                                    <td>{item.disponivel? 'Sim' : 'Não'}</td>
                                    <td>
                                        <img src='../src/assets/images/icon-editar.svg' alt='editar'
                                         onClick={e =>{
                                        e.stopPropagation();
                                        editar(item.id)}}/>

                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                        <img src='../src/assets/images/icon-remover.svg' alt='remover' 
                                        onClick={e => {
                                            e.stopPropagation();
                                            Remover(item.id, item.nome)}}
                                            />
                                    </td>
                                </tr>
                                     
                                     
                        )}
                        </tbody>
                    </table>
                    
                </div>
            </div>
        </main>
    )
}

