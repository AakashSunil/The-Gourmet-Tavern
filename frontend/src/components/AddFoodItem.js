import React, { useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap';
import { FoodMenu_Page } from '../Helpers/helperString';
import { useHistory } from 'react-router';

export const AddFoodItem = () => {

    const history = useHistory();

    const [isOpen, setOpen] = useState(true);
    
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [isDeleted,setDeleted] = useState(false)
    const [category,setCategory] = useState('')
    const [cuisine,setCuisine] = useState('')
    const [preference,setPreference] = useState('')
    const [ingredients,setIngredients] = useState('')
    const [stockQuantity,setStockQuantity] = useState('')
    const [imageData,setImageData] = useState('')

    const handleFoodClose = () => {
        setOpen(false)
        history.push('/foodMenu')
    }

    const handleFoodAdd = e => {
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
        // history.push('/foodMenu');
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
                onHide={handleFoodClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>{FoodMenu_Page.ADD}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit = { handleFoodAdd }>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>{FoodMenu_Page.NAME}</Form.Label>
                            <Form.Control type="name" placeholder="Enter Food Name" value={name} onChange = { (e) => setName(e.target.value) } />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>{FoodMenu_Page.FOOD_IMAGE}</Form.Label>
                            <Form.Control type="file" onChange={(e) => handleFileInput(e)}/>
                        </Form.Group>  
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>{FoodMenu_Page.DESCRIPTION}</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter Food Description" value={description} onChange = { (e) => setDescription(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>{FoodMenu_Page.PRICE}</Form.Label>
                            <Form.Control type="number" placeholder="Enter Food Price" value={price} onChange = { (e) => setPrice(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>{FoodMenu_Page.CATEGORY}</Form.Label>
                            <Form.Control type = "text" placeholder="Enter Food Category" value={category} onChange = { (e) => setCategory(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>{FoodMenu_Page.CUISINE}</Form.Label>
                            <Form.Control type = "text" placeholder="Enter Food Cuisine" value={cuisine} onChange = { (e) => setCuisine(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>{FoodMenu_Page.PREFERENCE}</Form.Label>
                            <Form.Control type = "text" placeholder="Enter Food Preference" value={preference} onChange = { (e) => setPreference(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>{FoodMenu_Page.INGREDIENTS}</Form.Label>
                            <Form.Control type = "text" placeholder="Enter Food Ingredients" value={ingredients} onChange = { (e) => setIngredients(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>{FoodMenu_Page.STOCK_QUANTITY}</Form.Label>
                            <Form.Control type= "number" placeholder = "Enter Stock Quantity" value={stockQuantity} onChange = { (e) => setStockQuantity(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <div key={`default-checkbox`} className="mb-3">
                                <Form.Check type="checkbox" id={`default-checkbox`} label={`Food Item Deleted?`} value={isDeleted} onChange = { (e) => setDeleted(!isDeleted)}/>
                            </div>
                        </Form.Group>              
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleFoodClose}>{FoodMenu_Page.CANCEL}</Button>
                <Button variant="primary" onClick={handleFoodAdd}>{FoodMenu_Page.SUBMIT}</Button>
                </Modal.Footer>
            </Modal>
    )
}
