import { FloatingLabel, Form } from "react-bootstrap";
import '../Style.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    // API Integration
    const addProduct = async () => {
      alert('Data added')

      if (!name || !price || !category || !company) {
        setError(true)
        return  false
      }

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
     { error && !name && <span className="invalid-input">Enter a valid name</span> }
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
      { error && !price && <span className="invalid-input">Enter a valid price</span> }
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
      { error && !category && <span className="invalid-input">Enter a valid category</span> }
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
      { error && !company && <span className="invalid-input">Enter a valid company</span> }
      <button onClick={addProduct} className="button">Add Product</button>
    </div>
  );
}

export default AddProduct;
