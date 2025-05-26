import { Link } from "react-router-dom";

function Register() {
    
  return (
    <>
      <form action="">
        <h2>Register</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" placeholder="username" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" placeholder="password" id="password" name="password" required />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
      <div className="Register-footer">
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </div>
      <Link to="/">
        <button>Return Home</button>
      </Link>
    </>
  );    
}

export default Register;