import { useState } from 'react';

interface ModalCadastroProps {
    onClose: () => void;
}
  
  const modalCadastro: React.FC<ModalCadastroProps> = ({ onClose }) => {    
    return(
        <div
            className="modal-overlay"
            style={{
                position: 'fixed',
                top: '10%', left: '33.333%', right: '33.333%', bottom: 0,
                backgroundColor: 'rgb(255, 255, 255)',
                boxShadow: '0px 0px 4000px rgba(0,0,0,0.2)',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                height: '89%',
                width: '33.333%',
            }}
            onClick={onClose}>
            <div className="add-product">
                <h2>Adicionar produto</h2>
                <form action="submit" method="post">
                    <div className="new-prod-name">
                        <span>Nome:</span>
                        <input type="text" placeholder='Digite o nome do seu novo produto'/>
                    </div>
                    <div className="new-prod-desc">
                        <span>Descrição:</span>
                        <input type="text" placeholder='Digite a descrição do seu novo produto' />
                    </div>
                    <div className="new-prod-front-img">
                        <span>Imagem principal do produto:</span>
                        <input className="input-image" type="file" name="front-img" id="prod-front-img" />
                    </div>
                    <div className="new-product-imgs">
                        <span>Outras imagens do produto:</span>
                        <input className="input-image" type="file" name="prod-imgs" id="prod-imgs" />
                    </div>
                    <div className="new-prod-category">
                        <span>Categoria:</span>
                        <select className="select-category">
                            <option value="1">categoria 1</option>
                            <option value="2">categoria 2</option>
                            <option value="3">categoria 3</option>
                            <option value="4">categoria 4</option>
                            <option value="5">categoria 5</option>
                        </select>
                    </div>
                    <div className="new-prod-price">
                        <span>Preço:</span>
                        <input type="number" placeholder='Digite o valor do seu novo produto'/>
                    </div>
                    <div className="new-prod-stock">
                        <span>Estoque</span>
                        <input type="number" placeholder='Digite a quantidade em estoque'/>
                    </div>
                    <div className="new-prod-tags">
                        <span>Palavras-Chave</span>
                        <input type="text" placeholder='Digite as palavras-chave do seu novo produto'/>
                    </div>
                    <button type='submit' className=''>Adicionar Produto</button>
                </form>
            </div>
        </div>
    );
};

export default modalCadastro;