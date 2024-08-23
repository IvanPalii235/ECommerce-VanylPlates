import React, {useContext} from 'react';
import  {Col, Card, Button} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom"
import {CART_ROUTE, LOGIN_ROUTE, SONG_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import AddToCart from "./AddToCart";

const SongItem = ({product}) => {
    const {user} = useContext(Context)

    const navigate = useNavigate()
    return (
        <Col md={2} className="mt-3">
            <Card className='shadow' style={{width: 150, height: 330, cursor:'pointer', border: '1px solid black', backgroundColor: "silver"}}>
                <div onClick={() => {navigate(SONG_ROUTE + `/${product._id}`)}}>
                <Image className="rounded d-block mx-auto mt-1 mb-1" width={130} height={130} src={process.env.REACT_APP_API_URL + product.img}/>
                    <div><div className='mx-1 text-wrap'>{product.name}</div></div>
                    <div className="text-black-50 small mx-1">{product.artist}</div>
                    <div className="text-black-50 small mx-1">Quantity: {product.quantity}</div>
                    <div className="text-black-50 small mx-1">Rating: {product.total_rating}</div>
                    <div className="text-black-50 small mx-1">Price: {product.price}$</div>
                </div>
                <Col className='d-grid mx-1 my-1 py-2'>
                    {user.isAuth ?
                        <AddToCart productId = {product._id}/> :
                        <Button className='small text-wrap' onClick={() => navigate(LOGIN_ROUTE)} variant={"dark"} style={{fontSize: '10px'}}>You need to authorize to get all content</Button>}
                </Col>
            </Card>

        </Col>
    );
}


export default observer(SongItem);