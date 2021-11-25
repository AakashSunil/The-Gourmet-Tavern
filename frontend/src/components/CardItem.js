import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Card_Item_Page } from '../Helpers/helperString';

export default function CardItem(props) {

  const { item } = props;
  return(
    <Card>
      <Card.Img variant="top" src={item.image} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          {item.description}
        </Card.Text>
        <Card.Text>
          {item.price}
        </Card.Text>
        <Button variant="primary">{Card_Item_Page.ADD}</Button>
      </Card.Body>
    </Card>
    )
}
