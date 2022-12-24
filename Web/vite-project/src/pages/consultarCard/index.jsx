import Menu from '../../components/menu'
import Cabecalho from '../../components/cabecalho'
import {ListarTodosFilmes, BuscarPorNome, RemoverFilme} from '../../api/FilmesApi/'
import { useState } from 'react'
import { useEffect } from 'react'
import {confirmAlert} from 'react-confirm-alert'
import { useNavigate } from 'react-router-dom'
import './index.scss'



/*         const ano = lancamento.substr(0,4);
        const mes = lancamento.substr(6,2);
        `${mes}/$${ano}`
*/
export default function Index() {
    const Navigate = useNavigate();
    const [filmes,setFilmes] = useState([]);
    const [filtro,setFiltro] = useState('');

    useEffect(() => {
        carregarFilme();

    }, []);


    function formartarLancamento(lancamento){

        return lancamento;
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

    return (
        <main className='page page-consultar'>
            <Menu />
            <div className='container'>
                <Cabecalho />
                
                <div className='conteudo'>

                    <div className='caixa-busca'>
                        <input type="text" placeholder='Buscar filmes por nome' value={filtro} onChange={e => setFiltro(e.target.value)}/>
                        <img src='../src/assets/images/icon-buscar.svg' alt='buscar'  onClick={Filtrar}/>
                    </div>
                    


                    <div className='card-container'>

                    {filmes.map(item =>
                        <div key={item.id} className='comp-card'>
                            <div className='card'>
                                <div className='acoes'>

                                    <img src='../src/assets/images/icon-editar.svg' alt='editar' onClick={e =>{
                                        e.stopPropagation();
                                        editar(item.id)}} />
                                    
                                    <img src='../src/assets/images/icon-remover.svg' alt='remover' onClick={e => {
                                            e.stopPropagation();
                                            Remover(item.id, item.nome)}}/>
                                    
                                </div>
                                <div>
                                    <div className='sigla'>{item.nome.substr(0, 1)}</div>
                                    <div className='filme'>{item.nome}</div>
                                    <div className='lancamento'>{formartarLancamento(props.item.lacamento)}</div>
                                </div>
                                <div>
                                    <div className='avaliacao'>{item.avaliacao}</div>
                                    <div className='disponivel'>{item.disponivel? 'Sim' : 'Não'}</div>
                                </div>
                            </div>
                        </div>)}
                        

                        
                        
                    </div>


                    
                </div>
            </div>
        </main>
    )
}

