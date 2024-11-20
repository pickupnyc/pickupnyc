import GoogleLogin from "../components/auth/GoogleLogin";
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
            <main className="relative flex h-screen w-full flex-col items-center justify-center bg-offWhite">
                <div className="container absolute mx-auto rounded-lg border-2 bg-white shadow-xl
                sm:h-3/4 sm:w-11/12 
                md:h-3/6 md:w-2/5 
                lg:h-3/6 lg:w-1/3 
                xl:h-3/6 xl:w-1/5">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="mb-1 p-3 pb-1 text-center text-2xl font-semibold">Sign In</h1>
                        <p className="mb-2">
                            Welcome to <span className="inline font-bold text-darkGreen">PickUpNYC.</span>
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

                        {/* <Link to="" className="mb-4">
                            Forgot Password?
                        </Link> */}

                        <div className="mb-6 mt-2">
                            <Link
                                to=""
                                className="mt-4 cursor-pointer rounded-md bg-darkGreen px-10 py-2 font-bold text-white"
                            >
                                Sign In
                            </Link>
                        </div>

                        <div className="mb-4">
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
