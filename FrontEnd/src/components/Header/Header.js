import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";


// Validation ( login, logout, signUp )
function Header() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  function logout() {
    localStorage.clear();
    navigate("/signup");
  }

  return (
        <Navbar className="navbar" bg="dark" data-bs-theme="dark">
            { auth 
              ? <Nav className="me-auto nav_wrapper">
                  <Link to="/">Home</Link>
                  <Link to="/addproduct">Add Product</Link>
                  <Link to="/updateproduct">Update Product</Link>
                  <Link onClick={logout} to="/signup"> Log Out ({JSON.parse(auth).name}) </Link> 
                </Nav>
              :
                <Nav className="me-auto nav_wrapper nav-right" >
                  <Link to="/login">Login</Link>
                  <Link to="/signup">SignUp</Link>
                </Nav>
            }
        </Navbar>
    );
  }

  export default Header;
