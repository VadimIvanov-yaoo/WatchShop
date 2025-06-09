import express from "express";
import {
  placeOrder,
  order,
  orderDelete,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/OrderPlacement", placeOrder);
router.post("/order", order);
router.post("/orderDelete", orderDelete);

export default router;
