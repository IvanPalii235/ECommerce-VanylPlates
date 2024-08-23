import React, {useContext} from 'react';
import CartService from "../services/CartService";
import {Button} from "react-bootstrap";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {CART_ROUTE} from "../utils/consts";
import {toJS} from "mobx";

const AddToCart = ({productId}) => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const addToCart = async () => {
        console.log(toJS(user.getUser))
        await CartService.addProduct(toJS(user.getUser)._id, productId)

        navigate(CART_ROUTE)
    }

    return (
        <Button variant="dark" onClick={() => addToCart()}>Buy</Button>
    );
};

export default AddToCart;