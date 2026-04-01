const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/',        protect, ctrl.placeOrder);
router.get('/myorders', protect, ctrl.getMyOrders);
router.get('/',         protect, adminOnly, ctrl.getAllOrders);
router.put('/:id',      protect, adminOnly, ctrl.updateOrderStatus);

module.exports = router;
