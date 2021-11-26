import React, { useEffect, useState } from 'react'
import { Button, Col, FloatingLabel, Form, Modal, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { DrinksMenu_Page } from '../Helpers/helperString';
import { drinks_menu_item } from '../Helpers/menu';
import { dropdown_populate, grid_create } from '../Helpers/helper_functions';

export default function DrinksMenuList() {

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
        
        let card_grid = grid_create(items,item_blank)
        return card_grid
    }

    const isAdmin = true;
    const history = useHistory()

    const [search, setSearch] = useState('');
    const [category_filter, setCategoryFilter] = useState('');
    const [level_filter, setLevelFilter] = useState('');
    const [isOpen, setOpen] = useState(false);
    

    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [isDeleted,setDeleted] = useState(false)
    const [category,setCategory] = useState('')
    const [level,setLevel] = useState('')
    const [stockQuantity,setStockQuantity] = useState('')
    const [imageData,setImageData] = useState('')

    const handleSubmit = e => {
        e.preventDefault();
        const search_filter = {
            search:search,
            category:category,
            level:level,
        }
        console.log(search_filter);
    }

    const handleDrinkClose = () => {
        setOpen(false);
    }

    const handleDrinkAdd = e => {
        const drink_item = {
            name:name,
            description: description,
            price:price,
            isDeleted: isDeleted,
            category: category,
            level: level,
            stockQuantity:stockQuantity,
            imageData: imageData
        }
        console.log(drink_item);
        history.push("/drinksMenu")
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
            {isAdmin?
                <div className="card_align">
                    <Button variant="primary" type="submit" size="lg" onClick={()=>setOpen(true)}>
                        {DrinksMenu_Page.ADD}
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
                page_no_loop(drinks_menu_item.length,6)
            }    
            </div>
            <Modal
                show={isOpen}
                onHide={handleDrinkClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{DrinksMenu_Page.ADD_DRINK}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit = { handleDrinkAdd }>
                        <Form.Group className="mb-3">
                            <Form.Label>{DrinksMenu_Page.NAME}</Form.Label>
                            <Form.Control type="name" placeholder="Enter Drink Name" value={name} onChange = { (e) => setName(e.target.value) } />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{DrinksMenu_Page.DRINK_IMAGE}</Form.Label>
                            <Form.Control type="file" onChange={(e) => handleFileInput(e)}/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{DrinksMenu_Page.DESCRIPTION}</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter Drink Description" value={description} onChange = { (e) => setDescription(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{DrinksMenu_Page.PRICE}</Form.Label>
                            <Form.Control type="number" placeholder="Enter Price" value={price} onChange = { (e) => setPrice(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{DrinksMenu_Page.CATEGORY}</Form.Label>
                            <Form.Control type = "text" placeholder="Enter Category" value={category} onChange = { (e) => setCategory(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{DrinksMenu_Page.LEVEL}</Form.Label>
                            <Form.Control type= "text" placeholder = "Enter Alcohol Percentage" value={level} onChange = { (e) => setLevel(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>{DrinksMenu_Page.STOCK_QUANTITY}</Form.Label>
                            <Form.Control type= "number" placeholder = "Enter Stock Quantity" value={stockQuantity} onChange = { (e) => setStockQuantity(e.target.value) }/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <div key={`default-checkbox`} className="mb-3">
                                <Form.Check type="checkbox" id={`default-checkbox`} label={`Drink Item Deleted?`} value={isDeleted} onChange = { (e) => setDeleted(!isDeleted)}/>
                            </div>
                        </Form.Group>      
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleDrinkClose}>{DrinksMenu_Page.CANCEL}</Button>
                    <Button variant="primary" onClick={handleDrinkAdd}>{DrinksMenu_Page.SUBMIT}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
