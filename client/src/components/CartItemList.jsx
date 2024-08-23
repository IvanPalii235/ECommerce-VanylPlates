import React, {useContext} from 'react';
import {Context} from "../index";
import CartItem from '../components/CartItem'
import {observer} from "mobx-react-lite";

const CartItemsList = () => {
    const {cart} = useContext(Context)

    return (
        <div>
            {cart.getItems.map(item =>
                <CartItem key={item._id} item={item}/>
            )}
        </div>
    );
};

export default observer(CartItemsList);