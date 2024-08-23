import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Card, Container, Form, Modal, Spinner} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import OrdersService from "../services/OrderService";
import {ADMIN_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const Orders = () => {
    const navigate = useNavigate();


    const [loading, setLoading] = useState(true);

    const [id, setId] = useState('');
    const [isSending, setIsSending] = useState(false)
    const [orders , setOrders] = useState([])

    const [changeVisible, setChangeVisible] = useState(false)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteOrder = (id) => {
        OrdersService.cancelOrder(id).then(() => {
            console.log(id)
            setLoading(false);
            setIsSending(!isSending)
        }).catch(e => {
            console.log('HUY')
        })
        }

    useEffect(() => {
        OrdersService.getOrders(id
        ).then(response => {
            setOrders(response.data)
            setLoading(false);
        }).catch(e => {
            alert(e.response.data.errors[0].msg)
            navigate(ADMIN_ROUTE)
        })
    },[isSending, changeVisible])

    if (loading) {
        return <Spinner animation={'grow'}/>
    }

    return (
        <Container fluid>
            {orders.map(order =>
                <Card className="mb-3 mt-2" key = {order._id}>
                    <Card.Header>
                        <div className="d-flex flex-lg-row justify-content-between">
                            <div>Order Number - {order._id}</div>
                            <div>{order.orderDateString}</div>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Order Status - {order.order_status}
                        </Card.Text>
                        <div className="d-flex flex-row justify-content-between">
                            <Card.Title> Orders price -  {order.subTotal}$</Card.Title>
                            <Button variant="danger" onClick={() => {deleteOrder(order._id); handleShow()}}>Delete</Button>
                        </div>

                    </Card.Body>
                </Card>


            )}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>Order canceled</Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>

    );
};

export default observer(Orders);