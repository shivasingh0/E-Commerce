import { FloatingLabel, Form } from "react-bootstrap";
import './Style.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdateProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams()

    useEffect ( () => {
        getProductDetails();
    },[])
    
    // API Integration
    const getProductDetails = async () => {
        console.log(params);
        let result = await fetch(`http://localhost:5000/products/${params.id}`)
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

    const updateProduct = async () => {
        console.log(name, price, category, company);
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
