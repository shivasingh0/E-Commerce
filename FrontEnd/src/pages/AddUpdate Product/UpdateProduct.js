import { Form } from "react-bootstrap";
import "./AddUpdate.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProduct() {
  const navigate = useNavigate();
  const params = useParams();

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

  useEffect(() => {
    getProductDetails();
  }, []);

  // API Integration [ Prefilling ]
  const getProductDetails = async () => {
    console.log(params);
    let result = await fetch(`http://localhost:5000/products/${params.id}`);
    result = await result.json();
    setTitle(result.title);
    setDescription(result.description);
    setPrice(result.price);
    setDiscountPercentage(result.discountPercentage);
    setRating(result.rating);
    setStock(result.stock);
    setBrand(result.brand);
    setCategory(result.category);
    setThumbnail(result.thumbnail);
    setImages(result.images);
  };

  //  API Integration { update existing data }
  const updateProduct = async () => {
    window.alert("Data Updated");
    navigate("/products");
    let result = await fetch(`http://localhost:5000/products/${params.id}`, {
      method: "put",
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
        images,
      }),
      headers: {
        "Content-Type": "Application/json",
      },
    });
    result = await result.json();
    console.log(result);
  };

  return (
    <div className="container">
      <h1>Update Product</h1>
      <Form className="form-wrapper">
        <Form.Group className="mb-3" controlId="titleForm.ControlInput1">
          <Form.Label className="headline">Title</Form.Label>
          <Form.Control
            className="input"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
            value={title}
          />
        </Form.Group>
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
            value={description}
          />
        </Form.Group>
        <div className="flex-box">
          <Form.Group className="mb-3" controlId="priceForm.ControlInput1">
            <Form.Label className="headline">Price</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="price of product"
              value={price}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="discountPercentageForm.ControlInput1"
          >
            <Form.Label className="headline">Discount Percentage</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setDiscountPercentage(e.target.value)}
              placeholder="discount Percentage"
              value={discountPercentage}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="ratingForm.ControlInput1">
            <Form.Label className="headline">Rating</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setRating(e.target.value)}
              placeholder="rating"
              value={rating}
            />
          </Form.Group>
        </div>
        <div className="flex-box">
          <Form.Group className="mb-3" controlId="stockForm.ControlInput1">
            <Form.Label className="headline">Stock</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setStock(e.target.value)}
              placeholder="stocks available"
              value={stock}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="brandForm.ControlInput1">
            <Form.Label className="headline">Brand</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setBrand(e.target.value)}
              placeholder="brand name"
              value={brand}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="categoryForm.ControlInput1">
            <Form.Label className="headline">Category</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setCategory(e.target.value)}
              placeholder="category"
              value={category}
            />
          </Form.Group>
        </div>
        <Form.Group className="mb-3" controlId="thumbnailForm.ControlInput1">
          <Form.Label className="headline">Thumbnail</Form.Label>
          <Form.Control
            type="text"
            className="input"
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="thumbnail"
            value={thumbnail}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="imagesForm.ControlInput1">
          <Form.Label className="headline">Images URL</Form.Label>
          <div className="flex-box">
            <Form.Control
              type="text"
              className="input"
              onChange={(e) => setImages(e.target.value)}
              placeholder="url 1"
              value={images[0]}
            />
            <Form.Control
              type="text"
              className="input"
              onChange={(e) => setImages(e.target.value)}
              placeholder="url 2"
              value={images[1]}
            />
          </div>
          <div className="flex-box">
            <Form.Control
              type="text"
              className="input"
              onChange={(e) => setImages(e.target.value)}
              placeholder="url 3"
              value={images[2]}
            />
            <Form.Control
              type="text"
              className="input"
              onChange={(e) => setImages(e.target.value)}
              placeholder="url 4"
              value={images[3]}
            />
          </div>
        </Form.Group>
        <button
          onClick={updateProduct}
          className="button"
        >
          Update Product
        </button>
      </Form>
    </div>
  );
}

export default UpdateProduct;
