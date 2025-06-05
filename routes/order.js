// routes/orderRoutes.js
import express from 'express';
import auth from '../middleware/auth.js'
import {
  createOrder,
  getOrderById,
  validateCardBin,
  // getAllOrders,
  // getOrderById,
  // updateOrder,
  // deleteOrder
} from '../controllers/order.js';

const router = express.Router();

// Pass the JWT middleware so we can access the current user OR admin when creating the order
router.post('/', auth(["user", "admin"]), createOrder);
// View the order inside the admin page
router.get('/view/:id', getOrderById)
// For card validation
router.get("/validate-bin/:bin", validateCardBin);


// router.get('/', getAllOrders);
// router.get('/:id', getOrderById);
// router.put('/:id', updateOrder);
// router.delete('/:id', deleteOrder);

export default router;
