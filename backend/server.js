require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./models');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: '*'
}));

app.use('/api', authRoutes);
app.use('/api', productRoutes);

app.post('/api/register', (req, res) => {
  console.log(req.body);
  res.json({ message: 'Usuário registrado com sucesso!' });
});

db.sequelize.sync().then(() => {
  console.log('Banco sincronizado');
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
  });
}).catch(err => {
  console.error('Erro ao conectar com o banco:', err);
});
