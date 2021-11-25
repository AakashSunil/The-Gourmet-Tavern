import React, { useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import { useHistory } from 'react-router';
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import CardItem from './CardItem';
import { FoodMenu_Page } from '../Helpers/helperString';


export default function FoodMenuList() {

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
                                    <option value="Appetizers">Appetizers</option>
                                    <option value="Main Courses">Main Courses</option>
                                    <option value="Desserts">Desserts</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingSelectGrid" label="Cuisine">
                                <Form.Select aria-label="Floating label select example" value={ cuisine } onChange = { (e) => setCuisine(e.target.value) }>
                                    <option>Select Cuisine</option>
                                    <option value="Continental">Continental</option>
                                    <option value="Italian">Italian</option>
                                    <option value="Indian">Indian</option>
                                    <option value="American">American</option>
                                    <option value="European">European</option>
                                    <option value="Chinese">Chinese</option>
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingSelectGrid" label="Preference">
                                <Form.Select aria-label="Floating label select example" value={ preference } onChange = { (e) => setPreference(e.target.value) }>
                                    <option>Select Preference</option>
                                    <option value="Vegetarian">{FoodMenu_Page.VEG}</option>
                                    <option value="Non-Vegetarian">{FoodMenu_Page.NON_VEG}</option>
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
