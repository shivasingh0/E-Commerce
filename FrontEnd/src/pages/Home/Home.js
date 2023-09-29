import { Carousel } from "react-bootstrap";
import "./Home.css";
import { useEffect, useState } from "react";

function DarkVariantExample() {
  const [cardData, setCardData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const fetchProductsByCategory = async (category) => {
    try {
      const response = await fetch(
        `http://localhost:5000/card?category=${category}`
      );
      if (response.ok) {
        const data = await response.json();
        setCardData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductsByCategory(selectedCategory);
  }, []);

  // Function to group products by category
  const groupProductsByCategory = () => {
    const groupedProducts = {};
    cardData.forEach((item) => {
      const category = item.category;
      if (!groupedProducts[category]) {
        groupedProducts[category] = [];
      }
      groupedProducts[category].push(item);
    });
    return groupedProducts;
  };

  const groupedProducts = groupProductsByCategory();

  return (
    <div style={{ backgroundColor: "#e6e5e5" }}>
      <Carousel className="crousel-wrapper" data-bs-theme="dark">
        <Carousel.Item className="crousel-item">
          <img
            className="d-block w-100 image"
            src="https://d2r2ijn7njrktv.cloudfront.net/apnlive/uploads/2021/10/26145125/apple-iphone-12-color-blue-10132020-big-carousel-jpg-large-2x-1602613411-1024x514.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="crousel-item">
          <img
            className="d-block w-100"
            src="https://soliloquywp.com/wp-content/uploads/2019/03/nb_wcs_cover.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="crousel-item">
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1502136969935-8d8eef54d77b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcm91c2VsfGVufDB8fDB8fHww&w=1000&q=80"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h5>Third slide label</h5>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* Cards */}
      {Object.entries(groupedProducts).map(([category, products], index) => (
        <div key={index} className="card-wrapper">
          <h2 className="title">{category}</h2>
          <div className="card-flex">
            {products.map((item, itemIndex) => (
              <div key={itemIndex} className="card">
                <img src={item.images[0]} alt="" />
                <div className="card-text">
                  <p className="title">{item.title}</p>
                  <p> <b>Rs:</b> {item.price}</p>
                  <p> <b>Rating:</b> {item.rating} / 5</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DarkVariantExample;
