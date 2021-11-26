import React from "react";
import { Col, Row } from "react-bootstrap";
import CardItem from "../components/CardItem";


export const dropdown_populate = (items,type) => {
    let cat = new Set();
    items.forEach(element => {
        console.log(element);
        var sep = element[type].split(';');
        sep.forEach(ele => {
            cat.add(ele.trim())
        })
    });
    let cat_array = [...cat];
    let options;
    if(type==="level"){
        cat_array.sort(function(a, b) {
            return a - b;});
        options = cat_array.map((element,idx) => {
            return <option value={element} key={idx}>{element}{type==="level"?"%":""}</option>
        })
    }
    else {
        options = cat_array.map((element,idx) => {
            return <option value={element} key={idx}>{element}</option>
        })
    }
    
    return options
}

export const grid_create = (items,item_blank) => {
        let i = 0;
        const rows = [...Array( Math.ceil(items.length / 4) )];
        let productRows = rows.map( (row, idx) => items.slice(idx * 4, idx * 4 + 4) );
        let temp_rows = productRows
        temp_rows.map((row,idx) => {
            if(row.length !== 4) {
                for(i = 0;i <= 4 - (row.length-1);i++) {
                    productRows[idx].push(item_blank)
                }
            }
            return productRows
        })
        const content = productRows.map((row, idx_row) => (
            
            <Row className="card_align" key={idx_row}>
            
            { row.map( (product,idx) => (
                <Col md key={idx}>
                    {!product.isDeleted && <CardItem item = {product} key={idx} /> }
                </Col>
                )
            )}
            </Row> ));

        return content
}