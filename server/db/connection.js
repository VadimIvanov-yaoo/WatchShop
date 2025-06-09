import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config();

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "authorization",
//     password: "root",
// });

const connection = mysql.createConnection({
  host: "switchback.proxy.rlwy.net",
  port: 32894,
  user: "root",
  password: "RFgsPHuyosrVusrvnbiFTVzkXDnZSQos",
  database: "railway",
  ssl: {
    rejectUnauthorized: false,
  },
});

// const app = express();
// app.use(express.json());
// const PORT = process.env.PORT || 5000;
connection.connect(function (err) {
  if (err) {
    return console.error("Ошибка: " + err.message);
  } else {
    console.log("Подключение к серверу MySQL успешно установлено");
  }
});

export default connection;
