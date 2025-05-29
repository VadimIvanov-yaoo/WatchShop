import connection from "../db/connection.js";

export const basket = async (req, res) => {
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

            const price = parseInt(productPrice);
            const quantity = parseInt(productQuantity);
            const totalPrice = price * quantity;

            return new Promise((resolve, reject) => {
                connection.query(
                    `SELECT * FROM basket WHERE userName = ? AND productId = ?`,
                    [userName, productId],
                    (selectError, selectResults) => {
                        if (selectError) {
                            console.error("Ошибка при SELECT:", selectError);
                            return reject("Ошибка при проверке товара");
                        }

                        if (selectResults.length > 0) {
                            const existing = selectResults[0];
                            const newQuantity = existing.productQuantity + quantity;
                            const newTotalPrice = price * newQuantity;

                            connection.query(
                                `UPDATE basket SET productQuantity = ?, productTotalPrice = ? WHERE userName = ? AND productId = ?`,
                                [newQuantity, newTotalPrice, userName, productId],
                                (updateError) => {
                                    if (updateError) {
                                        console.error("Ошибка при UPDATE:", updateError);
                                        return reject("Ошибка при обновлении товара");
                                    }
                                    resolve();
                                }
                            );
                        } else {
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
                                    price,
                                    quantity,
                                    totalPrice,
                                ],
                                (insertError) => {
                                    if (insertError) {
                                        console.error("Ошибка при INSERT:", insertError);
                                        return reject("Ошибка при добавлении товара");
                                    }
                                    resolve();
                                }
                            );
                        }
                    }
                );
            });
        });

        await Promise.all(queries);
        res.json({ message: "Данные получены успешно!" });

    } catch (error) {
        console.error("Ошибка при обработке запроса:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};


export const getBasket =  (req, res) => {
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
};

export const deleteBasket =  (req, res) => {
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
};

