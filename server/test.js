import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2";
import bcrypt from "bcrypt";
dotenv.config();
const saltRounds = 10;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "authorization",
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
  }),
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

      if (!results || results.length === 0) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      const userData = results[0];
      const storedHash = userData.userPassword;

      bcrypt.compare(password, storedHash, (err, isMatch) => {
        if (err) {
          console.error("Ошибка при сравнении паролей:", err);
          return res.status(500).json({ error: "Ошибка сервера" });
        }

        if (isMatch) {
          console.log("Вход успешен");
          return res.status(200).json({
            message: "Данные получены успешно!",
            login,
          });
        } else {
          return res.status(401).json({ message: "Неверный логин или пароль" });
        }
      });
    },
  );
});

app.post("/r", (req, res) => {
  const { user, name, email, password, repeat } = req.body;

  if (!user || !password || !name || !email || !repeat) {
    return res.status(400).json({ message: "Поля не заполнены" });
  }

  if (password !== repeat) {
    return res.status(400).json({ message: "Пароли не совпадают" });
  }

  connection.query(
    "SELECT * FROM `authorData` WHERE `userLogin` = ?",
    [user],
    (error, results) => {
      if (error) {
        console.error("Ошибка при выполнении запроса:", error);
        return res.status(500).json({ error: "Ошибка сервера" });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "Пользователь уже существует" });
      }

      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
          console.error("Ошибка при хешировании:", err);
          return res.status(500).json({ error: "Ошибка шифрования" });
        }

        connection.query(
          "INSERT INTO authorData(userLogin, userPassword, userName, userEmail) VALUES (?, ?, ?, ?)",
          [user, hash, name, email],
          (error, results) => {
            if (error) {
              console.error("Ошибка при вставке:", error);
              return res.status(500).json({ error: "Ошибка сервера" });
            }
            return res
              .status(200)
              .json({ message: "Регистрация прошла успешно!" });
          },
        );
      });
    },
  );
});

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
    },
  );
});

app.post("/review", (req, res) => {
  const { id } = req.body;
  console.log("Получены данные:", id);
  connection.query(
    {
      sql: "SELECT * FROM `review` WHERE `idProduct` = ?",
      timeout: 5000,
    },
    [id],
    (error, results) => {
      if (error) {
        console.error("Ошибка при выполнении запроса:", error);
        return res.status(500).json({ error: "Ошибка сервера" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Отзыв не найден" });
      }

      res.json(results);
    },
  );
});

app.post("/reviewWrite", (req, res) => {
  const { name, cardId, value, description, reviewDate } = req.body;
  console.log("Получены данные для отзывов:", req.body);

  if (value == 0) {
    return res.status(200).json({ message: "Ошибка" });
  }

  connection.query(
    "INSERT INTO review(nameUser, idProduct, raiting, reviewDescription, rewiewDate) VALUES (?, ?, ?, ?, ?)",
    [name, cardId, value, description, reviewDate],
    (error, results) => {
      if (error) {
        console.error("Ошибка при выполнении запроса:", error);
        return res.status(500).json({ error: "Ошибка сервера" });
      }
      return res.status(200).json({ message: "Данные получены успешно!" });
    },
  );
});

app.post("/order", (req, res) => {
  const {
    user,
    nameUser,
    userSurname,
    email,
    address,
    creditCardNumber,
    cartItem,
  } = req.body;
  console.log("Получены данные для заказа:", req.body);

  connection.query(
    "INSERT INTO orders(userNickname, nameUser,userSurname, email, address, creditCardNumber, cartItem) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [user, nameUser, userSurname, email, address, creditCardNumber, cartItem],
    (error, results) => {
      if (error) {
        console.error("Ошибка при выполнении запроса:", error);
        return res.status(500).json({ error: "Ошибка сервера" });
      }
      return res.status(200).json({ message: "Данные получены успешно!" });
    },
  );
});

app.post("/basket", async (req, res) => {
  const { authName, items } = req.body;
  const userName = authName;
  console.log("Получены данные для корзины:", req.body);

  try {
    const queries = items.map((item) => {
      const {
        productId,
        productImage,
        productName,
        productPrice,
        productQuantity,
      } = item;

      let totalPrice = parseInt(productPrice) * parseInt(productQuantity);

      return new Promise((resolve, reject) => {
        connection.query(
          `INSERT INTO basket (
          userName, productId, productImage, productName,
          productPrice, productQuantity, productTotalPrice
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            userName,
            productId,
            productImage,
            productName,
            totalPrice,
            productQuantity,
            totalPrice,
          ],
          (error, results) => {
            if (error) {
              console.error("Ошибка при выполнении запроса:", error);
              reject("Ошибка сервера");
            } else {
              resolve();
            }
          },
        );
      });
    });

    await Promise.all(queries);
    res.json({ message: "Данные получены успешно!" });
  } catch (error) {
    console.error("Ошибка при обработке запроса:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.get("/basketGet", (req, res) => {
  const { userName } = req.query;
  console.log("Получены данные:", userName);
  connection.query(
    {
      sql: "SELECT *, (SELECT SUM(productTotalPrice) FROM basket WHERE userName = ?) AS totalSum FROM basket WHERE userName = ?",
      timeout: 5000,
    },
    [userName, userName],
    (error, results) => {
      if (error) {
        console.error("Ошибка при выполнении запроса:", error);
        return res.status(500).json({ error: "Ошибка сервера" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Товар не найден" });
      }

      res.json(results);
    },
  );
});

app.post("/deleteBasket", (req, res) => {
  const { userName, id } = req.body;
  console.log("Получены данные для удаления:", req.body);

  connection.query(
    "DELETE FROM basket WHERE userName = ? AND id = ?",
    [userName, id],
    (error, results) => {
      if (error) {
        console.error("Ошибка при выполнении запроса:", error);
        return res.status(500).json({ error: "Ошибка сервера" });
      }
      return res.status(200).json({ message: "Данные получены успешно!" });
    },
  );
});

app.get("/", (req, res) => {
  res.send("Сервер test работает!");
});

app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});
