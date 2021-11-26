import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Card_Item_Page } from '../Helpers/helperString';
import { Quantity } from './Quantity';

export default function CardItem(props) {

  const [showButton,setShowButton] = useState(true)
  const handleClick = (e) => {
    setShowButton(!showButton)
    console.log(item);
  }
  const { item } = props;
  return(
    <Card className="design">
      <Card.Img variant="top" src={item.image} height="420px" width="420px"/>
      <Card.Body>
        <Card.Title className="TextSize_Title">{item.name}</Card.Title>
        <Card.Text className="description_height">
          {item.description}
        </Card.Text>
        <div className="price">
          <Card.Text className="TextSize">
            {"Item Price: $"}{item.price}
          </Card.Text>
          {showButton && <Button variant="primary" onClick={() => handleClick()}>{Card_Item_Page.ADD}</Button>}
          {!showButton && <Quantity items = {item} close ={()=>handleClick() } add = { () => handleClick() } />}
        </div>
      </Card.Body>
    </Card>
    )
}
