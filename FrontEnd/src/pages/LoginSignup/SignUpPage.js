import "./LoginSignup.css";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Signup validation
  useEffect(()=>{
    const auth = localStorage.getItem('user')
    if (auth) {
      navigate('/')
    }
  })

  // SignUp API Integration
  const collectionData = async () =>{
    console.log(name,email,password);
    let result = await fetch('http://localhost:5000/register',{
      method: 'post',
      body: JSON.stringify({name,email,password}),
      headers:{
        'content-type': 'application/json'
      }
    })
    result = await result.json();
    console.log(result);
    localStorage.setItem('user', JSON.stringify(result))
      navigate('/')
  }


  return (
    <div className="Container">
      <h1>Sign-Up Page</h1>

      <FloatingLabel
        controlId="floating-Input"
        label="Your Full name"
        className="mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      >
        <Form.Control
          type="text"
          className="input"
          placeholder="Your Full name"
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      >
        <Form.Control
          type="email"
          className="input"
          placeholder="name@example.com"
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingPassword"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      >
        <Form.Control
          type="password"
          className="input"
          placeholder="Password"
        />
      </FloatingLabel>
      <Button onClick={collectionData} className="button" variant="outline-dark">
        Sign-Up
      </Button>
    </div>
  );
}

export default SignUpPage;
