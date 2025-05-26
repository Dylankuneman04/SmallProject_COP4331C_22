import './App.css'
import { Link } from 'react-router-dom'

function App() {
  return (
    <>
      <div className="App">

        <header className="App-header">
          <h1>Galactic Contacts</h1>
        </header>
        <div className='App-content'>
          <p>Welcome to Galactic Contacts! This is a simple React application that allows you to manage your contacts.</p>
          <p>To get started, please log in or register.</p>
          <p>Once logged in, you can add, edit, and delete contacts... At light speed.</p>
          <p>Enjoy your journey building your galaxy of contacts!</p>
        </div>

        <Link to="/Login">
          <button>Get Started</button>
        </Link>

      </div>
    </>
  )
}

export default App
