import connection from "../db/connection.js";

export const productItem = (req, res) => {
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
};

export const updateProduct = (req, res) => {
    const { id } = req.body;
    console.log("Получены данные:", id);

    connection.query(
        {
            sql: "UPDATE `product` SET quantity = quantity - 1 WHERE id = ?",
            timeout: 5000,
        },
        [id],
        (error, results) => {
            if (error) {
                console.error("Ошибка при выполнении запроса:", error);
                return res.status(500).json({ message: "Ошибка" });
            }

            if (results.affectedRows > 0) {
                res.json({ message: "Данные получены успешно!" });
            } else {
                res.status(404).json({ message: "Товар с таким ID не найден" });
            }
        }
    );
};