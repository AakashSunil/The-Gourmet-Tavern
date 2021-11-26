import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { FoodMenu_Page } from '../Helpers/helperString';
import { food_menu_item } from '../Helpers/menu';
import { dropdown_populate, grid_create } from '../Helpers/helper_functions';


export default function FoodMenuList() {

    const item_filter = (page_number,page_size) => {
        console.log(page_number);
        let filtered = food_menu_item.slice((page_number - 1) * page_size, page_number * page_size)
        console.log(filtered);
        return filtered
    }

    const [page,setPage] = useState(null);
    const [items,setItems] = useState(item_filter(1,6));
    
    const page_no_loop = (size,limit) => {
        let page_array =[]
        for(let i = 0;i < Math.ceil(size/limit);i++){
             page_array.push(i+1);
        }
        const buttons = page_array.map((ele,idx) => (
            <Button key={idx} onClick={() => handlePage(ele)}>{ele}</Button>
        ))
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
            cuisine: "",
            preference: "",
            stockQuantity: 0,
            ingredients: ""
        }
        
        let card_grid = grid_create(items,item_blank)
        return card_grid
    }

    
    const isAdmin = true;
    const history = useHistory()
    
    const [search, setSearch] = useState('');
    const [category_filter, setCategoryFilter] = useState('');
    const [cuisine_filter, setCuisineFilter] = useState('');
    const [preference_filter, setPreferenceFilter] = useState('');
    const [isOpen, setOpen] = useState(false);
    
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [isDeleted,setDeleted] = useState(false)
    const [category,setCategory] = useState('')
    const [cuisine,setCuisine] = useState('')
    const [preference,setPreference] = useState('')
    const [ingredients,setIngredients] = useState('')
    const [stockQuantity,setStockQuantity] = useState('')
    const [imageData,setImageData] = useState('')

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

    const handleFoodClose = () => {
        setOpen(false);
    }

    const handleFoodAdd = e => {
        const food_item = {
            name:name,
            description: description,
            price:price,
            isDeleted: isDeleted,
            category: category,
            cuisine:cuisine,
            preference:preference,
            ingredients:ingredients,
            stockQuantity:stockQuantity,
            imageData: imageData
        }
        console.log(food_item);
        history.push('/foodMenu');
        setOpen(false)
    }

    const getBase64 = (file) => {
        return new Promise((resolve) => {
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          reader.readAsDataURL(file);
    
          reader.onload = () => {
            baseURL = reader.result;
            setImageData(baseURL)
            resolve(baseURL);
          };
        });
      };

    const handleFileInput = (e) => {
        getBase64(e.target.files[0])
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
                            <FloatingLabel controlId="floatingSelectGrid" label="Category">
                                <Form.Select aria-label="Floating label select example" value = { category_filter } onChange = { (e) => setCategoryFilter(e.target.value) }>
                                    <option>Select Category</option>
                                    {dropdown_populate(food_menu_item,"category")}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingSelectGrid" label="Cuisine">
                                <Form.Select aria-label="Floating label select example" value={ cuisine_filter } onChange = { (e) => setCuisineFilter(e.target.value) }>
                                    <option>Select Cuisine</option>
                                    {dropdown_populate(food_menu_item,"cuisine")}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel controlId="floatingSelectGrid" label="Preference">
                                <Form.Select aria-label="Floating label select example" value={ preference_filter } onChange = { (e) => setPreferenceFilter(e.target.value) }>
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
            {isAdmin?
                <div className="card_align">
                    <Button variant="primary" type="submit" size="lg" onClick = {()=>setOpen(true)}>
                        {FoodMenu_Page.ADD}
                    </Button>
                </div>
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
                page_no_loop(food_menu_item.length,6)
            }    
            </div>
            <Modal
                show={isOpen}
                onHide={handleFoodClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>{FoodMenu_Page.ADD}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit = { handleFoodAdd }>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>{FoodMenu_Page.NAME}</Form.Label>
                            <Form.Control type="name" placeholder="Enter Food Name" value={name} onChange = { (e) => setName(e.target.value) } />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>{FoodMenu_Page.FOOD_IMAGE}</Form.Label>
                            <Form.Control type="file" onChange={(e) => handleFileInput(e)}/>
                        </Form.Group>  
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>{FoodMenu_Page.DESCRIPTION}</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter Food Description" value={description} onChange = { (e) => setDescription(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>{FoodMenu_Page.PRICE}</Form.Label>
                            <Form.Control type="number" placeholder="Enter Food Price" value={price} onChange = { (e) => setPrice(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>{FoodMenu_Page.CATEGORY}</Form.Label>
                            <Form.Control type = "text" placeholder="Enter Food Category" value={category} onChange = { (e) => setCategory(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>{FoodMenu_Page.CUISINE}</Form.Label>
                            <Form.Control type = "text" placeholder="Enter Food Cuisine" value={cuisine} onChange = { (e) => setCuisine(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>{FoodMenu_Page.PREFERENCE}</Form.Label>
                            <Form.Control type = "text" placeholder="Enter Food Preference" value={preference} onChange = { (e) => setPreference(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>{FoodMenu_Page.INGREDIENTS}</Form.Label>
                            <Form.Control type = "text" placeholder="Enter Food Ingredients" value={ingredients} onChange = { (e) => setIngredients(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>{FoodMenu_Page.STOCK_QUANTITY}</Form.Label>
                            <Form.Control type= "number" placeholder = "Enter Stock Quantity" value={stockQuantity} onChange = { (e) => setStockQuantity(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <div key={`default-checkbox`} className="mb-3">
                                <Form.Check type="checkbox" id={`default-checkbox`} label={`Food Item Deleted?`} value={isDeleted} onChange = { (e) => setDeleted(!isDeleted)}/>
                            </div>
                        </Form.Group>              
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleFoodClose}>{FoodMenu_Page.CANCEL}</Button>
                <Button variant="primary" onClick={handleFoodAdd}>{FoodMenu_Page.SUBMIT}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
