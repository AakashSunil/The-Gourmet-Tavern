import { Button, Form } from 'react-bootstrap'
import React, { useState } from 'react'

export const CartQuantity = (props) => {
    console.log(props);

    const{ items } = props;
    const [quantity,setQuantity] = useState(items.quantity);

    const handleChange = (change) => {
        let temp = quantity
        if(change === "+") {
            temp++
            setQuantity(temp)
        }
        else {
            temp--
            if(temp<1) {
                temp = 0
            }
            setQuantity(temp)
        }
    }

    return (
        <div className="search_reset">
            <Button onClick={ () => handleChange('-')} variant="danger">{<b>-</b>}</Button>
            <Form.Control type="text" className="quantity" placeholder="Search Dish Name" value={quantity} defaultValue={quantity} />
            <Button onClick={ () => handleChange('+') } variant="success">{<b>+</b>}</Button>
            <Button onClick={ () => props.add(items,quantity)} className="quantity">{<b>Update</b>}</Button>
            <Button onClick={ () => props.close()} className="quantity">{<b>X</b>}</Button>

        </div>
    )
}
