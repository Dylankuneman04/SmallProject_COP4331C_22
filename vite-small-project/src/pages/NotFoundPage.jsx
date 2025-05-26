import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="NotFoundPage">
        <header className="NotFoundPage-header">
            <h1>404 - Page Not Found</h1>
        </header>
        <div className='NotFoundPage-content'>
            <p>Oops! 1111The page you are looking for does not exist.</p>
            <p>You've taken a wrong turn in the galaxy!</p>
        </div>
        <Link to="/">
            <button>Return Home</button>
        </Link>
        </div>
    );
}
export default NotFoundPage;