import Form from "react-bootstrap/Form";
import "./AddUpdate.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState(["", "", "", ""]);

  const [error, setError] = useState(false);

  // API Integration
  const addProduct = async (e) => {
    e.preventDefault();
    // alert("Data added");

    if (
      !title ||
      !description ||
      !price ||
      !discountPercentage ||
      !rating ||
      !stock ||
      !brand ||
      !category ||
      !thumbnail ||
      !images
    ) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        images
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);

    window.alert('Data Added')
    navigate('/products')
  };

  return (
    <div className="container">
      <h1>Add Product</h1>
      <Form className="form-wrapper">
        <Form.Group className="mb-3" controlId="titleForm.ControlInput1">
          <Form.Label className="headline">Title</Form.Label>
          <Form.Control
            className="input"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
          />
        </Form.Group>
        {error && !title && (
          <span className="invalid-input">Enter a valid title</span>
        )}
        <Form.Group
          className="mb-3"
          controlId="discriptionForm.ControlTextarea1"
        >
          <Form.Label className="headline">Discription</Form.Label>
          <Form.Control
            className="input"
            as="textarea"
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </Form.Group>
        {error && !description && (
          <span className="invalid-input">Enter a valid description</span>
        )}
        <div className="flex-box">
          <Form.Group className="mb-3" controlId="priceForm.ControlInput1">
            <Form.Label className="headline">Price</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="price of product"
            />
          </Form.Group>
          {error && !price && (
            <span className="invalid-input">Enter a valid price</span>
          )}
          <Form.Group
            className="mb-3"
            controlId="discountPercentageForm.ControlInput1"
          >
            <Form.Label className="headline">Discount Percentage</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setDiscountPercentage(e.target.value)}
              placeholder="discount Percentage"
            />
          </Form.Group>
          {error && !discountPercentage && (
            <span className="invalid-input">
              Enter a valid discount percentage
            </span>
          )}
          <Form.Group className="mb-3" controlId="ratingForm.ControlInput1">
            <Form.Label className="headline">Rating</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setRating(e.target.value)}
              placeholder="rating"
            />
          </Form.Group>
          {error && !rating && (
            <span className="invalid-input">Enter a valid rating</span>
          )}
        </div>
        <div className="flex-box">
          <Form.Group className="mb-3" controlId="stockForm.ControlInput1">
            <Form.Label className="headline">Stock</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setStock(e.target.value)}
              placeholder="stocks available"
            />
          </Form.Group>
          {error && !stock && (
            <span className="invalid-input">Enter a valid stock</span>
          )}
          <Form.Group className="mb-3" controlId="brandForm.ControlInput1">
            <Form.Label className="headline">Brand</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setBrand(e.target.value)}
              placeholder="brand name"
            />
          </Form.Group>
          {error && !brand && (
            <span className="invalid-input">Enter a valid brand</span>
          )}
          <Form.Group className="mb-3" controlId="categoryForm.ControlInput1">
            <Form.Label className="headline">Category</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              placeholder="category"
            />
          </Form.Group>
          {error && !category && (
            <span className="invalid-input">Enter a valid category</span>
          )}
        </div>
        <Form.Group className="mb-3" controlId="thumbnailForm.ControlInput1">
          <Form.Label className="headline">Thumbnail</Form.Label>
          <Form.Control
            type="text"
            className="input"
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="thumbnail"
          />
        </Form.Group>
        {error && !thumbnail && (
          <span className="invalid-input">Enter a valid thumbnail</span>
        )}
        <Form.Group className="mb-3" controlId="imagesForm.ControlInput1">
          <Form.Label className="headline">Images URL</Form.Label>
          <div className="flex-box">
            <Form.Control
              type="text"
              className="input"
              onChange={(e) => setImages(e.target.value)}
              placeholder="url 1"
            />
            {error && !images && (
              <span className="invalid-input">Enter a valid URL</span>
            )}
            <Form.Control
              type="text"
              className="input"
              onChange={(e) => setImages(e.target.value)}
              placeholder="url 2"
            />
          </div>
          {error && !images && (
            <span className="invalid-input">Enter a valid URL</span>
          )}
          <div className="flex-box">
            <Form.Control
              type="text"
              className="input"
              onChange={(e) => setImages(e.target.value)}
              placeholder="url 3"
            />
            {error && !images && (
              <span className="invalid-input">Enter a valid URL</span>
            )}
            <Form.Control
              type="text"
              className="input"
              onChange={(e) => setImages(e.target.value)}
              placeholder="url 4"
            />
          </div>
          {error && !images && (
            <span className="invalid-input">Enter a valid URL</span>
          )}
        </Form.Group>
        {/* { error && !name && <span className="invalid-input">Enter a valid name</span> } */}
        <button onClick={addProduct} className="button">
          Add Product
        </button>
      </Form>
    </div>
  );
}

export default AddProduct;
