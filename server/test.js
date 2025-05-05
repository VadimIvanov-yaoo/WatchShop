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

const connectionProduct = mysql.createConnection({
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

app.post("/l", (req, res) => {
  const { login, password } = req.body;
  console.log("Получены данные:", login, password);
  connection.query(
    {
      sql: "SELECT * FROM `authorData` WHERE `userLogin` = ?",
      timeout: 5000,
    },
    [login],
    (error, results) => {
      if (error) {
        console.error("Ошибка при выполнении запроса:", error);
        return res.status(500).json({ error: "Ошибка сервера" });
      }

      if (results && results.length > 0) {
        const userData = results[0];
        const userRes = userData.userLogin;
        const passwordRes = userData.userPassword;

        if (!userRes) {
          return res.status(400).json({ message: "Пользователь не найден" });
        }
        if (userRes == login && passwordRes == password) {
          console.log("Вход успешен");
          res.json({
            message: "Данные получены успешно!",
            login,
            password,
            results,
          });
        } else {
          return res.status(401).json({
            message: "Неверный логин или пароль",
          });
        }
      } else {
        return res.status(400).json({ message: "Пользователь не найден" });
      }
    }
  );
});

app.post("/r", (req, res) => {
  const { user, password, repeat } = req.body;
  console.log("Получены данные для регистрации:", req.body);
  connection.query(
    {
      sql: "SELECT * FROM `authorData` WHERE `userLogin` = ?",
      timeout: 5000,
    },
    [user],
    (error, results) => {
      if (error) {
        console.error("Ошибка при выполнении запроса:", error);
        return res.status(500).json({ error: "Ошибка сервера" });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "Пользователь уже существует" });
      }
      if (!user || !password || !repeat) {
        return res.status(400).json({ message: "Поля не заполнены" });
      }

      if (password != repeat) {
        return res.status(400).json({ message: "Пароли не совпадают" });
      }

      connection.query(
        "INSERT INTO authorData(userLogin, userPassword) VALUES (?, ?)",
        [user, password],
        (error, results) => {
          if (error) {
            console.error("Ошибка при выполнении запроса:", error);
            return res.status(500).json({ error: "Ошибка сервера" });
          }

          return res.status(200).json({ message: "Данные получены успешно!" });
        }
      );
    }
  );
});

app.post("/item", (req, res) => {
  const { id } = req.body;
  console.log("Получены данные:", id);
  connectionProduct.query(
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
