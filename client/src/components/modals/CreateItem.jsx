import React, {useContext, useState} from 'react';
import {Button} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import TovarService from "../../services/ProductService";

const CreateItem = ({show, onHide}) => {

    const [name, setName] = useState('')
    const [genre, setGenre] = useState('')
    const [artist, setArtist] = useState('')
    const [date_of_releasing, setDateOfReleasing] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState('')
    const [img, setImg] = useState(null)

    const selectFile = (e) => {
        setImg(e.target.files[0])
    }

    const addSongList = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('genre', genre)
        formData.append('artist', artist)
        formData.append('date_of_releasing', date_of_releasing)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('quantity', quantity)
        formData.append('img', img)
        TovarService.createProduct(formData).then(data => (console.log('')))
        onHide()
    }

    return (
        <Modal
            onHide={onHide}
            show={show}
            size="lg"
            centered
        >
            <Modal.Header closeButton style={{backgroundColor: "silver"}}>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form style={{backgroundColor: "whitesmoke"}}>
                    <Form.Control
                        value={name}
                        className="mt-3"
                        placeholder="Name"
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        value={genre}
                        className="mt-3"
                     placeholder="Genre"
                        onChange={e => setGenre(e.target.value)}
                    />
                    <Form.Control
                        value={artist}
                        className="mt-3"
                     placeholder="Artist"
                        onChange={e => setArtist(e.target.value)}
                    />
                    <Form.Control
                        value={date_of_releasing}
                        className="mt-3"
                     placeholder="Date of realising"
                        onChange={e => setDateOfReleasing(e.target.value)}
                    />
                    <Form.Control
                        value={price}
                        className="mt-3"
                     placeholder="Price"
                        type="number"
                        onChange={e => setPrice(e.target.value)}
                    />
                    <Form.Control
                        value={description}
                        className="mt-3"
                     placeholder="Description"
                        type="textarea"
                        onChange={e => setDescription(e.target.value)}
                    />
                    <Form.Control
                        value={quantity}
                        className="mt-3"
                     placeholder="Quantity"
                        type="textarea"
                        onChange={e => setQuantity(e.target.value)}
                    />
                    <Form.Control
                        className={"mt-3"}
                         placeholder="Image"
                         type={"file"}
                        onChange={selectFile}
                    />
                </Form>


            </Modal.Body>
            <Modal.Footer style={{backgroundColor: "silver"}}>
                <Button
                    variant={"dark"}
                    onClick={addSongList}
                >
                    Add song to list
                </Button>
                <Button variant={"danger"} onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default observer(CreateItem);