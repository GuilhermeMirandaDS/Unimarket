const Product = require('../models/Product');

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
    res.status(500).json({ error: err.message });
  }
};

exports.getProductList = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { userId: req.user.id },
      attributes: ['id', 'nome', 'descricao', 'imagemUrl', 'categoria', 'price', 'stock', 'userId', 'tags']
    });

    if (!products) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(products);
  } catch (err){
    res.status(500).json({ error: err.message });
  }
};
