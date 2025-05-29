import express from "express";
import { productItem, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/item", productItem);
router.post("/updateItem", updateProduct);

export default router;
