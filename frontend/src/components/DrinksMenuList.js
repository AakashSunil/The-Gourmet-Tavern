import React, { useState } from 'react'
import { Button, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { DrinksMenu_Page } from '../Helpers/helperString';
import { drinks_menu_item } from '../Helpers/menu';
import { dropdown_populate, grid_create } from '../Helpers/helper_functions';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DrinksMenuList() {
    
    const isUser = useSelector(state => state.auth.user);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    let isAdmin;
    isUser===null?isAdmin=false:isAdmin=isUser.isAdmin

    const item_filter = (page_number,page_size) => {
        console.log(page_number);
        let filtered = drinks_menu_item.slice((page_number - 1) * page_size, page_number * page_size)
        console.log(filtered);
        return filtered
    }
    
    const [page,setPage] = useState(null);
    const [items,setItems] = useState(item_filter(1,6));
    
    const page_no_loop = (size,limit) => {
        let page_array =[]
        let pages = Math.ceil(size/limit)
        if(pages <= 9) {
            for(let i = 0;i < pages;i++){
                page_array.push(i+1);
           }
        }
        else {

        }
        const buttons = page_array.map((ele,idx) => {
            return <Button key={idx} onClick={() => handlePage(ele)}>{ele}</Button>
        })
        return buttons
    }

    const handlePage = (ele) => {
        setPage(ele)
        setItems(item_filter(ele,6))

    }
    
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
        
        let card_grid = grid_create(items,item_blank,isAdmin)
        return card_grid
    }



    const [search, setSearch] = useState('');
    const [category_filter, setCategoryFilter] = useState('');
    const [level_filter, setLevelFilter] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        const search_filter = {
            search:search,
            category:category_filter,
            level:level_filter,
        }
        console.log(search_filter);
    }
    
    return (
        <div>
            <div className="content">
                <h1>{DrinksMenu_Page.HEADING}</h1>
            </div>
            <div className="form_css_menu">
                <Form onSubmit = { handleSubmit }>
                    <Row className="g-2">
                        <Col md>
                            <FloatingLabel controlId="floatingSelectGrid" label="Category">
                                <Form.Select aria-label="Floating label select example" value = { category_filter } onChange = { (e) => setCategoryFilter(e.target.value) }>
                                    <option>Select Category</option>
                                    {dropdown_populate(drinks_menu_item,"category")}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingSelectGrid" label="Alcohol Level">
                                <Form.Select aria-label="Floating label select example" value={ level_filter } onChange = { (e) => setLevelFilter(e.target.value) }>
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
                                <Col md >
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
            {isAuthenticated? isAdmin?
                <div className="card_align">
                    <Link to="/addDrinks"><Button variant="primary" type="submit" size="lg">
                        {DrinksMenu_Page.ADD}
                    </Button></Link>
                </div>
                :
                null
                :
                null
            }
            
            <div className="card_align">
            {
                item_loop(items)
            }    
            </div>
            <div className="pagination_align">
            {
                page_no_loop(drinks_menu_item.length,6)
            }    
            </div>
            
        </div>
    )
}
