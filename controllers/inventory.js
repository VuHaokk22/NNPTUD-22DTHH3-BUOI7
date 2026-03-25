const Inventory = require('../schemas/inventory');
const Product = require('../schemas/products'); // Giả sử schema product là products.js

// Get all inventories with product join
exports.getAllInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find().populate('product');
    res.json(inventories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get inventory by ID with product join
exports.getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id).populate('product');
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add stock
exports.addStock = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be positive' });
    }
    const inventory = await Inventory.findOneAndUpdate(
      { product },
      { $inc: { stock: quantity } },
      { new: true, upsert: true }
    ).populate('product');
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove stock
exports.removeStock = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be positive' });
    }
    const inventory = await Inventory.findOne({ product });
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    if (inventory.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    inventory.stock -= quantity;
    await inventory.save();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reservation
exports.reservation = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be positive' });
    }
    const inventory = await Inventory.findOne({ product });
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    if (inventory.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }
    inventory.stock -= quantity;
    inventory.reserved += quantity;
    await inventory.save();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Sold
exports.sold = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be positive' });
    }
    const inventory = await Inventory.findOne({ product });
    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }
    if (inventory.reserved < quantity) {
      return res.status(400).json({ message: 'Insufficient reserved stock' });
    }
    inventory.reserved -= quantity;
    inventory.soldCount += quantity;
    await inventory.save();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};