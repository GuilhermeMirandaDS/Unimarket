const API_URL = 'http://localhost:3000/api';

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
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error('Erro ao buscar usuário');

  return res.json();
}

export async function getAllProducts(token) {
  try {
    const res = await fetch(`${API_URL}/productList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
