import React, {useContext} from 'react';
import {Context} from "../index";
import {Row} from "react-bootstrap";
import SongItem from "./SongItem";
import {observer} from "mobx-react-lite";

const SongList = () => {
    const {product} = useContext(Context)
    return (
        <Row className="d-flex">
            {product.products.map(item =>
                    <SongItem key={item._id} product={item}/>
            )}
        </Row>
    );
};

export default observer(SongList);