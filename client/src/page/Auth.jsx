import React, {useContext, useState} from 'react';
import {Button, Container, FloatingLabel, Form, FormLabel, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import Card from "react-bootstrap/Card";
import {REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const log = async () => {
        await user.login(email, password)
        if(user.isAuth)
            navigate(SHOP_ROUTE)
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600, backgroundColor: "whitesmoke", border: '1px solid black'}} className="p-5 shadow">
                <Button variant="dark" disabled className="mb-2"><h2>Authorization</h2></Button>
                <Form className="d-flex flex-column">
                    <FloatingLabel label="Email Address">
                        <Form.Control
                        style={{backgroundColor: "ghostwhite"}}
                        className="mb-2"
                        placeholder="Enter email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    /></FloatingLabel>
                    <FloatingLabel label="Password">
                    <Form.Control
                        style={{backgroundColor: "ghostwhite"}}
                        className="mb-2 align-self-end"
                        placeholder="Enter password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    /></FloatingLabel>
                    <Row className="d-flex justify-content-between px-2 pl-3 pr-3">
                            <div>
                                Don`t have an account? <NavLink to={REGISTRATION_ROUTE}>Register</NavLink>
                            </div>
                        <Button className="mt-2" variant={"dark"} onClick={log}>
                            Log In
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default observer(Auth);