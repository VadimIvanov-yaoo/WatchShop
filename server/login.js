import mysql from "mysql2";
import express from "express";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "authorization",
  password: "root",
});

const app = express();
const PORT = 5000;

connection.connect(function (err) {
  if (err) {
    return console.error("Ошибка: " + err.message);
  } else {
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});

// const user = ["user342", "mypassword234"];
// const sql = "INSERT INTO authorData(userLogin, userPassword) VALUES(?, ?)";

connection.query(sql, user, function (err, results) {
  if (err) console.log(err);
  else console.log("Данные добавлены");
});

app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}`);
});

// connection.end();
