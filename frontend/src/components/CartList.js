import React, { useState } from 'react'
import { Card, Table, Button } from 'react-bootstrap';
import { CartQuantity } from './CartQuantity';

export const CartList = (props) => {
    const {item} = props;

    const [showQuantity, setShowQuantity] = useState(false)
    const [showRemove, setShowRemove] = useState(false)

    const handleRemoveItem = (item_to_remove) => {
        console.log(item_to_remove);
    }
    const handleClick = (e) => {
        setShowQuantity(!showQuantity)
    }

    const handleSubmit = () => {
        console.log(item);
    }

    const handleAdd = (item,quantity_modified) => {
        console.log(item);
        console.log(quantity_modified);
        item.quantity = quantity_modified
        console.log(item);
    }
    const changeButton = (type) => {
        console.log(type);
        if(!(showQuantity || showRemove)) {
            if(type === "quantity"){
                setShowQuantity(true)
            }
            else {
                setShowRemove(true)
            }
        }
        else {
            setShowQuantity(!showQuantity)
            setShowRemove(!showRemove)
        }
    }
    return (
    <>
        <Card className="cart-align">
        <Card.Title variant="top"><h1>{"Cart Items"}</h1></Card.Title>
            <Card.Body>
                <Table borderless={true}>
                    <thead>
                        <tr>
                            <th><h4>{"Name"}</h4></th>
                            <th><h4>{"Price"}</h4></th>
                            <th><h4>{"Quantity Ordered"}</h4></th>
                            {<th><h4>{(showQuantity || showRemove) && "Modify"}</h4></th>}
                        </tr>
                    </thead>     
                    <tbody>
                    {item.map((item_detail, idx) => {
                        return(
                            <tr>
                                <td>{item_detail.name}</td>
                                <td>{"$"}{item_detail.price}</td>
                                <td>{item_detail.quantity}</td>
                                <td>
                                    {showQuantity && <CartQuantity items = {item_detail} close ={()=>handleClick() } add = { (item,quantity) => handleAdd(item,quantity) } />}
                                    {showRemove && <Button onClick={()=>handleRemoveItem(item_detail)}>Remove</Button>}
                                </td>
                            </tr>)
                    })}
                    </tbody>
                </Table>
                <Card.Title>
                    {/* {"Total Price: $"}{item_detail.price * item_detail.quantity} */}
                </Card.Title>
                
            </Card.Body>
            
        </Card>
        <div className="cart_button_align">
                {!showQuantity && <Button onClick={()=>changeButton("quantity")}>Update Quantities</Button>}
                {!showRemove && <Button onClick={()=>changeButton("remove")}>Remove Items</Button>}
                <Button onClick={()=>handleSubmit()}>Place Order</Button>
            </div>
    </>
    
    )
}
