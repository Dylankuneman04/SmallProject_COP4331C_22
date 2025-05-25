function Login() {

  return (
    <form action="">
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" placeholder="username" id="username" name="username" required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" placeholder="username" id="password" name="password" required />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default Login;