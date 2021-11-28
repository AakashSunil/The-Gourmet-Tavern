import React, { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { DrinksMenu_Page } from '../Helpers/helperString';

export const AddDrinkItem = () => {

    const history = useHistory();
    const [isOpen,setOpen] = useState(true);

    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [isDeleted,setDeleted] = useState(false)
    const [category,setCategory] = useState('')
    const [level,setLevel] = useState('')
    const [stockQuantity,setStockQuantity] = useState('')
    const [imageData,setImageData] = useState('')

    const handleDrinkClose = () => {
        setOpen(false)
        history.push('/drinksMenu')
    }

    const handleDrinkAdd = e => {
        const drink_item = {
            name:name,
            description: description,
            price:price,
            isDeleted: isDeleted,
            category: category,
            level: level,
            stockQuantity:stockQuantity,
            imageData: imageData
        }
        console.log(drink_item);

        setOpen(false)
    }

    const getBase64 = (file) => {
        return new Promise((resolve) => {
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          reader.readAsDataURL(file);
    
          reader.onload = () => {
            baseURL = reader.result;
            setImageData(baseURL)
            resolve(baseURL);
          };
        });
      };

    const handleFileInput = (e) => {
        getBase64(e.target.files[0])
    }

    return (
        <Modal
                show={isOpen}
                onHide={handleDrinkClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{DrinksMenu_Page.ADD_DRINK}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit = { handleDrinkAdd }>
                        <Form.Group className="mb-3">
                            <Form.Label>{DrinksMenu_Page.NAME}</Form.Label>
                            <Form.Control type="name" placeholder="Enter Drink Name" value={name} onChange = { (e) => setName(e.target.value) } />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{DrinksMenu_Page.DRINK_IMAGE}</Form.Label>
                            <Form.Control type="file" onChange={(e) => handleFileInput(e)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{DrinksMenu_Page.DESCRIPTION}</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter Drink Description" value={description} onChange = { (e) => setDescription(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{DrinksMenu_Page.PRICE}</Form.Label>
                            <Form.Control type="number" placeholder="Enter Price" value={price} onChange = { (e) => setPrice(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{DrinksMenu_Page.CATEGORY}</Form.Label>
                            <Form.Control type = "text" placeholder="Enter Category" value={category} onChange = { (e) => setCategory(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{DrinksMenu_Page.LEVEL}</Form.Label>
                            <Form.Control type= "text" placeholder = "Enter Alcohol Percentage" value={level} onChange = { (e) => setLevel(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{DrinksMenu_Page.STOCK_QUANTITY}</Form.Label>
                            <Form.Control type= "number" placeholder = "Enter Stock Quantity" value={stockQuantity} onChange = { (e) => setStockQuantity(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <div key={`default-checkbox`} className="mb-3">
                                <Form.Check type="checkbox" id={`default-checkbox`} label={`Drink Item Deleted?`} value={isDeleted} onChange = { (e) => setDeleted(!isDeleted)}/>
                            </div>
                        </Form.Group>      
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDrinkClose}>{DrinksMenu_Page.CANCEL}</Button>
                    <Button variant="primary" onClick={handleDrinkAdd}>{DrinksMenu_Page.SUBMIT}</Button>
                </Modal.Footer>
            </Modal>
    )
}
