import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { Add_Edit_Drink_Page } from '../Helpers/helperString';

export const EditDrinkItem = () => {

    const location = useLocation();
    const {item} = location.state;

    const history = useHistory();
    const [show, setShow] = useState(true);

    const [name,setName] = useState(item.name)
    const [description,setDescription] = useState(item.description)
    const [price,setPrice] = useState(item.price)
    const [isDeleted,setDeleted] = useState(item.isDeleted)
    const [category,setCategory] = useState(item.category)
    const [level,setLevel] = useState(item.level)
    const [stockQuantity,setStockQuantity] = useState(item.stockQuantity)
    const [imageData,setImageData] = useState(item.image)

    const handleClose = () => {
        history.push('/drinksMenu')
        setShow(false);
    }

    const handleDelete = () => {
        history.push('/drinksMenu')
        setShow(false)
    }
    const handleSubmit = () => {
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
        history.push('/drinksMenu');
    }

    const getBase64 = (file) => {
        return new Promise((resolve) => {
            let fileInfo;
            let baseURL = "";
            
            let reader = new FileReader();
    
            reader.readAsDataURL(file);
    
            reader.onload = () => {

                baseURL = reader.result;
                setImageData(baseURL)
                resolve(baseURL);
            };
            console.log(fileInfo);
        });
      };

    const handleFileInput = (e) => {
        getBase64(e.target.files[0])
    }

  return (
    <>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{Add_Edit_Drink_Page.EDIT_DRINK}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit = { handleSubmit }>
                    <Form.Group className="mb-3">
                        <Form.Label>{Add_Edit_Drink_Page.NAME}</Form.Label>
                        <Form.Control type="name" placeholder = {Add_Edit_Drink_Page.PLACEHOLDER_DRINK_NAME} value={name} onChange = { (e) => setName(e.target.value) } />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>{Add_Edit_Drink_Page.DRINK_IMAGE}</Form.Label>
                        <Form.Control type="file" onChange={(e) => handleFileInput(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{Add_Edit_Drink_Page.DESCRIPTION}</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder = {Add_Edit_Drink_Page.PLACEHOLDER_DRINK_DESCRIPTION} value={description} onChange = { (e) => setDescription(e.target.value) }/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{Add_Edit_Drink_Page.PRICE}</Form.Label>
                        <Form.Control type="number" placeholder = {Add_Edit_Drink_Page.PLACEHOLDER_DRINK_PRICE} value={price} onChange = { (e) => setPrice(e.target.value) }/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{Add_Edit_Drink_Page.CATEGORY}</Form.Label>
                        <Form.Control type = "text" placeholder = {Add_Edit_Drink_Page.PLACEHOLDER_DRINK_CATEGORY} value={category} onChange = { (e) => setCategory(e.target.value) }/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{Add_Edit_Drink_Page.LEVEL}</Form.Label>
                        <Form.Control type= "text" placeholder = {Add_Edit_Drink_Page.PLACEHOLDER_DRINK_ALCOHOL_PERCENTAGE} value={level} onChange = { (e) => setLevel(e.target.value) }/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{Add_Edit_Drink_Page.STOCK_QUANTITY}</Form.Label>
                        <Form.Control type= "number" placeholder = {Add_Edit_Drink_Page.PLACEHOLDER_DRINK_STOCK_QUANTITY} value={stockQuantity} onChange = { (e) => setStockQuantity(e.target.value) }/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <div key={`default-checkbox`} className="mb-3">
                            <Form.Check type="checkbox" id={`default-checkbox`} label={Add_Edit_Drink_Page.PLACEHOLDER_DRINK_DELETED} defaultChecked={isDeleted} value={isDeleted} onChange = { (e) => setDeleted(!isDeleted)}/>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>{Add_Edit_Drink_Page.CANCEL}</Button>
                <Button variant="primary" onClick={handleSubmit}>{Add_Edit_Drink_Page.SUBMIT_EDIT}</Button>
                <Button variant="primary" onClick={handleDelete}>{Add_Edit_Drink_Page.DELETE}</Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}