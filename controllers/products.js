const Product = require('../schemas/products');
const Inventory = require('../schemas/inventory');

// Create product and inventory
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    // Create inventory
    const inventory = new Inventory({
      product: product._id,
      stock: 0,
      reserved: 0,
      soldCount: 0
    });
    await inventory.save();

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Other product methods can be added here