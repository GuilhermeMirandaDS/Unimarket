import React from 'react';
import styles from './login.module.css';

function MeuComponente() {
  return (
    <body>
        <div class="{styles.container}">
            <div class="{styles.slogan}">
                <div class="{styles.titulo}">
                    <h1>Faça login para navegar</h1>
                    <h1>pelo</h1>
                    <h1 class="{styles.unimarket}">Unimarket</h1>
                </div>
                <div class="{styles.subtext}">
                    <p>Não possui uma conta?</p>
                    <a class="{styles.signin-link}" href="#">Registre-se aqui.</a>
                </div>
            </div>
            <div class="{styles.login-form}">
              <div class="{styles.trocar-aba}">
                <button class="{styles.aba-login} {styles.active}">Login</button>
                <button class="{styles.aba-cadastro}">Cadatre-se</button>
              </div>
                <form class="{styles.signin}" id="registerForm">
                  <div class="{styles.form-input}">
                    <p>RA</p>
                    <input name="username" placeholder="Digite seu RA" required>
                  </div>
                  <div class="{styles.form-input}">
                    <p>Senha</p>
                    <input name="password" placeholder="Digite sua Senha" type="password" required>
                  </div>
                  <button type="submit">Cadastrar-se</button>
                </form>
              
                <form class="{styles.login}" id="loginForm">
                  <div class="{styles.form-input}">
                    <p>RA</p>
                    <input name="username" placeholder="Digite seu RA" required>
                  </div>
                  <div class="{styles.form-input}">
                    <p>Senha</p>
                    <input name="password" placeholder="Digite sua Senha" type="password" required>
                  </div>
                  <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    </body>
  );
}

document.getElementById('registerForm').addEventListener('submit', async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  alert(JSON.stringify(result));
});

document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const result = await res.json();

  if (result.token) {
    alert(`Login bem-sucedido!\n\nToken JWT:\n${result.token}`);
    console.log("Token JWT:", result.token); // pra ver no console
  } else {
    alert(result.message || "Algo deu errado no login.");
  }

});
document.querySelector('.aba-login').addEventListener('click', () => {
  document.querySelector('.login').style.display = 'flex';
  document.querySelector('.signin').style.display = 'none';
  document.querySelector('.aba-login').classList.add('active');
  document.querySelector('.aba-cadastro').classList.remove('active');
});
document.querySelector('.aba-cadastro').addEventListener('click', () => {
  document.querySelector('.signin').style.display = 'flex';
  document.querySelector('.login').style.display = 'none';
  document.querySelector('.aba-cadastro').classList.add('active');
  document.querySelector('.aba-login').classList.remove('active');
});
document.querySelector('.signin-link').addEventListener('click', () => {
  document.querySelector('.signin').style.display = 'flex';
  document.querySelector('.login').style.display = 'none';
  document.querySelector('.aba-cadastro').classList.add('active');
  document.querySelector('.aba-login').classList.remove('active');
});

document.querySelector('.aba-login').click();

export default MeuComponente;