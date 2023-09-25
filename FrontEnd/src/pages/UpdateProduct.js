import { FloatingLabel, Form } from "react-bootstrap";
import './Style.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams()
    const navigate = useNavigate()

    useEffect ( () => {
        getProductDetails();
    },[])
    
    // API Integration [ Prefilling ]
    const getProductDetails = async () => {
        console.log(params);
        let result = await fetch(`http://localhost:5000/products/${params.id}`)
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

    //  API Integration { update existing data }
    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5000/products/${params.id}`,{
            method : 'put',
            body : JSON.stringify( {name,price,category,company} ),
            headers :{
                'Content-Type' : 'Application/json'
            }
        })
        result = await result.json();
        console.log(result);
        navigate('/products')
    }

  return (
    <div className="Container">
      <h1>Update Product</h1>
      <FloatingLabel
        controlId="floatingInput"
        label="Enter product name"
        className="mb-3"
      >
        <Form.Control
          className="input"
          type="text"
          onChange={ (e)=>setName(e.target.value) }
          value={name}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Enter product price"
        className="mb-3"
      >
        <Form.Control
          className="input"
          type="text"
          onChange={ (e)=>setPrice(e.target.value) }
          value={price}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Enter product category"
        className="mb-3"
      >
        <Form.Control
          className="input"
          type="text"
          onChange={ (e)=>setCategory(e.target.value) }
          value={category}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Enter product company"
        className="mb-3"
      >
        <Form.Control
          className="input"
          type="text"
          onChange={ (e)=>setCompany(e.target.value) }
          value={company}
        />
      </FloatingLabel>
      <button onClick={updateProduct} className="button">Add Product</button>
    </div>
  );
}

export default UpdateProduct;
