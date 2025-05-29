import express from "express";
import {basket, deleteBasket, getBasket} from "../controllers/basketController.js";

const router = express.Router();

router.post("/basket", basket )
router.get("/basketGet",getBasket )
router.post("/basketDelete",deleteBasket )

export default router;