const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash });
    res.status(201).json({ message: 'Usuário registrado!', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Senha incorreta' });

    // Geração do token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      'a-string-secret-at-least-256-bits-long', //uma string secreta maluca
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login bem-sucedido!', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
