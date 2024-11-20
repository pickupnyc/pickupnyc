import { Link } from "react-router-dom";

const LoginButton = () => {
    return (
        <Link
            to="/login"
            aria-label="Login button"
            className="bg-darkGreen hover:text-darkGreen border-darkGreen text-offWhite hover:bg-offWhite flex max-w-[140px] justify-center rounded-full border-2 px-6 py-2"
        >
            <span className="text-md font-bold tracking-wider">Login</span>
        </Link>
    );
};

export default LoginButton;
