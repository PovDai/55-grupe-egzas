import { Link } from "react-router";

export function Footer() {
    
    return (
        <div className="container">
    <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">Pradinis puslapis</Link></li>
        </ul>
        <p className="text-center text-body-secondary">&copy; {new Date().getFullYear()} UAB Grožio paslaugos, Inc  </p>
    </footer>
</div>

        
    )
}