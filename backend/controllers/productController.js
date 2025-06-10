const { Product } = require('../models');
const { User } = require('../models');

exports.addProduct = async (req, res) => {
  const { nome, descricao, imagemUrl, categoria, price, stock, userId, tags } = req.body;
  try {
    const product = await Product.create({ nome, descricao, imagemUrl, categoria, price, stock, userId, tags });
    res.status(201).json(product);
  } catch (err) {
    console.error('Erro ao adicionar produto:', err);
    res.status(400).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error("Erro no getAllProducts:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const product = await Product.findByPk(id, {
      include: {
        model: User,
        as: 'seller',
        attributes: ['id', 'name', 'tag', 'urlImg']
      }
    });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (err) {
    console.error('Erro no getProductById:', err);
    res.status(500).json({ error: err.message });
  }
};
