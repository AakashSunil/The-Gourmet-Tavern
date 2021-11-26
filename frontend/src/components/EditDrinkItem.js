import Button from '@restart/ui/esm/Button';
import React, { useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Add_Drink_Page } from '../Helpers/helperString';

export const EditDrinkItem = () => {

    const history = useHistory();
    const [show, setShow] = useState(true);

    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [isDeleted,setDeleted] = useState(false)
    const [category,setCategory] = useState('')
    const [level,setLevel] = useState('')
    const [stockQuantity,setStockQuantity] = useState('')
    const [imageData,setImageData] = useState('')

    const handleClose = () => {
        history.push('/drinksMenu')
        setShow(false);
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
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
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

    useEffect(()=>{
        
    })
  return (
    <>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{Add_Drink_Page.ADD}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit = { handleSubmit }>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>{Add_Drink_Page.NAME}</Form.Label>
                    <Form.Control type="name" placeholder="Enter Drink Name" value={name} onChange = { (e) => setName(e.target.value) } />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>{Add_Drink_Page.DRINK_IMAGE}</Form.Label>
                    <Form.Control type="file" onChange={(e) => handleFileInput(e)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>{Add_Drink_Page.DESCRIPTION}</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter Drink Description" value={description} onChange = { (e) => setDescription(e.target.value) }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>{Add_Drink_Page.PRICE}</Form.Label>
                    <Form.Control type="number" placeholder="Enter Price" value={price} onChange = { (e) => setPrice(e.target.value) }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>{Add_Drink_Page.CATEGORY}</Form.Label>
                    <Form.Control type = "text" placeholder="Enter Category" value={category} onChange = { (e) => setCategory(e.target.value) }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>{Add_Drink_Page.LEVEL}</Form.Label>
                    <Form.Control type= "text" placeholder = "Enter Alcohol Percentage" value={level} onChange = { (e) => setLevel(e.target.value) }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>{Add_Drink_Page.STOCK_QUANTITY}</Form.Label>
                    <Form.Control type= "number" placeholder = "Enter Stock Quantity" value={stockQuantity} onChange = { (e) => setStockQuantity(e.target.value) }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <div key={`default-checkbox`} className="mb-3">
                        <Form.Check type="checkbox" id={`default-checkbox`} label={`Drink Item Deleted?`} value={isDeleted} onChange = { (e) => setDeleted(!isDeleted)}/>
                    </div>
                </Form.Group>
                
                
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>{Add_Drink_Page.CANCEL}</Button>
          <Button variant="primary" onClick={handleSubmit}>{Add_Drink_Page.SUBMIT}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
