import React, {useContext} from 'react';
import {Button} from "react-bootstrap";
import ProductService from "../services/ProductService";
import {Context} from "../index";
import {toJS} from "mobx";
import {useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, SHOP_ROUTE} from "../utils/consts";

const DeleteButton = ({product}) => {
    const {user} = useContext(Context)

    const navigate = useNavigate()

    const deleteFromCart = () => {
        if (user.getRole !== 'ADMIN' )
            return alert('Your account isn`t admin account!')
        ProductService.deleteOneProduct(product).then(response => {
           navigate(SHOP_ROUTE)
        })
    }

    return (
        <Button variant="danger" size='sm' onClick={deleteFromCart}>
            Delete
        </Button>
    );
};

export default DeleteButton;