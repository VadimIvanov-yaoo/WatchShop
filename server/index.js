import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2";
dotenv.config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "authorization",
  password: "root",
});

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

app.post("/login", function (req, res) {
  const { login, password } = req.body;
  connection.query(
    "SELECT * FROM authorData",
    [login, password],
    function (err, data) {
      if (err) {
        return res
          .status(500)
          .json({ message: "Ошибка при запросе к базе данных" });
      }
    }
  );
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Привет от сервера!" });
});

app.get("/", (req, res) => {
  res.send("Сервер работает!");
});

app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});
