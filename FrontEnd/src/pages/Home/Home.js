import { Carousel } from "react-bootstrap";
import "./Home.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Home() {
  const [cardData, setCardData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  // const params = useParams()

  const navigate = useNavigate();

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

  // Navigate to Card Data Page
  const productData = (id) => {
    navigate(`/productData/${id}`)
  }

  return (
    <div style={{ backgroundColor: "#e6e5e5",minHeight: "calc(100vh - 100px)" }}>
      <Carousel className="crousel-wrapper" data-bs-theme="dark">
        <Carousel.Item className="crousel-item">
          <img
            className="d-block w-100 image"
            src="https://img.freepik.com/premium-psd/horizontal-website-banne_451189-110.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="crousel-item">
          <img
            className="d-block w-100 image"
            src="https://i.pinimg.com/1200x/e9/e4/b9/e9e4b906bd5282d31b24fae4876c880c.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="crousel-item">
          <img
            className="d-block w-100 image"
            src="https://img.freepik.com/premium-vector/modern-style-square-colorful-web-banner-design-premium-vector_656447-13.jpg"
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
              <div key={itemIndex} onClick={ (()=> productData(item._id))} className="card">
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

export default Home;
