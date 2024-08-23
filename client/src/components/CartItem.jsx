import React, {useContext, useEffect, useState} from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {Context} from "../index";
import CartService from "../services/CartService";
import {observer} from "mobx-react-lite";
import ProductService from "../services/ProductService";
import CartError from "./CartError";
import {toJS} from "mobx";

const CartItem = ({item}) => {
    const [product, setProduct] = useState({});

    const {cart} = useContext(Context)
    const {user} = useContext(Context)
    useEffect( () => {
        ProductService.getOneProduct(item.productId).then(response => {setProduct(response.data)})
    },[])

    const addToCart = async () => {
        const {data} = await CartService.addProduct(toJS(user.getUser)._id, item.productId);
        cart.setTotal(data.subTotal)
        cart.setCartItems(data.items)
    }
    const deleteFromCart = async () => {
        const {data} =  await CartService.deleteProduct(toJS(user.getUser)._id, item.productId)
        cart.setTotal(data.subTotal)
        cart.setCartItems(data.items)
    }
    return (
        <Card className="p-1 d-flex m-1" style={{backgroundColor:  "slategray"}}>
            {item ?<Row className="d-flex justify-content-md-start pl-3 pr-3">
                    <Col md={3}>
                        <Image className="rounded" width={100} height={100} src = {process.env.REACT_APP_API_URL + product.img}/>
                        <div>
                            <Button size='sm' variant="dark" className={'px-2  my-1'} onClick={deleteFromCart}>delete</Button>
                            <Button size='sm' variant="dark" className={'px-2 mx-1 my-1'} onClick={addToCart}>add</Button>
                        </div>
                    </Col>
                    <Col md={3} className="d-flex justify-content-center">
                        <h5 className="d-flex align-items-center ms-3">{product.name}</h5>
                    </Col>
                    <Col md={2} className="d-flex justify-content-center">
                        <h6 className="d-flex align-items-center ">Count:
                            <div className={'m-1'}>{item.quantity}</div>
                        </h6>
                    </Col>
                    <Col md={4} className="d-flex flex-column justify-content-center">
                        <h6>
                            <div className="ms-3">Price {product.price} $</div>
                            <div className='py-2'></div>
                            <div className="ms-3">Total: {item.total.toFixed(2)} $</div>
                        </h6>
                    </Col>
                </Row>:
                <CartError item={item}/>
            }
        </Card>

    );
};

export default observer(CartItem);