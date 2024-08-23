import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Form, Modal, Row, Spinner} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {Context} from "../index";
import CartItemsList from "../components/CartItemList";
import CartService from "../services/CartService";
import OrderService from "../services/OrderService"
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";

const Cart = () => {
    const {cart} = useContext(Context)
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true);
    const [isSending, setIsSending] = useState(false)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const createOrder = () => {
        OrderService.createOrder().then(() => {
                setIsSending(!isSending)
            })
    }

    useEffect(() => {
        CartService.getProduct(toJS(user.getUser)._id).then(response => {
            cart.setId(response.data.productId)
            cart.setTotal(response.data.subTotal)
            cart.setCartItems(response.data.items)
            setLoading(false);
        })
    },[isSending])

    if (loading) {
        return <Spinner animation={'grow'}/>
    }

    return (
        <Container className="mt-3 d-flex pl-3 pr-3 d-flex justify-content-between">
            <Card style={{width: 600, background: "ghostwhite", border: "1px solid grey"}} className="p-4 mt-3">
                <h3>Cart</h3>
                <CartItemsList/>
            </Card>
            <Card style={{width: 350, height: 150, background: "ghostwhite", border: "1px solid black"}} className="p-4 mt-3 ms-3 d-flex flex-column align-items-center">
                <h3>Total: {cart.getTotalPrice} $</h3>
                <Row className="d-grid col-12">
                    <Button variant="dark" className='my-4 btn-lg' onClick={() => {createOrder(); handleShow()}}>Order</Button>
                </Row>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>Order is Processing</Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default observer(Cart);