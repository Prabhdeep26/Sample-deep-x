import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { toast } from "react-toastify";
import { Otp_Verification } from "../Api's/api's_Config/api.config";
// import { AuthSingup } from "../Api's/api's_Config/api.config.js" // Keep this imported if you need it later

const SignUp = () => {
    // 🚨 Changed to 'navigate' (React Router best practice)
    const navigate = useNavigate(); 
    
    const firstName = useRef(null);
    const lastName = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const rePass = useRef(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showRePass, setShowRePass] = useState(false);

    const formHandler = async (e) => {
        e.preventDefault();

        const firstNameValue = firstName.current.value.trim();
        const lastNameValue = lastName.current.value.trim();
        const emailValue = email.current.value.trim();
        const passwordValue = password.current.value;
        const rePassValue = rePass.current.value;

        if (!firstNameValue || !emailValue || !passwordValue || !rePassValue) {
            toast.error("First Name, Email, and Passwords are Required!");
            return;
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
            toast.error("Email is not valid!");
            return;
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(passwordValue)) {
            toast.error("Password must be at least 8 characters and include a number, uppercase, lowercase, and special character.");
            return;
        }

        if (passwordValue !== rePassValue) {
            toast.error("Passwords do not match");
            return;
        }

        // ─── THE FIXED BLOCK ─────────────────────────────────────
        try {
            // Optional: If you have an API to trigger the email OTP, call it here.
            await Otp_Verification({ email: emailValue });

            toast.success("OTP sent! Please verify your email.");
            
            // Navigate ONCE, securely passing the state
            navigate("/otp", {
                state: {
                    firstName: firstNameValue,
                    lastName: lastNameValue, 
                    email: emailValue,
                    password: passwordValue 
                }
            });
            
        } catch (error) {
            console.error("Error transitioning to OTP: ", error);
            toast.error("Something went wrong. Please try again.");
        }
        // ─────────────────────────────────────────────────────────
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 pt-3 font-sans">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-gray-300 p-8 pt-2 border border-gray-100">
                
                <div className="text-center mb-8 mt-4">
                    <img className="h-18 mx-auto" src={logo} alt="Logo" />
                    <p className="text-gray-400 mt-2">
                        Join us to start your journey
                    </p>
                </div>

                <form onSubmit={formHandler} className="flex flex-col gap-4">
                    
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1.5 w-1/2">
                            <label htmlFor="firstName" className="text-sm font-semibold text-gray-700 ml-1">
                                First Name
                            </label>
                            <div className="relative">
                                <i className="ri-user-3-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                                <input
                                    ref={firstName}
                                    type="text"
                                    id="firstName"
                                    placeholder="John"
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5 w-1/2">
                            <label htmlFor="lastName" className="text-sm font-semibold text-gray-700 ml-1">
                                Last Name
                            </label>
                            <div className="relative">
                                <i className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                                <input
                                    ref={lastName}
                                    type="text"
                                    id="lastName"
                                    placeholder="Doe"
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-700 ml-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                            <input
                                ref={email}
                                type="email"
                                id="email"
                                placeholder="name@company.com"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="pass" className="text-sm font-semibold text-gray-700 ml-1">
                            Password
                        </label>
                        <div className="relative">
                            <i className="ri-lock-2-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                            <input
                                ref={password}
                                type={showPassword ? "text" : "password"} 
                                id="pass"
                                placeholder="••••••••"
                                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                            >
                                <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="repass" className="text-sm font-semibold text-gray-700 ml-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <i className="ri-lock-password-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
                            <input
                                ref={rePass}
                                type={showRePass ? "text" : "password"} 
                                id="repass"
                                placeholder="••••••••"
                                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300"
                            />
                            <button
                                type="button"
                                onClick={() => setShowRePass(!showRePass)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
                            >
                                <i className={showRePass ? "ri-eye-off-line" : "ri-eye-line"}></i>
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
                    >
                        Create Account
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-2">
                        Already a member?{" "}
                        <Link
                            to={"/login"}
                            className="text-indigo-600 font-bold hover:underline underline-offset-4"
                        >
                            Log In
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;