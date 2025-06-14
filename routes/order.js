// routes/orderRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import {
  createOrder,
  validateCardBin,
  deleteOrder,
  searchOrders,
  updateOrderStatus,
  // getAllOrders,
  // getOrderById,
  // updateOrder,
} from "../controllers/order.js";

const router = express.Router();

// Pass the JWT middleware so we can access the current user OR admin when creating the order
router.post("/", auth(["user", "admin"]), createOrder);
// For card validation
router.get("/validate-bin/:bin", validateCardBin);

router.delete("/delete/:id", auth(["admin"]), deleteOrder);

router.get("/search", auth(["user", "admin"]), searchOrders);

router.put("/status", auth(["user", "admin"]), updateOrderStatus);

// router.get('/', getAllOrders);
// router.get('/:id', getOrderById);
// router.put('/:id', updateOrder);
// router.delete('/:id', deleteOrder);

export default router;
