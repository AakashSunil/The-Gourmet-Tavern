import { Alert, Button, Form, Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import { Cart_Quantity } from '../Helpers/helperString';

export const CartQuantity = (props) => {
    
    const { items } = props;
    
    const [quantity,setQuantity] = useState(items.quantity);
    const [show,setShow] = useState(false);


    const handleClose = () => {
        setQuantity(items.stockQuantity)
        setShow(false)
    }
    
    const handleQuantity = (value) => {
        if(items.stockQuantity - value < 0){
            setShow(true)
        }
        setQuantity(value)
    }
    const handleChange = (change) => {
        let temp = quantity
        if(change === Cart_Quantity.ADD) {
            temp++
            if(items.stockQuantity - temp <= 0) {
                setShow(true)
            }
        }
        else {
            temp--
            if(temp<1) {
                temp = 1;
                setShow(true)
            }
        }
        
        setQuantity(temp)
    }

    return (
        <div className="search_reset">
            <Modal centered={true} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{Cart_Quantity.QUANTITIY_ERROR_HEADING}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{<Alert color="danger" variant={"danger"}>{quantity === 1? Cart_Quantity.MIN_QUANTITIY_ERROR_MSG : Cart_Quantity.MAX_QUANTITIY_ERROR_MSG}</Alert>}</Modal.Body>
            </Modal>
            <Button onClick={ () => handleChange(Cart_Quantity.SUBTRACT)}  variant="danger">{Cart_Quantity.SUBTRACT}</Button>
            <Form.Control type="number" className="quantity" value={quantity} defaultValue={quantity} onChange = {(e) => handleQuantity(e.target.value)} />
            <Button onClick={ () => handleChange(Cart_Quantity.ADD)}  variant="success">{Cart_Quantity.ADD}</Button>
            <Button onClick={ () => props.add()} className="quantity">{Cart_Quantity.ADD_STRING}</Button>
            <Button onClick={ () => props.close()} className="quantity">{Cart_Quantity.CLOSE}</Button>
        </div>
    )
}
