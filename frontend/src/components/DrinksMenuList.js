import React, { useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import CardItem from './CardItem';


export default function DrinksMenuList() {

    const isAdmin = true;

    const history = useHistory()
    
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
                <h1>Drinks Menu</h1>
                <p>Drinks Menu List</p>
            </div>
            <div className="form_css">
                <Form onSubmit = { handleSubmit }>
                    <Row className="g-2">
                        <Col md>
                            <FloatingLabel controlId="floatingSelectGrid" label="Category">
                                <Form.Select aria-label="Floating label select example" value = { category } onChange = { (e) => setCategory(e.target.value) }>
                                    <option>Select Category</option>
                                    <option value="Beer">Beer</option>
                                    <option value="Wine">Wine</option>
                                    <option value="Whiskey">Whiskey</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingSelectGrid" label="Alcohol Level">
                                <Form.Select aria-label="Floating label select example" value={ level } onChange = { (e) => setLevel(e.target.value) }>
                                    <option>Select Alcohol Level</option>
                                    <option value="10">Less than 10</option>
                                    <option value="30">Less than 30, Greater than 10</option>
                                    <option value="50">Less than 50, Greater than 30</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingInputGrid" label="Search">
                            <Form.Control type="text" placeholder="Search Drink Name" value={search} onChange = { (e) => { setSearch(e.target.value) }} />
                            </FloatingLabel>
                        </Col>
                        <Col md className="button_align">
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit" size="lg">
                                    Search
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
            {isAdmin?
                <div className="card_align">
                    <Button variant="primary" type="submit" size="lg">
                        Add Drinks Item
                    </Button>
                </div>
                :
                null
            }
            <div className="card_align">
                <Row className="card_align">
                    <Col md>
                        <CardItem />
                    </Col>
                    <Col md>
                        <CardItem />
                    </Col>
                    <Col md>
                        <CardItem />
                    </Col>
                    <Col md>
                        <CardItem />
                    </Col>
                </Row>
                <Row className="card_align">
                    <Col md>
                        <CardItem />
                    </Col>
                    <Col md>
                        <CardItem />
                    </Col>
                    <Col md>
                        <CardItem />
                    </Col>
                    <Col md>
                        <CardItem />
                    </Col>
                </Row>
                
                </div>
        </div>
    )
}
