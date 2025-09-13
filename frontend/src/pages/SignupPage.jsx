import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";

export default function SignupPage() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Account created successfully!");
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={signupData.username}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={signupData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={signupData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signupData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Re-enter Password"
          value={signupData.confirmPassword}
          onChange={handleChange}
          required
        />
        <select name="role" value={signupData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/" className="toggle-link">Already have an account? Login</Link>
    </div>
  );
}
