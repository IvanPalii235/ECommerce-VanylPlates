import React, {useContext, useState} from 'react';
import {Container, FloatingLabel, Form, Spinner} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import {NavLink, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import Button from "react-bootstrap/Button";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Registration = () => {
    const {user} = useContext(Context)
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [forName, setForName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const regist = async () =>{
        await user.registration(name, forName, email, password);
        if(user.isAuth)
            navigate(SHOP_ROUTE)
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600, backgroundColor: "whitesmoke", border: '1px solid black'}} className="p-5 shadow">
                <Button variant="dark" disabled className="mb-2"><h2 className="m-auto">Registration</h2></Button>
                <Form className="d-flex flex-column">
                    <FloatingLabel label="Enter name" className="my-1">
                    <Form.Control
                        style={{backgroundColor: "ghostwhite"}}
                        placeholder="Enter name..."
                        value={name}
                        onChange={e => setName(e.target.value)}
                    /></FloatingLabel>
                    <FloatingLabel label="Enter forename" className="my-1">
                    <Form.Control
                        style={{backgroundColor: "ghostwhite"}}
                        placeholder="Enter forename..."
                        value={forName}
                        onChange={e => setForName(e.target.value)}
                    /></FloatingLabel>
                    <FloatingLabel label="Enter email" className="my-1">
                    <Form.Control
                        style={{backgroundColor: "ghostwhite"}}
                        placeholder="Enter email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    /></FloatingLabel>
                    <FloatingLabel label="Enter password" className="my-1">
                    <Form.Control
                        style={{backgroundColor: "ghostwhite"}}
                        placeholder="Enter password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    /></FloatingLabel>
                    <Row className="d-flex justify-content-between px-2 pl-3 pr-3">
                        <div>
                            You have account <NavLink to={LOGIN_ROUTE}>Log In</NavLink>
                        </div>

                        <Button
                            variant={"dark"} className={'mt-2'}
                            onClick={regist}
                        >
                            Sign Up
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
}

export default observer(Registration);