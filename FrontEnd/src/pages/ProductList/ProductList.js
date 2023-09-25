import './ProductList.css'
import { Form, Col, Row, Button } from 'react-bootstrap';

import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

function ProductList() {

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProduct();
    },[])

    // Get product API Integration
    const getProduct = async () =>{
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProducts(result)
    }

    // Delete product API Integration
    const deleteProduct = async (id) =>{
        let result = await fetch(`http://localhost:5000/products/${id}`,{
            method : 'Delete'
        });
        result = await result.json();
        if(result){
            getProduct();  // Call again updated / remaining products  
        }
    }

    // Search product API Integration
    const searchProduct = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`)
            result = await result.json();
         if (result) {
            setProducts(result);
        }
    } else {
            getProduct();
        }
    }

    return (
        <div className='product-list'>
            <div className='search-wrapper'>
                <h1>Product List</h1>
                <Form inline>
                    <Row>
                        <Col xs="auto">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className=" mr-sm-2 search"
                                onChange={searchProduct}
                            />
                        </Col>
                    </Row>
                </Form>
        </div>
            <table className='table' border={'2px'}>
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Company</th>
                        <th>Price</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>
                   
                    {
                      products.length > 0 ? products.map((item,index)=>
                            <tr key={index}>
                                <td> {index + 1} </td>
                                <td> {item.name} </td>
                                <td> {item.category} </td>
                                <td> {item.company} </td>
                                <td>Rs {item.price} </td>
                                <td> <button onClick={()=>deleteProduct(item._id)} >Delete</button> </td>
                                <td> <Link to={`/updateproduct/${item._id}`} >Update</Link> </td>
                           </tr>
                        ) 
                        : <h1>No Result Found</h1>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProductList;