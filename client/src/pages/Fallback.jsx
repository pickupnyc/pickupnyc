import { Link } from "react-router-dom";

function Fallback() {
    return (
        <>
            <div className="flex h-full items-center justify-center text-center">
                <div className="flex-col">
                    <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
                    <p className="py-2 text-lg">The page you are looking for does not exist.</p>
                    <Link to="/" className="text-xl font-bold text-darkGreen">
                        PickUpNYC
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Fallback;
