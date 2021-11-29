import React, { useState } from 'react'
import { Button, Col, Dropdown, FloatingLabel, Form, Pagination, Row } from 'react-bootstrap';
import { FoodMenu_Page } from '../Helpers/helperString';
import { food_menu_item } from '../Helpers/menu';
import { dropdown_populate, grid_create, itemPerPage, item_filter } from '../Helpers/helper_functions';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function FoodMenuList() {

    const isUser = useSelector(state => state.auth.user);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    let isAdmin;
    isUser === null? isAdmin = false : isAdmin = isUser.isAdmin

    const [page,setPage] = useState(1);
    const [totalList,setList] = useState(food_menu_item);
    const [pageItemLimitArray,setPageItemListArray] = useState(itemPerPage(totalList));
    const [pageItemLimit,setPageItemList] = useState(6);
    const [items,setItems] = useState(item_filter(totalList,page,6));
    
    const handlePage = (ele) => {
        setPage(ele)
        setItems(item_filter(totalList,ele,pageItemLimit))
    }

    const handleItemPerPage = (ele) => {
        setPageItemList(ele)
        setItems(item_filter(totalList,page,ele))
    }

    const page_no_loop = (size,limit) => {
        let page_array =[]
        let pages = Math.ceil(size/limit)
        for(let i = 0; i < pages; i++){
            page_array.push(i+1);
        }

        const buttons = 
        <>
            <Pagination>
                <Pagination.First disabled={page===1?true:false} onClick = {() => handlePage(1)}/>
                <Pagination.Prev disabled={(page-1) < 1?true:false} onClick = {() => handlePage(page-1)}/>
                {page_array.map((ele,idx) => {
                    return <Pagination.Item active={ele===page?true:false} onClick={() => handlePage(ele)}>{ele}</Pagination.Item>
                })}
                <Pagination.Next disabled={(page+1) > page_array.length?true:false} onClick = {() => handlePage(page+1)}/>
                <Pagination.Last disabled={page===page_array.length?true:false} onClick = {() => handlePage(page_array.length)}/>
            </Pagination>
            <Dropdown>
                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" >
                    {pageItemLimit}{FoodMenu_Page.ITEMS_PER_PAGE}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {pageItemLimitArray.map((ele) => {
                        return <Dropdown.Item onClick={()=>handleItemPerPage(ele)}>{ele}</Dropdown.Item>
                    })}
                </Dropdown.Menu>
            </Dropdown> 
        </>
        return buttons
    }
    
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
        
        let card_grid = grid_create(items,item_blank,isAdmin,"Food")
        return card_grid
    }
    
    const [search, setSearch] = useState('');
    const [category_filter, setCategoryFilter] = useState('');
    const [cuisine_filter, setCuisineFilter] = useState('');
    const [preference_filter, setPreferenceFilter] = useState('');
    
    const handleSubmit = e => {
        e.preventDefault();
        const search_filter = {
            search:search,
            category:category_filter,
            cuisine:cuisine_filter,
            preference:preference_filter
        }
        console.log(search_filter);
    }

    return (
        <div>
            <div className="Searching">
                <div className="content">
                    <h1>{FoodMenu_Page.HEADING}</h1>
                </div>
                <div className="form_css_menu">
                    <Form onSubmit = { handleSubmit }>
                        <Row className="g-1" lg>
                            <Col md>
                                <FloatingLabel label="Category">
                                    <Form.Select value = { category_filter } onChange = { (e) => setCategoryFilter(e.target.value) }>
                                        <option>{FoodMenu_Page.SELECT_CATEGORY}</option>
                                        {dropdown_populate(food_menu_item, FoodMenu_Page.CATEGORY)}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel label="Cuisine">
                                    <Form.Select value={ cuisine_filter } onChange = { (e) => setCuisineFilter(e.target.value) }>
                                        <option>{FoodMenu_Page.SELECT_CUISINE}</option>
                                        {dropdown_populate(food_menu_item,FoodMenu_Page.CUISINE)}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel label="Preference">
                                    <Form.Select value={ preference_filter } onChange = { (e) => setPreferenceFilter(e.target.value) }>
                                        <option>{FoodMenu_Page.SELECT_PREFERENCE}</option>
                                        {dropdown_populate(food_menu_item,FoodMenu_Page.PREFERENCE)}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel label="Search">
                                    <Form.Control type="text" placeholder = {FoodMenu_Page.PLACEHOLDER_SEARCH} value={search} onChange = { (e) => { setSearch(e.target.value) }} />
                                </FloatingLabel>
                            </Col>
                            <Col md className="button_align">
                                <div className="search_reset">
                                    <Col md>
                                        <Button variant="primary" type="submit" size="lg" >
                                            {FoodMenu_Page.SEARCH}
                                        </Button>
                                    </Col>
                                    <Col md>
                                        <Button variant="primary" type="submit" size="lg">
                                            {FoodMenu_Page.RESET}
                                        </Button>
                                    </Col>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
            {isAuthenticated? isAdmin?
                <div className="card_align">
                    <Link to="/addFood"><Button variant="primary" type="submit" size="lg">
                        {FoodMenu_Page.ADD}
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
                page_no_loop(food_menu_item.length,pageItemLimit)
            }    
            </div>
        </div>
    )
}
