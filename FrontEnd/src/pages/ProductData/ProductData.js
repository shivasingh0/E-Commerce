import React, { useEffect } from "react";
import "./ProductData.css";
// import { useParams } from "react-router-dom";

function ProductCard() {
  // const {id} = useParams();

  useEffect(()=>{
    getCardData();
  },[]);

  const getCardData = async(id) =>{
    let result = await fetch(`http://localhost:5000/products/${id}`,{
      method : 'GET',
      headers : {
        'Content-Type': 'aplication/json'
      }
    })
    result = await result.json();
    console.log(result);
  }

  return (
    <div className="card-container">
      <h1>Product Data</h1>
    </div>
  );
}

export default ProductCard;
