import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2";
dotenv.config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "productlist",
  password: "root",
});

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

connection.connect(function (err) {
  if (err) {
    return console.error("Ошибка: " + err.message);
  } else {
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

app.post("/item", (req, res) => {
  const { id } = req.body;
  console.log("Получены данные:", id);
  connection.query(
    {
      sql: "SELECT * FROM `product` WHERE `id` = ?",
      timeout: 5000,
    },
    [id],
    (error, results) => {
      if (error) {
        console.error("Ошибка при выполнении запроса:", error);
        return res.status(500).json({ error: "Ошибка сервера" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Товар не найден" });
      }

      res.json(results[0]);
    }
  );
});

app.get("/", (req, res) => {
  res.send("Сервер test работает!");
});

app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});
