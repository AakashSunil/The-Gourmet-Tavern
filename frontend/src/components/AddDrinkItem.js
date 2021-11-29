import React, { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Add_Edit_Drink_Page } from '../Helpers/helperString';

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
                    <Modal.Title>{Add_Edit_Drink_Page.ADD_DRINK}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit = { handleDrinkAdd }>
                        <Form.Group className="mb-3">
                            <Form.Label>{Add_Edit_Drink_Page.NAME}</Form.Label>
                            <Form.Control type="name" placeholder = {Add_Edit_Drink_Page.PLACEHOLDER_DRINK_NAME} value={name} onChange = { (e) => setName(e.target.value) } />
                        </Form.Group>
                        <Form.Group className="mb-3">
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
                                <Form.Check type="checkbox" id={`default-checkbox`} label={Add_Edit_Drink_Page.PLACEHOLDER_DRINK_DELETED} value={isDeleted} onChange = { (e) => setDeleted(!isDeleted)}/>
                            </div>
                        </Form.Group>      
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDrinkClose}>{Add_Edit_Drink_Page.CANCEL}</Button>
                    <Button variant="primary" onClick={handleDrinkAdd}>{Add_Edit_Drink_Page.SUBMIT}</Button>
                </Modal.Footer>
            </Modal>
    )
}