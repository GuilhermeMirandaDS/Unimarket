import { useState, useEffect } from 'react';
import { addProduct } from '@/back/api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface ModalCadastroProps {
    onClose: () => void;
}
  
  const modalCadastro: React.FC<ModalCadastroProps> = ({ onClose }) => {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagemUrl, setImagemUrl] = useState('');
    const [categoria, setCategoria] = useState('');
    const [price, setPreco] = useState('');
    const [stock, setEstoque] = useState('');
    const [tags, setTags] = useState('');

    const token = localStorage.getItem('token');
    let userId;
    if(token){
        const decoded = jwtDecode(token);
        userId = decoded.id;
        userId = Number(decoded.id || decoded.sub || 0);
    }

    
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [navigate, token]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const produto = {
            nome,
            descricao,
            imagemUrl,
            categoria: Number(categoria),
            price: Number(price),
            stock: Number(stock),
            userId,
            tags,
        };
        console.log(produto);
        
        const result = await addProduct( produto, token);
        console.log(result);

        if (result.ok) {
            console.log('Produto cadastrado!');
            onClose();
        } else {
            console.error('Erro ao cadastrar produto');
        }
    };

    return(
        <div
            className="modal-overlay"
            style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                height: '100%',
                width: '100%',
            }}
            onClick={onClose}
        >
            
            <div className="add-product" onClick={(e) => e.stopPropagation()}>
                <h2>Adicionar produto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="new-prod-name">
                        <span>Nome:</span>
                        <input type="text" placeholder='Digite o nome do seu novo produto' value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </div>
                    <div className="new-prod-desc">
                        <span>Descrição:</span>
                        <input type="text" placeholder='Digite a descrição do seu novo produto' value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
                    </div>
                    <div className="new-prod-front-img">
                        <span>Link da Imagem principal do produto:</span>
                        <input type="text" value={imagemUrl} onChange={(e) => setImagemUrl(e.target.value)} placeholder='Cole o link da imagem do seu produto'/>
                    </div>
                    <div className="new-prod-category">
                        <span>Categoria:</span>
                        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                            <option value={1}>Apostila</option>
                            <option value={2}>Doces</option>
                            <option value={3}>Roupas</option>
                            <option value={4}>Livros</option>
                            <option value={5}>Comida</option>
                            <option value={6}>Eletrônicos</option>
                            <option value={7}>Atlética</option>
                        </select>
                    </div>
                    <div className="new-prod-price">
                        <span>Preço:</span>
                        <input type="number" placeholder='Digite o valor do seu novo produto' value={price} onChange={(e) => setPreco(e.target.value)}/>
                    </div>
                    <div className="new-prod-stock">
                        <span>Estoque</span>
                        <input type="number" placeholder='Digite a quantidade em estoque' value={stock} onChange={(e) => setEstoque(e.target.value)}/>
                    </div>
                    <div className="new-prod-tags">
                        <span>Palavras-Chave</span>
                        <input type="text" placeholder='Digite as palavras-chave do seu novo produto' value={tags} onChange={(e) => setTags(e.target.value)}/>
                    </div>
                    <button type='submit' className='add-product-btn'>Adicionar Produto</button>
                </form>
            </div>
        </div>
    );
};

export default modalCadastro;