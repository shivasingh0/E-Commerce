import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import SignUpPage from "./pages/LoginSignup/SignUpPage";
import AddProduct from "./pages/AddUpdate Product/AddProduct";
import UpdateProduct from "./pages/AddUpdate Product/UpdateProduct";
import PrivateComponent from "./components/PrivateComponent";
import LoginPage from "./pages/LoginSignup/Login";
import ProductList from "./pages/ProductList/ProductList";
import Main from "./components/MainContent/Main";
import ProductData from "./pages/ProductData/ProductData";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element = { <Main/> } />
          <Route element={<PrivateComponent />}>
            <Route path="/products" element={ <ProductList/> } />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/updateproduct/:id" element={<UpdateProduct />} />
            <Route path="/productdata" element={<ProductData />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
