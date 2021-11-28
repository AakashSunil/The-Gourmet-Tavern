import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { Add_Edit_Food_Page } from '../Helpers/helperString';

export const EditFoodItem = () => {
    
    const location = useLocation();
    const {item} = location.state;

    const history = useHistory();
    const [show, setShow] = useState(true);

    const [name,setName] = useState(item.name)
    const [description,setDescription] = useState(item.description)
    const [price,setPrice] = useState(item.price)
    const [isDeleted,setDeleted] = useState(item.isDeleted)
    const [category,setCategory] = useState(item.category)
    const [cuisine,setCuisine] = useState(item.cuisine)
    const [preference,setPreference] = useState(item.preference)
    const [ingredients,setIngredients] = useState(item.ingredients)
    const [stockQuantity,setStockQuantity] = useState(item.stockQuantity)
    const [imageData,setImageData] = useState(item.image)

    const handleClose = () => {
        history.push('/foodMenu')
        setShow(false);
    }

    const handleDelete = () => {
        history.push('/foodMenu')
        setShow(false)
    }

    const handleSubmit = () => {
        const food_item = {
            name:name,
            description: description,
            price:price,
            isDeleted: isDeleted,
            category: category,
            cuisine:cuisine,
            preference:preference,
            ingredients:ingredients,
            stockQuantity:stockQuantity,
            imageData: imageData
        }
        console.log(food_item);
        history.push('/foodMenu');
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
    <>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{Add_Edit_Food_Page.EDIT_FOOD}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit = { handleSubmit }>
                    <Form.Group className="mb-3">
                        <Form.Label>{Add_Edit_Food_Page.NAME}</Form.Label>
                        <Form.Control type="name" placeholder = {Add_Edit_Food_Page.PLACEHOLDER_FOOD_NAME} value={name} onChange = { (e) => setName(e.target.value) } />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>{Add_Edit_Food_Page.FOOD_IMAGE}</Form.Label>
                        <Form.Control type="file" onChange={(e) => handleFileInput(e)}/>
                    </Form.Group>  
                    <Form.Group className="mb-3">
                        <Form.Label>{Add_Edit_Food_Page.DESCRIPTION}</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder = {Add_Edit_Food_Page.PLACEHOLDER_FOOD_DESCRIPTION} value={description} onChange = { (e) => setDescription(e.target.value) }/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{Add_Edit_Food_Page.PRICE}</Form.Label>
                        <Form.Control type="number" placeholder = {Add_Edit_Food_Page.PLACEHOLDER_FOOD_PRICE} value={price} onChange = { (e) => setPrice(e.target.value) }/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{Add_Edit_Food_Page.CATEGORY}</Form.Label>
                        <Form.Control type = "text" placeholder = {Add_Edit_Food_Page.PLACEHOLDER_FOOD_CATEGORY} value={category} onChange = { (e) => setCategory(e.target.value) }/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{Add_Edit_Food_Page.CUISINE}</Form.Label>
                        <Form.Control type = "text" placeholder = {Add_Edit_Food_Page.PLACEHOLDER_FOOD_CUISINE} value={cuisine} onChange = { (e) => setCuisine(e.target.value) }/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{Add_Edit_Food_Page.PREFERENCE}</Form.Label>
                        <Form.Control type = "text" placeholder = {Add_Edit_Food_Page.PLACEHOLDER_FOOD_PREFERENCE} value={preference} onChange = { (e) => setPreference(e.target.value) }/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{Add_Edit_Food_Page.INGREDIENTS}</Form.Label>
                        <Form.Control type = "text" placeholder = {Add_Edit_Food_Page.PLACEHOLDER_FOOD_INGREDIENTS} value={ingredients} onChange = { (e) => setIngredients(e.target.value) }/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>{Add_Edit_Food_Page.STOCK_QUANTITY}</Form.Label>
                        <Form.Control type= "number" placeholder = {Add_Edit_Food_Page.PLACEHOLDER_FOOD_STOCK_QUANTITY} value={stockQuantity} onChange = { (e) => setStockQuantity(e.target.value) }/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <div key={`default-checkbox`} className="mb-3">
                            <Form.Check type="checkbox" id={`default-checkbox`} label={Add_Edit_Food_Page.PLACEHOLDER_FOOD_DELETED} defaultChecked={isDeleted} value={isDeleted} onChange = { (e) => setDeleted(!isDeleted)}/>
                        </div>
                    </Form.Group>              
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>{Add_Edit_Food_Page.CANCEL}</Button>
                <Button variant="primary" onClick={handleSubmit}>{Add_Edit_Food_Page.SUBMIT_EDIT}</Button>
                <Button variant="primary" onClick={handleDelete}>{Add_Edit_Food_Page.DELETE}</Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}
