import Menu from '../../components/menu'
import Cabecalho from '../../components/cabecalho'

import './index.scss'


export default function Index() {
    return (
        <main className='page page-consultar'>
            <Menu />
            <div className='container'>
                <Cabecalho />
                
                <div className='conteudo'>

                    <div className='caixa-busca'>
                        <input type="text" placeholder='Buscar filmes por nome' />
                        <img src='/assets/images/icon-buscar.svg' alt='buscar' />
                    </div>
                    


                    <div className='card-container'>


                        <div className='comp-card'>
                            <div className='card'>
                                <div className='acoes'>

                                    <img src='/assets/images/icon-editar.svg' alt='editar' />
                                    
                                    <img src='/assets/images/icon-remover.svg' alt='remover' />
                                    
                                </div>
                                <div>
                                    <div className='sigla'>H</div>
                                    <div className='filme'>Harry Potter e a Pedra Filosofal </div>
                                    <div className='lancamento'>Maio/2002</div>
                                </div>
                                <div>
                                    <div className='avaliacao'>Avaliação: 8,0</div>
                                    <div className='disponivel'>Disponível</div>
                                </div>
                            </div>
                        </div>

                        
                        
                    </div>


                    
                </div>
            </div>
        </main>
    )
}

