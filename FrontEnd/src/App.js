import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import SignUpPage from "./pages/LoginSignup/SignUpPage";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Footer from "./components/Footer/Footer";
import PrivateComponent from "./components/PrivateComponent";
import LoginPage from "./pages/LoginSignup/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/updateproduct" element={<UpdateProduct />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
