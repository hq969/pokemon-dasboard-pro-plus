import { Link } from "react-router-dom";
import { usePrefetch } from "../redux/pokemon/pokemon";

const Navigation = () => {
    const preFetch = usePrefetch("getAllPokemonName");
    // Navigation items
    const navItems = [
        { name: "Home", path: "/" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "Favorite", path: "/favorites" },
        { name: "Search", path: "/search" }
    ];

    return (
        <nav title="Navbar" className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link title="Logo" className="navbar-brand" to="/">Pokedex</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {navItems.map((item, index) => (
                            <li className="nav-item" key={index}>
                                <Link
                                    title="Navigation link"
                                    className="nav-link"
                                    to={item.path}
                                    onMouseEnter={item.name === "Search" ? () => preFetch() : null}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
