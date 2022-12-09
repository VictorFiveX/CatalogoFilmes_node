import  '../../components/init';
import { useEffect, useState, useRef } from "react";

import {useNavigate} from 'react-router-dom';

import localStorage from 'local-storage';
import {login} from '../../api/UsuarioApi';
import LoadingBar from 'react-top-loading-bar';

import './index.scss';

export default function Index() {

const [email,SetEmail] = useState ('')
const [senha,SetSenha] = useState ('')
const [erro,SetErro] = useState('')
const [loading, setLoading] = useState(false)

const Navigate = useNavigate();

const ref = useRef();

    useEffect(() =>{
        if(localStorage('Usuario-Logado')){
            Navigate('/admin');
        }
    },[]);

async function Entrar(){
    ref.current.continuousStart()
    setLoading(true);

try{
    const resp = await login(email,senha,);
    console.log(resp);
    localStorage('Usuario-Logado', resp);
        setTimeout(() => {
    Navigate('/admin');

},2000);

}catch (err){
    ref.current.complete();
    setLoading(false);
    if(err.response.status === 401){ 
        SetErro(err.response.data.erro);
    }
}
}
    return (
        <main className='page page-login'>
            <LoadingBar color='#f11946' ref={ref} />

            <section className="box-login">

                <div className="bem-vindo">
                    <img src="/src/assets/images/logo.svg" alt="logo" />
                    <h1> Seja Bem-vindo!</h1>
                </div>

                <div>
                    <div className='form-row'>
                        <label>E-mail:</label>
                        <input type='text' placeholder='Informe seu e-mail' value={email} onChange={e => SetEmail(e.target.value)} />
                    </div>
                    <div className='form-row'>
                        <label>Senha:</label>
                        <input type='password' placeholder='***' value={senha} onChange={e => SetSenha(e.target.value)}/>
                    </div>
                    <div className='form-entrar'>
                        <button className='btn-black' onClick={Entrar} disabled={loading}>ENTRAR</button> 
                    </div>
                    <div className='form-entrar invalido'>
                    {erro}
                    </div>
                </div>

            </section>
        </main>
    )
}

