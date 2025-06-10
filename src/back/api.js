const API_URL = 'http://localhost:3000/api';

const tagMap = {
  1: 'Vendedor',
  2: 'Aluno',
  3: 'Funcionário',
};

export async function getUserInfoById(userId) {
  try {
    const res = await fetch(`${API_URL}/users/${userId}`);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Erro ao buscar usuário');
    }

    const user = await res.json();

    return {
      id: user.id,
      name: user.name,
      urlImg: user.urlImg,
      tagNumber: user.tag,
      tag: tagMap[user.tag] || 'Desconhecido',
    };
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    return null;
  }
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function register(userData) {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  const data = await res.json();
  return data;
}

export async function fetchUser(token) {

  const res = await fetch(`${API_URL}/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Erro bruto do backend:", text);
    throw new Error('Erro ao buscar usuário');
  }

  return res.json();
}

export async function getAllProducts() {
  try {
    const res = await fetch(`${API_URL}/productList`);
    
    if (!res.ok) {
      const errorData = await res.json();
      return { ok: false, error: errorData.message || 'Erro ao buscar produtos' };
    }

    const data = await res.json();
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: error.message || 'Erro de conexão' };
  }
}

export const getProductById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Erro ao buscar produto');
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: String(error) };
  }
};


export async function addProduct(productData, token) {
  try{
    const res = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(productData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { ok: false, error: errorData.message || 'Erro no servidor' };
    }

    const data = await res.json();
    return { ok: true, data };
  }catch{
    return { ok: false, error: error.message || 'Erro de conexão' };
  }
  
  return res.json();
}
