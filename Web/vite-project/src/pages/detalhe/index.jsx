import { useParams } from 'react-router-dom';
import Menu from '../../components/menu'
import Cabecalho from '../../components/cabecalho'
import Detalhe from '../../components/detalhe'
import { BuscarPorId } from '../../api/FilmesApi';
import { useState } from 'react'
import { useEffect } from 'react'
import './index.scss'

export default function Index() {

    const {idParam} = useParams();

    const [filme, setFilme] = useState({});

    useEffect(()=>{
        carregarfilme();
      
    }, []);

    async function carregarfilme(){
        const result = await BuscarPorId(idParam);
        setFilme(result);
        }

    return (
        <main className='page page-detalhe'>
            <Menu />
            <div className='container'>
                <Cabecalho />
                
                <div className='conteudo'>
                    <Detalhe filme = {filme}/>
                </div>
            </div>
        </main>
    )
}

