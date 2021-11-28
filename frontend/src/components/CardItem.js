import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Card_Item_Page } from '../Helpers/helperString';
import { Quantity } from './Quantity';
import { useHistory } from 'react-router';

export default function CardItem(props) {

  const history = useHistory();

  const [showButton,setShowButton] = useState(true)
  const { item } = props;

  const handleClick = (e) => {
    setShowButton(!showButton)
  }

  const handleEdit = () => {
    if(item.level === undefined) {
      history.push({pathname:'/editFood',state: { item: item }});
    } 
    else {
      history.push({pathname:'/editDrinks',state: { item: item }});
    }
  }

  return(
    <>
        <Card className = "design">
            <Card.Img variant = "top" src = {item.image} height = "420px" width = "420px"/>
            <Card.Body>
                <Card.Title className = "TextSize_Title">{item.name}</Card.Title>
                <Card.Text className = "description_height">{item.description}</Card.Text>
                {props.isAdmin?item.isDeleted?<Card.Text>{Card_Item_Page.ADMIN_MESSAGE}</Card.Text>:null:null}
                <div className="price">
                    <div className="edit">
                        <Card.Text className="TextSize">{Card_Item_Page.ITEM_PRICE}{item.price}</Card.Text>
                        {props.isAdmin && <span onClick = {() => handleEdit(item)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                            </svg>
                        </span>}
                    </div> 
                    {showButton && <Button variant="primary" onClick={() => handleClick()}>{Card_Item_Page.ADD}</Button>}
                    {!showButton && <Quantity items = {item} close ={()=>handleClick() } add = { () => handleClick() } />}
                </div>
            </Card.Body>
        </Card>
    </>
    )
}
