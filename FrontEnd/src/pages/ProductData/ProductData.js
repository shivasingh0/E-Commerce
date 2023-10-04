import React, { useEffect, useState } from "react";
import "./ProductData.css";
import { useParams } from "react-router-dom";
import { Carousel } from "react-bootstrap";

function ProductCard() {
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getCardData();
  }, []);

  const getCardData = async (id) => {
    try {
      let result = await fetch(`http://localhost:5000/products/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "aplication/json",
        },
      });

      // console.log(result);
      if (result.ok) {
        result = await result.json();
        setProduct(result);
      } else {
        console.log("Data not found");
      }
    } catch (error) {
      console.log("Error to fetch");
    }
  };

  return (
    <div className="card-container">
      <h1>Product Data</h1>
      <>
        {product ? (
          <>
            <div className="left-container">
              {product.images.length === 1 ? (
                <img src={product.images[0]} alt="" />
              ) : (
                <Carousel data-bs-theme="dark" className="w-50">
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={product.images[0]}
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={product.images[1]}
                      alt="Second slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={product.images[2]}
                      alt="Third slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={product.images[3]}
                      alt="Third slide"
                    />
                  </Carousel.Item>
                </Carousel>
              )}
            </div>
            <div className="right-container"></div>
          </>
        ) : (
          <h1>Loading Data</h1>
        )}
      </>
    </div>
  );
}

export default ProductCard;
