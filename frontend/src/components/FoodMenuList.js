import React, { useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import { useHistory } from 'react-router';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import CardItem from './CardItem';
import { FoodMenu_Page } from '../Helpers/helperString';
import { food_menu_item } from '../Helpers/menu';
import { dropdown_populate } from '../Helpers/dropdown_helpers';


export default function FoodMenuList() {

    const item_loop = (items) => {

        const item_blank = {
            image: "",
            name: "",
            description: "",
            price: "",
            isDeleted: true,
            category:"",
            cuisine: "",
            preference: "",
            stockQuantity: 0,
            ingredients: ""
        }
        let i = 0;
        const rows = [...Array( Math.ceil(items.length / 4) )];
        let productRows = rows.map( (row, idx) => items.slice(idx * 4, idx * 4 + 4) );
        let temp_rows = productRows
        temp_rows.map((row,idx) => {
            if(row.length != 4) {
                for(i = 0;i <= 4 - (row.length-1);i++) {
                    productRows[idx].push(item_blank)
                }
            }
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

    
    const isAdmin = true;
    const history = useHistory()
    
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [preference, setPreference] = useState('');
    
    const handleSubmit = e => {
        e.preventDefault();
        const search_filter = {
            search:search,
            category:category,
            cuisine:cuisine,
            preference:preference
        }
        console.log(search_filter);
    }

    return (
        <div>
            <div className="Searching">
            <div className="content">
                <h1>{FoodMenu_Page.HEADING}</h1>
                <p>{FoodMenu_Page.DESCRIPTION}</p>
            </div>
            <div className="form_css">
                <Form onSubmit = { handleSubmit }>
                    <Row className="g-2">
                        <Col md>
                            <FloatingLabel controlId="floatingSelectGrid" label="Category">
                                <Form.Select aria-label="Floating label select example" value = { category } onChange = { (e) => setCategory(e.target.value) }>
                                    <option>Select Category</option>
                                    {dropdown_populate(food_menu_item,"category")}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingSelectGrid" label="Cuisine">
                                <Form.Select aria-label="Floating label select example" value={ cuisine } onChange = { (e) => setCuisine(e.target.value) }>
                                    <option>Select Cuisine</option>
                                    {dropdown_populate(food_menu_item,"cuisine")}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingSelectGrid" label="Preference">
                                <Form.Select aria-label="Floating label select example" value={ preference } onChange = { (e) => setPreference(e.target.value) }>
                                    <option>Select Preference</option>
                                    {dropdown_populate(food_menu_item,"preference")}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingInputGrid" label="Search">
                            <Form.Control type="text" placeholder="Search Dish Name" value={search} onChange = { (e) => { setSearch(e.target.value) }} />
                            </FloatingLabel>
                        </Col>
                        <Col md className="button_align">
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit" size="lg">
                                    {FoodMenu_Page.SEARCH}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
                </div>
            </div>
            {isAdmin?
                <div className="card_align">
                    <Button variant="primary" type="submit" size="lg">
                        {FoodMenu_Page.ADD}
                    </Button>
                </div>
                :
                null
            }
            <div className="card_align">
            {
                item_loop(food_menu_item)
            }    
            </div>
        </div>
    )
}
