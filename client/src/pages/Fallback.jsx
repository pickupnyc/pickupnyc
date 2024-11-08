import React from 'react';
import { Link } from "react-router-dom";

function Fallback() {
    return (
        <>
            <div className="flex h-screen justify-center items-center text-center">
                <div className="flex-col">
                    <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
                    <p className="text-lg py-2">The page you are looking for does not exist.</p>
                    <Link to="/" className="font-bold text-xl text-blue-500">PickUp NYC</Link>
                </div>
            </div>
        </>
    );
}

export default Fallback;