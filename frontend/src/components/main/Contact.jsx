import React from "react";
import { Table } from "react-bootstrap";
import { contact_page } from "../../Helpers/helperString";
const Contact = () => {
  return (
    <div className="contact_page">
      <h2>{contact_page.CONTACT_US}</h2>
      <div className="contact_width">
        <Table borderless={true}>
          <thead>
            <tr>
              <th>
                <h4>{contact_page.HEADING_TIME}</h4>
              </th>
              <th>
                <h4>{contact_page.HEADING_ADDRESS}</h4>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{contact_page.MONDAY}</td>
              <td>{contact_page.ADDRESS_LINE_1}</td>
            </tr>
            <tr>
              <td>{contact_page.TUESDAY}</td>
              <td>{contact_page.ADDRESS_LINE_2}</td>
            </tr>
            <tr>
              <td>{contact_page.WEDNESDAY}</td>
              <td>{contact_page.PHONE}</td>
            </tr>
            <tr>
              <td>{contact_page.THURSDAY}</td>
              <td>{contact_page.EMAIL}</td>
            </tr>
            <tr>
              <td>{contact_page.FRIDAY}</td>
            </tr>
            <tr>
              <td>{contact_page.SATURDAY}</td>
            </tr>
            <tr>
              <td>{contact_page.SUNDAY}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Contact;
