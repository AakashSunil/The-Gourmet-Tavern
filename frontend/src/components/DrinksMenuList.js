import React, { useState } from 'react'
// import { Link, Redirect } from "react-router-dom";
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
// import { useHistory } from 'react-router';
import { DrinksMenu_Page } from '../Helpers/helperString';
import { drinks_menu_item } from '../Helpers/menu';
import { dropdown_populate, grid_create } from '../Helpers/helper_functions';
import { Link } from 'react-router-dom';

export default function DrinksMenuList() {

    
    const item_loop = (items) => {

        const item_blank = {
            image: "",
            name: "",
            description: "",
            price: "",
            isDeleted: true,
            category:"",
            level: "",
            stockQuantity: 0,
        }
        
        let card_grid = grid_create(items,item_blank)
        return card_grid
    }

    const isAdmin = true;

    // const history = useHistory()
    
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [level, setLevel] = useState('');
    
    const handleSubmit = e => {
        e.preventDefault();
        const search_filter = {
            search:search,
            category:category,
            level:level,
        }
        console.log(search_filter);
    }


    return (
        <div>
            <div className="content">
                <h1>{DrinksMenu_Page.HEADING}</h1>
                <p>{DrinksMenu_Page.DESCRIPTION}</p>
            </div>
            <div className="form_css">
                <Form onSubmit = { handleSubmit }>
                    <Row className="g-2">
                        <Col md>
                            <FloatingLabel controlId="floatingSelectGrid" label="Category">
                                <Form.Select aria-label="Floating label select example" value = { category } onChange = { (e) => setCategory(e.target.value) }>
                                    <option>Select Category</option>
                                    {dropdown_populate(drinks_menu_item,"category")}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingSelectGrid" label="Alcohol Level">
                                <Form.Select aria-label="Floating label select example" value={ level } onChange = { (e) => setLevel(e.target.value) }>
                                    <option>Select Alcohol Level</option>
                                    {dropdown_populate(drinks_menu_item,"level")}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingInputGrid" label="Search">
                                <Form.Control type="text" placeholder="Search Drink Name" value={search} onChange = { (e) => { setSearch(e.target.value) }} />
                            </FloatingLabel>
                        </Col>
                        <Col md className="button_align">
                            <div className="search_reset">
                                <Col md style={{marginRight:"1%",marginLeft:"5%"}}>
                                    <Button variant="primary" type="submit"size="lg" >
                                        {DrinksMenu_Page.SEARCH}
                                    </Button>
                                </Col>
                                <Col md>
                                    <Button variant="primary" type="submit" size="lg">
                                        {DrinksMenu_Page.RESET}
                                    </Button>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
            {isAdmin?
                <div className="card_align">
                    <Link to="/addDrinks"><Button variant="primary" type="submit" size="lg">
                        {DrinksMenu_Page.ADD}
                    </Button></Link>
                </div>
                :
                null
            }
            
            <div className="card_align">
            {
                item_loop(drinks_menu_item)
            }    
            </div>
        </div>
    )
}
