import express from "express";
import {product, productItem, updateProduct} from "../controllers/productController.js";

const router = express.Router();

router.get("/getProduct", product);
router.post("/item", productItem);
router.post("/updateItem", updateProduct);

export default router;
