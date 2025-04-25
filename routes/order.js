// routes/orderRoutes.js
import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from '../controllers/order.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
