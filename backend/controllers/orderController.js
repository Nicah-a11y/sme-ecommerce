const Order = require('../models/Order');
const Cart  = require('../models/Cart');

exports.placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: 'Cart is empty' });

    const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await Order.create({
      user:            req.user._id,
      items:           cart.items,
      total,
      shippingAddress: req.body.shippingAddress,
    });

    await Cart.findOneAndDelete({ user: req.user._id });
    res.status(201).json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('items.product');
    res.json(orders);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
