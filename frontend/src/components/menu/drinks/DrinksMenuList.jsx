import React, { useState } from "react";
import {
  Col,
  FloatingLabel,
  Form,
  Row,
  Button,
  Pagination,
  Dropdown,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  dropdown_populate,
  grid_create,
} from "../../../helpers/helperFunctions";
import {
  Add_Edit_Drink_Page,
  DrinksMenu_Page,
} from "../../../helpers/HelperString";
import { addDrink } from "../../../store/actions/productActions";
import AddDrinkItem from "./AddDrinkItem";

const DrinksMenuList = (props) => {

  const isUser = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  // const token = localStorage.getItem('token');

  let isAdmin;
  isUser === null? isAdmin = false : isAdmin = isUser.isAdmin

  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  let admin_privilege = props.isAdmin;
  let authenticated = props.isAuthenticated;
  let items_list = props.items;

  const page_no_loop = (size, limit) => {
    let page_array = [];
    let pages = Math.ceil(size / limit);
    for (let i = 0; i < pages; i++) {
      page_array.push(i + 1);
    }

    const buttons = (
      <>
        <Pagination>
          <Pagination.First
            disabled={props.page === 1 ? true : false}
            onClick={() => props.handlePage(1)}
          />
          <Pagination.Prev
            disabled={props.page - 1 < 1 ? true : false}
            onClick={() => props.handlePage(props.page - 1)}
          />
          {page_array.map((ele, idx) => {
            return (
              <Pagination.Item
                active={ele === props.page ? true : false}
                onClick={() => props.handlePage(ele)}
              >
                {ele}
              </Pagination.Item>
            );
          })}
          <Pagination.Next
            disabled={props.page + 1 > page_array.length ? true : false}
            onClick={() => props.handlePage(props.page + 1)}
          />
          <Pagination.Last
            disabled={props.page === page_array.length ? true : false}
            onClick={() => props.handlePage(page_array.length)}
          />
        </Pagination>
        <Dropdown>
          <Dropdown.Toggle split variant="success" id="dropdown-split-basic">
            {props.pageItemLimit}
            {DrinksMenu_Page.ITEMS_PER_PAGE}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {props.pageItemLimitArray.map((ele) => {
              return (
                <Dropdown.Item onClick={() => props.handleItemPerPage(ele)}>
                  {ele}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
    return buttons;
  };

  const item_loop = (items) => {
    const item_blank = {
      image: "",
      name: "",
      description: "",
      price: "",
      isDeleted: true,
      category: "",
      level: "",
      stockQuantity: 0,
    };
    let card_grid = grid_create(items, item_blank, admin_privilege, isAuthenticated, "Drinks");
    return card_grid;
  };

  const [search, setSearch] = useState("");
  const [category_filter, setCategoryFilter] = useState("");
  const [level_filter, setLevelFilter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const search_filter = {
      search: search,
      category: category_filter,
      level: level_filter,
    };
    console.log(search_filter);
  };

  const [addOpen, setAddOpen] = useState(false);

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    console.log("close");
    setAddOpen(false);
  };

  const handleAddDrinkSubmit = (value) => {
    dispatch(addDrink(value,token))
    setAddOpen(false);
  };
  return (
    <>
      <div>
        <div className="content">
          <h1>{DrinksMenu_Page.HEADING}</h1>
        </div>
        <div className="form_css_menu">
          <Form onSubmit={() => handleSubmit()}>
            <Row className="g-2">
              <Col md>
                <FloatingLabel label="Category">
                  <Form.Select
                    value={category_filter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option>{DrinksMenu_Page.SELECT_CATEGORY}</option>
                    {dropdown_populate(props.full_item_list, DrinksMenu_Page.CATEGORY)}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              {/* <Col md>
                <FloatingLabel label="Alcohol Level">
                  <Form.Select
                    value={level_filter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                  >
                    <option>{DrinksMenu_Page.SELECT_ALCOHOL_LEVEL}</option>
                    {dropdown_populate(props.full_item_list, DrinksMenu_Page.LEVEL)}
                  </Form.Select>
                </FloatingLabel>
              </Col> */}
              <Col md>
                <FloatingLabel label="Search">
                  <Form.Control
                    type="text"
                    placeholder={DrinksMenu_Page.PLACEHOLDER_SEARCH}
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                </FloatingLabel>
              </Col>
              <Col md className="button_align">
                <div className="search_reset">
                  <Col md>
                    <Button variant="primary" type="submit" size="lg">
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
        {authenticated ? (
          admin_privilege ? (
            <div className="card_align">
              <Button
                variant="primary"
                type="submit"
                size="lg"
                onClick={() => handleAddOpen()}
              >
                {DrinksMenu_Page.ADD}
              </Button>
            </div>
          ) : null
        ) : null}
        <Modal
          show={addOpen}
          onHide={()=>handleAddClose()}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{Add_Edit_Drink_Page.ADD_DRINK}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddDrinkItem
              add={(val) => handleAddDrinkSubmit(val)}
              close={() => handleAddClose()}
            />
          </Modal.Body>
        </Modal>
        <div className="card_align">{item_loop(items_list)}</div>
        <div className="pagination_align">
          {page_no_loop(props.full_item_list.length, props.pageItemLimit)}
        </div>
      </div>
    </>
  );
};

export default DrinksMenuList;
