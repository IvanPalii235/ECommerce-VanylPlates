import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Button, Container, Navbar} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate()
    const {user} = useContext(Context)

    const logOut = () => {
        user.logout()
        user.setIsAuth(false)
    }

    return (
        <Navbar style={{backgroundColor: "lightslategray"}} className='shadow-sm'>
            <Container >
                <Nav style={{color: "black", cursor: "pointer", fontSize: '23px'}} onClick={() => navigate(SHOP_ROUTE)}><strong>Musiart</strong></Nav>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: "white"}}>
                        {user.getRole === 'ADMIN' && <Button className="mx-1" variant={"dark"} onClick={() => navigate(ADMIN_ROUTE)}>Admin Button</Button>}
                        <Button variant={"dark"} className="mx-1" onClick={() => {
                            navigate(CART_ROUTE)
                        }

                        }>Cart</Button>

                        <Button variant={"dark"} className="mx-1" onClick={() => logOut()}>Log out</Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: "white"}}>
                        <Button variant={"dark"} onClick={() => navigate(LOGIN_ROUTE)}>Authorize</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
};

export default observer(NavBar);