import { FloatingLabel, Form } from "react-bootstrap";
import '../Style.css'
import { useState } from "react";

function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");

    // API Integration
    const addProduct = async () => {
      const userId = JSON.parse(localStorage.getItem('user'))._id
      let result = await fetch('http://localhost:5000/add-product', {
            method : 'post',
            body : JSON.stringify( {name,price,category,company,userId} ),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        result = await result.json();
        console.log(result);
    }

  return (
    <div className="Container">
      <h1>Add</h1>
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
      <button onClick={addProduct} className="button">Add Product</button>
    </div>
  );
}

export default AddProduct;
