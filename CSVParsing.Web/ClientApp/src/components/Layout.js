import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand" to='/'>People</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <ul className="navbar-nav">
                        <li className="nav-item ">
                            <Link className="nav-link text-light" to='/'>Home </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to='/upload'>Upload</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to='/generate'>Generate</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            {children}
        </div>
    )
}
export default Layout;