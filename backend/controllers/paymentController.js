const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order  = require('../models/Order');
const Cart   = require('../models/Cart');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'kes',
      metadata: { userId: req.user._id.toString() }
    });
    res.json({ clientSecret: intent.client_secret });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, shippingAddress } = req.body;
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: 'Cart is empty' });

    const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const order = await Order.create({
      user: req.user._id,
      items: cart.items,
      total,
      status: 'paid',
      paymentId: paymentIntentId,
      shippingAddress,
    });

    await Cart.findOneAndDelete({ user: req.user._id });
    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
