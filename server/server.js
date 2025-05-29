import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import basketRoutes from "./routes/basketRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"] }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/basket", basketRoutes);
app.use("/review", reviewRoutes);

app.get("/", (req, res) => {
    res.send("Сервер работает!");
});

app.listen(PORT, () => {
    console.log(`Сервер работает на порту ${PORT}`);
});
