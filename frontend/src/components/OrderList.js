import React from 'react'
import { Card, Table } from 'react-bootstrap'

export const OrderList = (props) => {

    const {item} = props;
    console.log(item);

    return (
    <>
    <Card className="list-align">
        <Card.Title variant="top">{"Order "}{item.order_id}</Card.Title>
        <Card.Body>
            <Table borderless={true}>
                <thead>
                    <tr>
                        <th><h4>{"Item Name"}</h4></th>
                        <th><h4>{"Item Price"}</h4></th>
                        <th><h4>{"Quantity Ordered"}</h4></th>
                    </tr>
                </thead>
                { item.order_items.map((ele)=>{
                    return(        
                        <tbody>
                            <tr>
                                <td>{ele.name}</td>
                                <td>{"$"}{ele.price}</td>
                                <td>{ele.quantity}</td>
                            </tr>
                        </tbody>)
                })} 
            </Table>
            <Card.Title>
                {"Total Price: $"}{item.total_price}
            </Card.Title>
        </Card.Body>
    </Card>
    </>
    )
}
