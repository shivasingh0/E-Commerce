import React, { useEffect, useState } from "react";
import "./ProductData.css";
import { useParams } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Footer from "../../components/Footer/Footer";

function ProductCard() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    getCardData();
  }, []);

  const getCardData = async () => {
    try {
      let result = await fetch(`http://localhost:5000/products/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.ok) {
        result = await result.json();
        setProduct(result);
      } else {
        console.log("Data not found");
      }
    } catch (error) {
      console.log("Error fetching data");
    }
  };

  const handleNextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? product.images.length - 1 : prevImage - 1
    );
  };

  return (
    <div className="card-container">
      {product ? (
        <>
          <h1 className="category"> {product.category} </h1>
          <div className="main-container">
            <div className="left-container">
              {product.images.length === 1 ? (
                <img
                  className="image"
                  src={product.images[0] || [1] || [2] || [3]}
                  alt="img"
                />
              ) : (
                <div className="carousel">
                  <BsChevronLeft
                    className="left-button"
                    onClick={handlePrevImage}
                  />
                  <img
                    src={product.images[currentImage]}
                    alt={`Slide ${currentImage + 1}`}
                    className="image"
                  />
                  <BsChevronRight
                    className="right-button"
                    onClick={handleNextImage}
                  />
                </div>
              )}
            </div>
            <div className="right-container">
              <div className="title-div">
                <h1>
                  {product.title} <br /> ( {product.brand} )
                </h1>
                <p className="rating">{product.rating} * </p>
                <span>Rating</span>
              </div>
              <p className="description"> {product.description} </p>
              <p className="discount">
                Extra ₹{product.discountPercentage} off
              </p>
              <p className="price"> ₹{product.price} /- </p>
              <p>+ ₹51 secured packaging fee </p>
              <p className="stocks"> Stock available : {product.stock} </p>
              <div className="buttons">
                <a href="/buttons/43" class="btn41-43 btn-43">
                  Add to cart
                </a>
                <a href="/buttons/42" class="btn41-43 btn-42">
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>Loading Data</h1>
      )}
      <Footer />
    </div>
  );
}

export default ProductCard;
