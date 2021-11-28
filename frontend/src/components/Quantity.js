import { Button, Form } from 'react-bootstrap'
import React, { useState } from 'react'
import { Cart_Quantity } from '../Helpers/helperString';

export const Quantity = (props) => {
    
    const [quantity,setQuantity] = useState(0);

    const handleChange = (change) => {
        let temp = quantity
        if(change === Cart_Quantity.ADD) {
            temp++
        }
        else {
            temp--
            if(temp<0) {
                temp = 0
            }
        }
        setQuantity(temp)
    }

    return (
        <div className="search_reset">
            <Button onClick={ () => handleChange(Cart_Quantity.SUBTRACT)} variant="danger">{Cart_Quantity.SUBTRACT}</Button>
            <Form.Control type="text" className="quantity" value={quantity} defaultValue={quantity} />
            <Button onClick={ () => handleChange(Cart_Quantity.ADD) } variant="success">{Cart_Quantity.ADD}</Button>
            <Button onClick={ () => props.add()} className="quantity">{Cart_Quantity.ADD_STRING}</Button>
            <Button onClick={ () => props.close()} className="quantity">{Cart_Quantity.CLOSE}</Button>
        </div>
    )
}
