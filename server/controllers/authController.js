import connection from "../db/connection.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const login = (req, res) => {
    const { login, password } = req.body;
    connection.query(
        "SELECT * FROM authordata WHERE userLogin = ?",
        [login],
        (error, results) => {
            if (error) return res.status(500).json({ error: "Ошибка сервера" });
            if (results.length === 0) return res.status(400).json({ message: "Пользователь не найден" });

            const user = results[0];
            bcrypt.compare(password, user.userPassword, (err, isMatch) => {
                if (err) return res.status(500).json({ error: "Ошибка сервера" });
                if (!isMatch) return res.status(401).json({ message: "Неверный логин или пароль" });

                res.status(200).json({ message: "Успешный вход", login });
            });

        }
    );
};

export const register = (req, res) => {
    const { user, name, email, password, repeat } = req.body;

    if (!user || !name || !email || !password || password !== repeat) {
        return res.status(400).json({ message: "Неверные данные" });
    }

    if(password !== repeat){
        res.status(422).json({message: "Пароли не совпадают"})
    }

    connection.query(
        "SELECT * FROM authordata WHERE userLogin = ?",
        [user],
        (error, results) => {
            if (results.length > 0) return res.status(401).json({ message: "Пользователь уже существует" });

            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) return res.status(500).json({ error: "Ошибка сервера" });

                connection.query(
                    "INSERT INTO authordata(userLogin, userPassword, userName, userEmail) VALUES (?, ?, ?, ?)",
                    [user, hash, name, email],
                    (err) => {
                        if (err) return res.status(500).json({ error: "Ошибка сервера" });
                        res.status(200).json({ message: "Регистрация успешна" });
                    }
                );
            });
        }
    );
};
