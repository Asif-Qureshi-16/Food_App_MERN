import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/"); // Redirect to home page if the user is already logged in
    }
  }, [navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const addUser = { name, email, age, password };

    try {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        body: JSON.stringify(addUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
      } else {
        console.log(result);
        navigate("/login"); // Redirect to login page on successful signup
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }

    // Clear form fields
    setName("");
    setEmail("");
    setAge("");
    setPassword("");
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="col-md-4">
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="signupName">Name</label>
            <input
              type="text"
              className="form-control"
              id="signupName"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="signupAge">Age</label>
            <input
              type="text"
              className="form-control"
              id="signupAge"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="signupEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="signupEmail"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="signupPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="signupPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
