import { FloatingLabel, Form } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Login API Integration
  const handleLogin = async () => {
    console.log(email,password);
    let result = await fetch('http://localhost:5000/login',{
      method : 'post',
      body : JSON.stringify({email,password}),
      headers : {
        'content-type' : 'application/json'
      }
    });
    result = await result.json();
    // console.log(result);
    if (result.auth) {
      localStorage.setItem('user',JSON.stringify(result.user))
      localStorage.setItem('token',JSON.stringify(result.auth))
      navigate('/')
    }else {
      alert('Enter valid details')
    }
  }

  return (
    <div className="Container">
      <h1>Log In</h1>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control
          className="input"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FloatingLabel>
      <button onClick={handleLogin} className="button">Login</button>
    </div>
  );
}

export default Login;
