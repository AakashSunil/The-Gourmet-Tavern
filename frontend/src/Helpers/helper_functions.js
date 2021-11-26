import React from "react";
import { Col, Row } from "react-bootstrap";
import CardItem from "../components/CardItem";


export const dropdown_populate = (items,type) => {
    let cat = new Set();
    items.forEach(element => {
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
        let boundaries = []
        boundaries.push(0)
        boundaries.push(Math.ceil(cat_array[Math.ceil(cat_array.length/4)]))
        boundaries.push(Math.ceil(cat_array[Math.ceil(2*cat_array.length/4)]))
        boundaries.push(Math.ceil(cat_array[Math.ceil(3*cat_array.length/4)]))


        let value_1 = ">=" + boundaries[1] + " && <=" + boundaries[2]
        let value_2 = ">=" + boundaries[2] + " && <=" + boundaries[3]
        options =  (<>
            <option value={boundaries[0]} key={0}>{"0%"}</option>
            <option value={boundaries[1]} key={1}>{"Upto "}{boundaries[1]}{"%"}</option>
            <option value={value_1} key={2}>{"Greater than "}{boundaries[1]}{"% "}{"Less than "}{boundaries[2]}{"%"}</option>
            <option value={value_2} key={3}>{"Greater than "}{boundaries[2]}{"% "}{"Less than "}{boundaries[3]}{"%"}</option>
            <option value={boundaries[3]} key={4}>{"Greater than "}{boundaries[3]}{"%"}</option>
        </>)
            
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
        let limit = 3;
        const rows = [...Array( Math.ceil(items.length / limit) )];
        let productRows = rows.map( (row, idx) => items.slice(idx * limit, idx * limit + limit) );
        let temp_rows = productRows
        temp_rows.map((row,idx) => {
            if(row.length !== limit) {
                for(i = 0;i <= limit - (row.length-1);i++) {
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