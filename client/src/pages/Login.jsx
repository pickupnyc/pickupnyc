import GoogleLogin from "../components/GoogleLogin";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const Login = () => {
    const [passVisible, setPassVisible] = useState(false);

    const toggle = () => {
        setPassVisible(!passVisible);
    };
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <main className="bg-offWhite relative flex h-screen w-full flex-col items-center justify-center">
                <div className="container absolute inset-44 mx-auto rounded-lg border-2 bg-white shadow-xl md:h-3/5 md:w-2/5 lg:h-2/5 lg:w-80 xl:h-1/2 xl:w-1/4">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="mb-1 p-3 pb-1 text-center text-2xl font-semibold">Sign In</h1>
                        <p className="mb-2">
                            Welcome to <span className="inline font-bold text-blue-500">PickUp NYC.</span>
                        </p>

                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-bold text-gray-800">
                                Email:
                            </label>
                            <input
                                placeholder="Example@gmail.com"
                                type="email"
                                name="username"
                                className="block w-56 rounded-md px-2 py-1.5 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                            />
                        </div>

                        <div className="relative mb-4">
                            <label htmlFor="passwd" className="block text-sm font-semibold text-gray-800">
                                Password:
                            </label>
                            <input
                                placeholder="Password"
                                type={passVisible === false ? "password" : "text"}
                                name="passwd"
                                className="block w-56 rounded-md px-2 py-1.5 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                            />

                            <div className="absolute right-5 top-7 text-xl">
                                {passVisible === false ? <FaEyeSlash onClick={toggle} /> : <FaEye onClick={toggle} />}
                            </div>
                        </div>

                        <Link to="" className="mb-4">
                            Forgot Password?
                        </Link>

                        <div className="mb-4">
                            <Link
                                to=""
                                className="mt-4 cursor-pointer rounded-md bg-gradient-to-r from-indigo-500 to-blue-500 px-10 py-2 font-bold text-white transition duration-150 ease-in-out hover:bg-indigo-600 hover:to-blue-600"
                            >
                                Sign In
                            </Link>
                        </div>

                        <div className="">
                            <GoogleLogin />
                        </div>

                        <div className="">
                            <p className="">
                                Dont have an account?{" "}
                                <Link to="/signup">
                                    <strong>Sign Up</strong>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;
