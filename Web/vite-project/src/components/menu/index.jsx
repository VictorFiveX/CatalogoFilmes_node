import  '../../components/init';
import localStorage from 'local-storage'; 
import { useNavigate, Link } from 'react-router-dom';
import './index.scss'
import { useState} from 'react';



export default function Index(props) {
    const navigate = useNavigate();
    

    function sairClick(){
        localStorage.remove('Usuario-Logado');
        navigate('/');
    }

    function VerificarSelect(menu){
        if (menu === props.selecionado)
            return 'selecionado'
                else
                    return '';


    }
        return (
        <nav className="comp-menu">
            <div>
                <div className='logo'>
                    <img src="/src/assets/images/logo.svg" alt="logo" />
                    <div>Portifolio.me</div>
                </div>

                <div className='menu-items'>
                    <Link to = '/admin' className={ VerificarSelect("home")}>
                        <img src="/src/assets/images/icon-home.svg" alt="home" />
                        <div>Home</div>
                    </Link>
                    <Link to = '/admin/cadastrar'  className={ VerificarSelect("cadastrar")}>
                        <img src="/src/assets/images/icon-cadastrar.svg" alt="cadastrar" />
                        <div >Cadastrar</div>
                    </Link>
                    <Link to = '/admin/consultar' className={ VerificarSelect("consultar")}>
                        <img src="/src/assets/images/icon-consultar.svg" alt="consultar" />
                        <div>Consultar</div>
                    </Link >
                </div>
            </div>

            <div className='menu-items'>
                <a onClick={sairClick} href="#">
                    <img src="/src/assets/images/icon-sair.svg" alt="consultar" />
                    <div>Sair</div>
                </a>
            </div>
        </nav>
    )
}