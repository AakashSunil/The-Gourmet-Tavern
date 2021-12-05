import React from "react";
import { Card, Table } from "react-bootstrap";
import { Order_List_Page } from "../../helpers/helperString";

const OrderList = (props) => {
  const { item } = props;

  return (
    <>
      <Card className="list-align">
        <Card.Title variant="top">
          {Order_List_Page.TITLE}
          {item.order_id}
        </Card.Title>
        <Card.Body>
          <Table borderless={true}>
            <thead>
              <tr>
                <th>
                  <h4>{Order_List_Page.NAME}</h4>
                </th>
                <th>
                  <h4>{Order_List_Page.PRICE}</h4>
                </th>
                <th>
                  <h4>{Order_List_Page.QUANTITIY}</h4>
                </th>
              </tr>
            </thead>
            {item.items.map((ele) => {
              return (
                <tbody>
                  <tr>
                    <td>{ele.name}</td>
                    <td>
                      {"$"}
                      {ele.price}
                    </td>
                    <td>{ele.quantity}</td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
          <Card.Title>
            {Order_List_Page.TOTAL_PRICE}
            {item.total_price}
          </Card.Title>
          <Card.Title>
            {Order_List_Page.ORDER_TYPE}
            {item.orderType}
          </Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};

export default OrderList;
