import connection from "../db/connection.js";

export const placeOrder = (req, res) => {
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
        "INSERT INTO orders(user, nameUser, userSurname, email, address, creditCardNumber) VALUES (?, ?, ?, ?, ?, ?)",
        [user, nameUser, userSurname, email, address, creditCardNumber],
        (error, results) => {
            if (error) {
                console.error("Ошибка при вставке заказа:", error);
                return res.status(500).json({ error: "Ошибка сервера" });
            }

            const orderId = results.insertId;
            const items =
                typeof cartItem === "string" ? JSON.parse(cartItem) : cartItem;

            const insertItems = items.map((item) => {
                return new Promise((resolve, reject) => {
                    connection.query(
                        `INSERT INTO order_items(
              order_id, userName, productId, productName, 
              productPrice, productQuantity, productTotalPrice, productImage
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                        [
                            orderId,
                            user,
                            item.productId,
                            item.productName,
                            item.productPrice,
                            item.productQuantity,
                            item.productTotalPrice,
                            item.productImage,
                        ],
                        (err) => {
                            if (err) return reject(err);
                            resolve();
                        }
                    );
                });
            });

            Promise.all(insertItems)
                .then(() => {
                    res.status(200).json({ message: "Заказ успешно оформлен!" });
                })
                .catch((err) => {
                    console.error("Ошибка при вставке товаров:", err);
                    res.status(500).json({ error: "Ошибка при добавлении товаров" });
                });
        }
    );
};

export const order = (req, res) => {
    const { userName } = req.body;

    if (!userName) {
        return res.status(400).json({ error: "Не указано имя пользователя" });
    }

    console.log("Получены данные:", userName);

    const getOrdersQuery = "SELECT * FROM `orders` WHERE `user` = ?";
    const getOrderItemsQuery = "SELECT * FROM `order_items` WHERE `userName` = ?";

    connection.query(getOrdersQuery, [userName], (ordersErr, ordersResults) => {
        if (ordersErr) {
            console.error("Ошибка при получении заказов:", ordersErr);
            return res
                .status(500)
                .json({ error: "Ошибка сервера при получении заказов" });
        }

        if (ordersResults.length === 0) {
            return res.status(404).json({ message: "Заказов не найдено" });
        }

        connection.query(
            getOrderItemsQuery,
            [userName],
            (itemsErr, itemsResults) => {
                if (itemsErr) {
                    console.error("Ошибка при получении товаров:", itemsErr);
                    return res
                        .status(500)
                        .json({ error: "Ошибка сервера при получении товаров" });
                }

                return res.status(200).json({
                    orders: ordersResults,
                    items: itemsResults,
                });
            },
        );
    });
};

export const orderDelete = (req, res) => {
    const { userName, id } = req.body;
    console.log("Получены данные для удаления:", req.body);

    const deleteOrderItemsQuery = "DELETE FROM order_items WHERE order_id = ?";
    const deleteOrdersQuery = "DELETE FROM orders WHERE user = ? AND id = ?";
    connection.query(deleteOrderItemsQuery, [id], (itemsErr, itemsResults) => {
        if (itemsErr) {
            console.error("Ошибка при удалении товаров из заказа:", itemsErr);
            return res
                .status(500)
                .json({ error: "Ошибка сервера при удалении товаров из заказа" });
        }

        connection.query(deleteOrdersQuery, [userName, id], (ordersErr, ordersResults) => {
            if (ordersErr) {
                console.error("Ошибка при удалении заказа:", ordersErr);
                return res
                    .status(500)
                    .json({ error: "Ошибка сервера при удалении заказа" });
            }

            if (ordersResults.affectedRows === 0) {
                return res.status(404).json({ message: "Заказ не найден" });
            }

            return res.status(200).json({
                message: "Заказ и его товары успешно удалены",
                deletedItems: itemsResults.affectedRows,
                deletedOrder: ordersResults.affectedRows,
            });
        });
    });
};
