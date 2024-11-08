import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-xl">
                    <Link to="/">Soccer Cast</Link>
                </div>
                <div className="space-x-4">
                    <Link to="/" className="text-white font-semibold">Home</Link>
                    <Link to="/signin" className="text-white font-semibold">Sign In</Link>
                    <Link to="/signup" className="text-white font-semibold">Sign Up</Link>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
