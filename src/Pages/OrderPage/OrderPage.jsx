import React, {useEffect, useState} from "react";
import Title from "../../components/Title/Title.jsx";
import Container from "../../components/Container/Container.jsx";
import FlexBox from "../../components/FlexBox/FlexBox.jsx";
import styles from "./OrderPage.module.scss";
import { useNavigate } from "react-router-dom";
import OrderItem from "../../components/OrderItem/OrderItem.jsx";
import axios from "axios";

export default function OrderPage() {
    const navigate = useNavigate();
    const [order, setOrder] = useState([]);

    useEffect(() => {
        const authUser = localStorage.getItem("name");
        if (authUser) {
            axios
                .post("http://localhost:5000/order", {userName: authUser})
                .then((res) => {
                    setOrder(res.data);
                })
                .catch((err) => {
                    console.error("Ошибка загрузки данных:", err);
                });
        }
    }, []);

    console.log(order.id)
    const cartItems = order.length > 0 ? JSON.parse(order[0].cartItem) : [];
    console.log(cartItems);


    function goBack() {
        navigate("/");
    }

    return (
        <div className={styles.order}>
            <Container>
                <button onClick={goBack} className={styles.back}>
                    <span className={styles.arrow}>‹</span>
                    Вернуться назад
                </button>
                <form className={styles.form}>
                    <FlexBox direction="flex-column" gap="20px">
                        <Title size="medium-big" weight="medium-bold" centerd="center">
                            Страница заказов
                        </Title>

                        {order.length > 0 && (
                            <>
                                <div>
                                    <span>Получатель: {order[0].nameUser}</span><br/>
                                    <span>Адрес получателя: {order[0].address}</span><br/>
                                    <span>Email: {order[0].email}</span>
                                </div>

                                <table className={styles.orderTable}>
                                    <thead className={styles.orderTableHead}>
                                    <tr className={styles.orderTableHeadRow}>
                                        <th className={styles.orderTh}>Наименование</th>
                                        <th className={styles.orderTh}>Цена</th>
                                        <th className={styles.orderTh}>Статус</th>
                                        <th className={styles.orderTh}></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cartItems.map((product, index) => (
                                        <OrderItem key={index}
                                                   productImage={product.productImage}
                                        productName={product.productName}
                                        productPrice={product.productPrice}/>
                                    ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </FlexBox>
                </form>
            </Container>
        </div>
    );
}