function NavigationBar() {
  return (
    <nav className="navbar">
      <div>
        <ul className="flex space-x-4">
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="https://github.com/Dylankuneman04/SmallProject_COP4331C_22">Repo</a></li>
        </ul>
      </div>
    </nav>
  );
}

// If logged in, show the user's name and a logout button
// Possibly make a separate navbar component for logged in users

export default NavigationBar;