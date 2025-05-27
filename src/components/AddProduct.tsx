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
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
            onClick={onClose}>
            <div
                className="modal-content"
                style={{
                backgroundColor: '#fff',
                padding: 20,
                borderRadius: 8,
                minWidth: '300px',
                position: 'relative',
                }}
                onClick={e => e.stopPropagation()} // impedir fechar clicando dentro
            ></div>
            <div className="add-product">
                <h2>Adicionar produto:</h2>
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
                        <input type="file" name="front-img" id="prod-front-img" />
                    </div>
                    <div className="new-product-imgs">
                        <span>Outras imagens do produto:</span>
                        <input type="file" name="prod-imgs" id="prod-imgs" />
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
                        <input type="number" placeholder='Digite a quantidade em estoque do seu novo produto'/>
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