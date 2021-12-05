import React, { useState } from "react";
import { Card, Table, Button, Modal, Form } from "react-bootstrap";
import { Cart_Items } from "../../Helpers/helperString";
import CartQuantity from "./CartQuantity";

const CartList = (props) => {
  const { item } = props;

  const [showQuantity, setShowQuantity] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleRemoveItem = (item_to_remove) => {
    console.log(item_to_remove);
  };
  const handleClick = (e) => {
    setShowQuantity(!showQuantity);
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleAdd = (item, quantity_modified) => {
    item.quantity = quantity_modified;
  };
  const changeButton = (type) => {
    console.log(type);
    if (!(showQuantity || showRemove)) {
      if (type === "Quantity") {
        setShowQuantity(true);
      } else {
        setShowRemove(true);
      }
    } else {
      setShowQuantity(!showQuantity);
      setShowRemove(!showRemove);
    }
  };

  return (
    <>
      <Card className="cart-align">
        <Card.Title variant="top">
          <h1>{Cart_Items.TITLE}</h1>
        </Card.Title>
        <Card.Body>
          <Table borderless={true}>
            <thead>
              <tr>
                <th>
                  <h4>{Cart_Items.NAME}</h4>
                </th>
                <th>
                  <h4>{Cart_Items.PRICE}</h4>
                </th>
                <th>
                  <h4>{Cart_Items.QUANTITIY}</h4>
                </th>
                {
                  <th>
                    <h4>
                      {(showQuantity || showRemove) && Cart_Items.EDIT_COLUMN}
                    </h4>
                  </th>
                }
              </tr>
            </thead>
            <tbody>
              {item.map((item_detail, idx) => {
                return (
                  <tr>
                    <td>{item_detail.name}</td>
                    <td>
                      {"$"}
                      {item_detail.price}
                    </td>
                    <td>{item_detail.quantity}</td>
                    <td>
                      {showQuantity && (
                        <CartQuantity
                          items={item_detail}
                          close={() => handleClick()}
                          add={(item, quantity) => handleAdd(item, quantity)}
                        />
                      )}
                      {showRemove && (
                        <Button onClick={() => handleRemoveItem(item_detail)}>
                          {Cart_Items.REMOVE}
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Card.Title>
            {Cart_Items.TOTAL_PRICE}
            {item.total_price}
          </Card.Title>
          <Card.Title>
            {Cart_Items.ORDER_TYPE_HEADING}
            {item.orderType}
          </Card.Title>
        </Card.Body>

      </Card>
      {
        <Modal
          centered={true}
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>{Cart_Items.ORDER_TYPE_HEADING}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Check
              // disabled
              type={"radio"}
              label={Cart_Items.DINE_IN}
              name="group1"
              id={Cart_Items.DINE_IN}
            />
            <Form.Check
              // disabled
              type={"radio"}
              name="group1"
              label={Cart_Items.DELIVERY}
              id={Cart_Items.DELIVERY}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => handleSubmit()}>
              {Cart_Items.PLACE_ORDER}
            </Button>
          </Modal.Footer>
        </Modal>
      }
      <div className="cart_button_align">
        {!showQuantity && (
          <Button onClick={() => changeButton(Cart_Items.QUANTITIY_STRING)}>
            {Cart_Items.UPDATE_QUANTITY}
          </Button>
        )}
        {!showRemove && (
          <Button onClick={() => changeButton(Cart_Items.REMOVE)}>
            {Cart_Items.REMOVE_ITEMS}
          </Button>
        )}
        <Button onClick={() => handleSubmit()}>{Cart_Items.ORDER_TYPE}</Button>
      </div>
    </>
  );
};

export default CartList;
