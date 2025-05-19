import React from 'react';
import styles from './OrderPage.module.scss'
import Container from '../../components/Container/Container';
import FlexBox from '../../components/FlexBox/FlexBox';
import Title from '../../components/Title/Title';

export default function OrderPage() {
    return (
        <div className={styles.orderPage}>
            <Container>
                <form className={styles.form}>
                    <FlexBox direction="flex-column" gap="20px">
                        <Title size="medium-big" weight="medium-bold" centerd="center">
                            Страница заказов
                        </Title>
                        <div className={styles.orderContainer}>
                            <table>
                                <thead>
                                <tr>
                                    <th>Наименование</th>
                                    <th>Цена</th>
                                    <th>Статус</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Наушники Sony WH-1000XM5</td>
                                    <td>34 990 ₽</td>
                                    <td>В обработке</td>
                                    <td>
                                        <button>Отменить заказ</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Клавиатура Keychron K2</td>
                                    <td>8 490 ₽</td>
                                    <td>Доставлен</td>
                                    <td>
                                        <button>Отменить заказ</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </FlexBox>
                </form>
            </Container>
        </div>
    );
}


