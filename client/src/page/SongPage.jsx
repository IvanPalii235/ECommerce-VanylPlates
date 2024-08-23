import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Image, Row, Card, Button, Form, Spinner, ButtonGroup, ToggleButton} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../index";
import ProductService from "../services/ProductService";
import CartService from "../services/CartService";
import RatingService from "../services/RatingService"
import DeleteButton from "../components/DeleteButton";
import {toJS} from "mobx";
import AddToCart from "../components/AddToCart";
import {LOGIN_ROUTE} from "../utils/consts";

const SongPage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    const [product, setProduct] = useState({})
    const {id} = useParams()
    const {user} = useContext(Context)

    const [changeVisible] = useState(false)
    const [rating, setRating] = useState(1)

    const addToCart = async () => {
        if(!user.isAuth)
            return alert('You are unauthorized!')
        await CartService.addProduct(toJS(user.getUser)._id, id)
    }
    const addRating = () => {
        setLoading(true);
        RatingService.addRating(id, rating).then(response => {
            if(response) {
                setRating(0)
                alert('Rating has been set')
                setLoading(false);
            }
        }).catch(e => {
            alert(e.response.data.message)
        })
    }

    useEffect(() => {
        ProductService.getOneProduct(id).then(response => {
            setProduct(response.data)
            setLoading(false);
        });
    },[changeVisible])

    if (loading) {
        return <Spinner animation={'grow'} variant={'dark'}/>
    }
    return (
        <Container className={"mt-3"}>
            <Row>
            <Col md={3} className='rounded' style={{backgroundColor: "whitesmoke", border: '1px solid black'}}>
                <Image className='rounded d-block mx-auto mt-3 shadow-sm' width={250} height={250} src={process.env.REACT_APP_API_URL + product.img}/>
                <hr style={{border: "1px solid black"}} className='my-2'/>
                <Row className='my-2'><h3 className='d-flex justify-content-center'>{product.name}</h3></Row>
            </Col>
                <Col md={5} className="d-flex flex-column align-items-center justify-content-center">
                    <h1>About</h1>
                    <p/>
                    <Row>
                        Name: {product.name}
                    </Row>
                    <hr className='px-5 my-2' style={{border: "1px solid black"}}/>
                    <Row>
                        Artist: {product.artist}
                    </Row>
                    <hr className='px-5 my-2' style={{border: "1px solid black"}}/>
                    <Row>
                        Date of releasing: {product.date_of_releasing}
                    </Row>
                    <hr className='px-5 my-2' style={{border: "1px solid black"}}/>
                    <Row className='text-wrap px-4'>
                        Songs list: {product.description}
                    </Row>
                    <hr className='px-5 my-2' style={{border: "1px solid black"}}/>
                    <Row className='text-wrap px-4'>
                        Rating: {product.total_rating}
                    </Row>
                    <hr className='px-5 my-2' style={{border: "1px solid black"}}/>
                    <Row className='text-wrap px-4'>
                        Quantity: {product.quantity}
                    </Row>
                    <hr className='px-5 my-2' style={{border: "1px solid black"}}/>
                </Col>
            <Col md={4} className="d-flex align-items-center">
                <Card
                    className="d-flex flex-column align-items-center justify-content-around"
                    style={{width: 350, height: 250, background: "ghostwhite", border: "1px solid black"}}
                >
                    <h3>Price: {product.price} $</h3>
                    <Button className="d-grid col-11" variant={"dark"} onClick={addToCart}>Add to Cart</Button>
                    {user.getRole === 'ADMIN' && <DeleteButton product={product._id}/>}
                    <Form style={{textAlign:"center"}}>
                        <h4>Add rating</h4>
                        <Form.Check
                            inline
                            label="1"
                            name="rating"
                            type={'radio'}
                            value={1}
                            onChange={e => setRating(Number(e.target.value))}
                        />
                        <Form.Check
                            inline
                            label="2"
                            name="rating"
                            type={'radio'}
                            value={2}
                            onChange={e => setRating(Number(e.target.value))}
                        />
                        <Form.Check
                            inline
                            label="3"
                            name="rating"
                            type={'radio'}
                            value={3}
                            onChange={e => setRating(Number(e.target.value))}
                        />
                        <Form.Check
                            inline
                            label="4"
                            name="rating"
                            type={'radio'}
                            value={4}
                            onChange={e => setRating(Number(e.target.value))}
                        />
                        <Form.Check
                            inline
                            label="5"
                            name="rating"
                            type={'radio'}
                            value={5}
                            onChange={e => setRating(Number(e.target.value))}
                        />
                    </Form>
                    {user.isAuth ?
                        <Button className="d-grid col-11" variant="dark" onClick={() => {addRating(); console.log(rating)}}>Add</Button> :
                        <Button className='small text-wrap' onClick={() => navigate(LOGIN_ROUTE)} variant={"dark"} style={{fontSize: '10px'}}>You need to authorize to get all content</Button>}



                </Card>
            </Col>
            </Row>
        </Container>
    );
};

export default observer(SongPage);