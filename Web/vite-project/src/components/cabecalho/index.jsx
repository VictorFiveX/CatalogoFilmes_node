import  '../init';
import storage from 'local-storage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss'


export default function Index() {

    const [usuario,setUsuario] = useState('-');
    
    const navigate = useNavigate();
    
    useEffect(() =>{
        if(!storage('Usuario-Logado')){
            navigate('/');
        }else{
            const usuarioLogado = storage('Usuario-Logado');
            setUsuario(usuarioLogado.nome);
            
        }
    },[]);

    
    return (
        <header className='comp-cabecalho'>
            <div className='bem-vindo'>Seja bem-vindo, {usuario}!</div>
            <div>
                <div className='usuario'>
                    <span>{ usuario[0] } </span>
                </div>
            </div>
        </header>
    )
}


