import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {

  const handleLogin = (event) => {
    event.preventDefault();
    // Here you would typically handle the login logic, e.g., API call

    setError('Login failed. Wrong username or Password'); // Use this to show an error message

    console.log("Login submitted");
  };

  const [error, setError] = useState('');
  //setError(''); // Reset error state on component mount
  //setError('Invalid username or password'); // Example error message


  return (
    <>
    
      <form onSubmit={handleLogin}> 
        <h2>Login</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" placeholder="username" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" placeholder="password" id="password" name="password" required />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        {error && <p className="error" style={{color: "red"}}>{error}</p>} 
      </form>

      <div className="Login-footer">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
      <Link to="/">
        <button>Return Home</button>
      </Link>
      
    </>
  );
}

export default Login;