import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import GoogleLogin from "../components/GoogleLogin";

// TODO: Make responsive
// TODO: Implement form submission logic

function Signup() {
    const [passVisible, setPassVisible] = useState(false);
    const [passVisible2, setPassVisible2] = useState(false);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [confrimPassword, setConfirmPassword] = useState('');
    const [confrimPasswordError, setConfirmPasswordError] = useState('');

    const toggle = () => {
        setPassVisible(!passVisible);
    }

    const toggle2 = () => {
        setPassVisible2(!passVisible2);
    }

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (!validateEmail(value)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (!validatePassword(value)) {
            setPasswordError('Invalid Password format');
        } else {
            setPasswordError('');
        }
    }

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);

        if (value !== password) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }
    }

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
    }

    const validatePassword = (password) => {
        return String(password)
        .match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!emailError && !passwordError && !confirmPasswordError && email && password && confirmPassword) {
            // TODO: Implement form submission logic (e.g., API call)
            alert('Form submitted');
        } else {
            alert('Please fix the errors before submitting');
        }
    }

    return (
        <>
            <main className="flex flex-col h-screen relative">
                <div className="absolute md:inset-32 inset-44 container mx-auto border-2 bg-white md:w-2/5 md:h-3/5 lg:w-80 lg:h-3/5 xl:w-80 xl:h-3/5 rounded-lg shadow-xl">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-center text-2xl font-bold p-3 pb-1 mb-1">Sign Up</h1>
                        <p className="mb-2">Welcome to <span className="text-darkGreen inline font-bold">PickUpNYC.</span></p>

                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-800 font-semibold text-sm">
                                Full Name:
                            </label>
                            <input
                                placeholder="John Doe"
                                type="text"
                                name="name"
                                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                            />
                        </div>
                    
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-800 font-semibold text-sm">
                                Email:
                            </label>
                            <input
                                placeholder="Example@gmail.com"
                                type="email"
                                name="username"
                                value={email}
                                onChange={handleEmailChange}
                                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                            />
                            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                        </div>

                        <div className="mb-4 relative">
                            <label htmlFor="passwd" className="block text-gray-800 font-semibold text-sm">
                                Password:
                            </label>
                            <input
                                placeholder="Password"
                                type={ (passVisible === false)? "password": "text"}
                                name="passwd"
                                value={password}
                                onChange={handlePasswordChange}
                                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                            />
                            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}

                            <div className="text-xl absolute top-7 right-5">
                                {
                                    (passVisible === false)? <FaEyeSlash onClick={toggle}/>:
                                    <FaEye onClick={toggle} />
                                }
                            </div>
                        </div>

                        <div className="mb-8 relative">
                            <label htmlFor="re-passwd" className="block text-gray-800 font-semibold text-sm">
                                Confirm Password:
                            </label>
                            <input
                                placeholder="Password"
                                type={ (passVisible2 === false)? "password": "text"}
                                name="re-passwd"
                                value={confrimPassword}
                                onChange={handleConfirmPasswordChange}
                                className="block w-56 rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
                            />
                            {confrimPasswordError && <p className="text-red-500 text-sm mt-1">{confrimPasswordError}</p>}

                            <div className="text-xl absolute top-7 right-5">
                                {
                                    (passVisible2 === false)? <FaEyeSlash onClick={toggle2}/>:
                                    <FaEye onClick={toggle2} />
                                }
                            </div>
                        </div>

                        <div className="mb-6">
                            <Link to="" className="cursor-pointer text-white bg-darkGreen font-bold py-2 px-20 rounded-md mt-4" >
                                Sign Up
                            </Link>
                        </div>

                        <div className="mb-4">
                            <GoogleLogin />
                        </div>

                        <div>
                            <p>Already have an account? <Link to="/login"><strong>Sign In</strong></Link></p>
                        </div>
                        
                    </div>
                </div>
            </main>
        </>
    );
}

export default Signup;