import React, { useState } from 'react'
import { Card, Table, Button } from 'react-bootstrap';
import { Cart_Items } from '../Helpers/helperString';
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
            if(type === "Quantity"){
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
            <Card.Title variant="top"><h1>{Cart_Items.TITLE}</h1></Card.Title>
            <Card.Body>
                <Table borderless={true}>
                    <thead>
                        <tr>
                            <th><h4>{Cart_Items.NAME}</h4></th>
                            <th><h4>{Cart_Items.PRICE}</h4></th>
                            <th><h4>{Cart_Items.QUANTITIY}</h4></th>
                            {<th><h4>{(showQuantity || showRemove) && Cart_Items.EDIT_COLUMN}</h4></th>}
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
                                    {showRemove && <Button onClick={()=>handleRemoveItem(item_detail)}>{Cart_Items.REMOVE}</Button>}
                                </td>
                            </tr>)
                    })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
        <div className="cart_button_align">
            {!showQuantity && <Button onClick={()=>changeButton(Cart_Items.QUANTITIY_STRING)}>{Cart_Items.UPDATE_QUANTITY}</Button>}
            {!showRemove && <Button onClick={()=>changeButton(Cart_Items.REMOVE)}>{Cart_Items.REMOVE_ITEMS}</Button>}
            <Button onClick={()=>handleSubmit()}>{Cart_Items.PLACE_ORDER}</Button>
        </div>
    </>
    )
}
