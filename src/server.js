const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./models');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', authRoutes);

sequelize.sync().then(() => {
  console.log('Banco sincronizado');
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}).catch(err => {
  console.error('Erro ao conectar com o banco:', err);
});