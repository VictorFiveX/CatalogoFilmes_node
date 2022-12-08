import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

import './index.scss';

export default function Index() {

const [email,SetEmail] = useState ('')
const [senha,SetSenha] = useState ('')
const [erro,SetErro] = useState('')

const navigate = useNavigate();

async function Entrar(){
try{const resp = await axios.post('http://localhost:3030/usuario/login', {
    email: email,
    senha: senha
});

navigate('/admin');
}catch (err){
    if(err.response.status === 401){ 
        SetErro(err.response.data.erro);
    }
}
}



    return (
        <main className='page page-login'>
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
                        <button className='btn-black' onClick={Entrar}>ENTRAR</button> 
                    </div>
                    <div className='form-entrar invalido'>
                    {erro}
                    </div>
                </div>

            </section>
        </main>
    )
}

