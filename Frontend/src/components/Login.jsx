import React, { useState, useEffect } from "react"; // Import useEffect
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data from local storage
    if (user) {
      navigate("/"); // Redirect to the home page if the user is already logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        console.error(result.error);
        alert("Incorrect Password!"); // Show an alert box
        navigate("/signup"); 
      } else {
        // Store the user data in local storage and navigate to the home page
        localStorage.setItem("user", JSON.stringify(result));
        navigate("/"); // Redirect to home page on successful login
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="col-md-4">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleLogin}>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
