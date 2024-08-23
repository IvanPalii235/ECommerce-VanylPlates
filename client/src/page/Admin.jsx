import React, {useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import CreateItem from "../components/modals/CreateItem";
import {ORDERS_ROUTE, STATISTIC_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const Admin = () => {
    const navigate = useNavigate();
    const [itemVisible, setItemVisible] = useState(false)

    return (
        <Container
            className='d-flex justify-content-center mt-5 rounded'
            style={{border: "1px solid black", width: 500, height:300, backgroundColor: "ghostwhite"}}
        >
            <Col className="px-5">
                <Row className="justify-content-center"><Button
                    variant="dark"
                    className="d-grid btn-lg my-4"
                    onClick={() => setItemVisible(true)}
                >Add item</Button><CreateItem show={itemVisible} onHide={() => setItemVisible(false)}/></Row>
                <Row className="justify-content-center"><Button
                    variant="dark"
                    className="d-grid btn-lg my-4"
                    onClick={() => navigate(ORDERS_ROUTE)}>Orders</Button></Row>
                <Row className="justify-content-center"><Button
                    variant="dark"
                    className="d-grid btn-lg my-4"
                    onClick={() => navigate(STATISTIC_ROUTE)}>Statistic</Button></Row>
            </Col>





        </Container>
    );
};

export default Admin;