import connection from "../db/connection.js";


export const review = (req, res) => {
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
};

export const addRewiew = (req, res) => {
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
};