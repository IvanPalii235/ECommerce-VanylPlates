import React, {useContext} from 'react';
import {Col} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import CartService from "../services/CartService";
import {Context} from "../index";

const CartError = ({item}) => {
    const {user} = useContext(Context)
    const {cart} = useContext(Context)
    const deleteFromCart = async () => {
        const {data} =  await CartService.deleteProduct(user.getUser.user.id, item.tovarId)
        cart.setTotal(data.subTotal)
        cart.setCartItems(data.items)
    }

    return (
        <Row className="d-flex justify-content-between pl-3 pr-3">
            <Col md={6} className="d-flex justify-content-between  m-2">
                <div className="d-flex ">This item doesn't exist</div>
            </Col>
            <Col>
                <Button size='sm' variant="outline-success" className={'m-2'} onClick={deleteFromCart}>Delete</Button>
            </Col>
        </Row>
    );
};

export default CartError;