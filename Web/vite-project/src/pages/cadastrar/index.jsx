import Menu from '../../components/menu'
import Cabecalho from '../../components/cabecalho'
import storage from 'local-storage';
import {CadastrarFilmes, imagemFilme, AlterarFilmes} from '../../api/FilmesApi';
import {useState} from 'react'
import {toast} from 'react-toastify';

import './index.scss'



export default function Index() {


    const [nome,setNome] = useState('');
    const [sinopse,setSinopse] = useState('');
    const [avaliacao,setAvaliacao] = useState(0);
    const [disponivel,setDisponivel] = useState(false);
    const [lancamento,setLancamento] = useState('');
    const [imagem,setImagem] = useState('');

    const [id,setid] = useState(0);

    async function salvarClick(){
        
        try{
            if(!imagem)
            {
                throw new Error('escolha uma imagem de capa')
            }
            const usuario = storage('Usuario-Logado').id;

            let idFilme = 0;


            if(id === 0){
                const NewFilme = await CadastrarFilmes(nome,avaliacao,lancamento,disponivel,sinopse, usuario);               
                await imagemFilme(NewFilme.id, imagem);

                setid(NewFilme.id);
                toast.dark('❤️Filme cadastrado com sucesso!');
            }else{

                await AlterarFilmes(id,nome,avaliacao,lancamento,disponivel,sinopse, usuario);    
                toast.dark('❤️Filme alterado com sucesso!');

            }
            

              

       }catch(err){
        if(err.response)
        toast.error(err.response.data.error);
        else
        toast.error(err.message);
       }
   
    }


    function escolherImg(){
        document.getElementById('imgCapa').click();
    }

    function mostrarImg(){

            return URL.createObjectURL(imagem);

    }

    function NovoFilme(){
        setid(0);
        setNome('');
        setAvaliacao(0);
        setDisponivel(true);
        setSinopse('');
        setLancamento('');
        setImagem();
    }

    return (
        <main className='page page-cadastrar'>

            <Menu  selecionado = 'cadastrar'/>
            <div className='container'>
                <Cabecalho />
                
                <div className='conteudo'>
                    <section>
                        <h1 className='titulo'><span>&nbsp;</span> Cadastrar Novo Filme</h1>

                        <div className='form-colums'>
                            <div>
                                <div className='upload-capa'>
                                    {
                                        !imagem &&
                                        <img src="../src/assets/images/icon-upload.svg" alt="" onClick={escolherImg}/>
                                    }
                                
                                    {
                                        imagem && 
                                        <img className='imagem-capa' src={mostrarImg()} alt='' />
                                    }

                                    <input 
                                        type="file" id='imgCapa' onChange={e => setImagem(e.target.files[0])}/>
                                </div>
                            </div>
                            <div>
                                <div className='form-row'>
                                    <label>Nome:</label>
                                    <input type='text' placeholder='Nome do filme' value={nome} onChange ={e => setNome(e.target.value)}/>
                                </div>
                                <div className='form-row'>
                                    <label>Avaliação:</label>
                                    <input type='number' placeholder='0' value={avaliacao} onChange={e => setAvaliacao(e.target.value)}/>
                                </div>
                                <div className='form-row'>
                                    <label>Lançamento:</label>
                                    <input type='date' value={lancamento} onChange ={e => setLancamento(e.target.value)}/>
                                </div>
                                <br />
                                <div className='form-row'>
                                    <label></label>
                                    <input type='checkbox' checked={disponivel} onChange={e => setDisponivel(e.target.checked)} /> &nbsp; Disponível
                                </div>
                            </div>
                            <div>
                                <div className='form-row' style={{alignItems: 'flex-start'}}>
                                    <label style={{marginTop: '13px'}}>Sinopse:</label>
                                    <textarea placeholder='Sinopse do filme' value={sinopse} onChange={e => setSinopse(e.target.value)}/>
                                </div>
                                <br />
                                <br />
                                <div className='form-row'>
                                    <label></label>
                                    <div className='btnSalvar'>
                                        <button onClick={salvarClick}>{id=== 0 ? 'SALVAR' : 'ALTERAR'}</button>  &nbsp; &nbsp;
                                        <button onClick={NovoFilme}>NOVO</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}

