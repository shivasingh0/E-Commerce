import React, { useEffect, useState } from "react";
import "./ProductData.css";
import { useParams } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

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
      <h1>Product Data</h1>
      <div className="main-container">
        {product ? (
          <div>
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
            <div className="right-container"></div>
          </div>
        ) : (
          <h1>Loading Data</h1>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
