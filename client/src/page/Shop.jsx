import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import SongList from "../components/SongList";
import ProductService from "../services/ProductService";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import SortBar from "../components/SortBar";
import {toJS} from "mobx";

const Shop = () => {
    const {product} = useContext(Context)


    const [minPrice, setMinPrice] = useState()
    const [maxPrice, setMaxPrice] = useState()
    const [minStock, setMinStock]= useState()
    const [maxStock, setMaxStock] = useState()

    const [isSending, setIsSending] = useState(false)

    useEffect(() => {
        console.log(toJS(product.selectedSort))
        ProductService.getProducts(
            minPrice,
            maxPrice,
            minStock,
            maxStock,
            product.selectedSort.param === "sort_price" ? product.selectedSort.value : undefined,
            product.selectedSort.param === "sort_rating" ? product.selectedSort.value : undefined,
        ).then(response => {product.setProduct(response.data.products)
                product.setMinPrice(response.data.parameters.minPrice)
                setMinPrice(response.data.parameters.minPrice)
                setMaxPrice(response.data.parameters.maxPrice)
                product.setMinStock(response.data.parameters.minStock)
                setMinStock(response.data.parameters.minStock)
                setMaxStock(response.data.parameters.maxStock)
        });
    },[isSending])

    const resetFilters = () =>{
        product.setSelectedSort({})
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setMinStock(undefined);
        setMaxStock(undefined);
        setIsSending(!isSending);
    }

    return (
        <Container>

            <Row>
                <Col md={3}>
                    <Form>
                    <Card className="p-3 mt-3 d-flex flex-column justify-content-center">
                        <SortBar/>
                        <hr/>

                        <div className="d-flex justify-content-center align-items-center">Price</div>
                        <div className="p-2 d-flex flex-lg-row justify-content-between">

                            <Form.Control
                                className="me-5"
                                placeholder="From"
                                min = {0}
                                type={'number'}
                                value={minPrice}
                                step = '1'
                                onChange={e => setMinPrice(Number(e.target.value))}
                            />
                            <Form.Control
                                className="ms-5"
                                placeholder="To"
                                min = {0}
                                type={'number'}
                                value={maxPrice}
                                step = '1'
                                onChange={e => setMaxPrice(Number(e.target.value))}
                            />
                        </div>
                        <hr/>
                        <div className="d-flex justify-content-center align-items-center">Stock</div>
                        <div className="p-2 d-flex flex-lg-row justify-content-between">
                            <Form.Control
                                className="me-5"
                                placeholder="From"
                                min = {0}
                                type={'number'}
                                value={minStock}
                                step = '1'
                                onChange={e => setMinStock(Number(e.target.value))}
                            />
                            <Form.Control
                                className="ms-5"
                                placeholder="To"
                                min = {0}
                                type={'number'}
                                value={maxStock}
                                step = '1'
                                onChange={e => setMaxStock(Number(e.target.value))}
                            />
                        </div>
                        <hr/>
                        <div className="p-2 d-flex flex-lg-row justify-content-between">
                            <Button variant="dark"  onClick={() => {setIsSending(!isSending)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-check2" viewBox="0 0 16 16">
                                    <path
                                        d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                </svg>
                            </Button>
                            <Button variant="dark" onClick={() => {resetFilters()}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-x-lg" viewBox="0 0 16 16">
                                    <path
                                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                </svg>
                            </Button>
                        </div>
                    </Card>
                    </Form>
                </Col>

                <Col>
                    <SongList/>
                </Col>
            </Row>
        </Container>
    );
};

export default observer(Shop);