import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { toast } from "react-toastify";

const SignIn = () => {
	const navigator = useNavigate();
	const email = useRef(null);
	const password = useRef(null);

	const formHandler = (e) => {
		e.preventDefault();
		if (
			!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
				email.current.value,
			)
		) {
			toast.error("Email is not valid!");
			return;
		}
		if (
			!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
				password.current.value,
			)
		) {
			toast.error(
				"Password must be at least 8 characters and include a number, uppercase, lowercase, and special character.",
			);
			return;
		}
		navigator("/otp");
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
			{/* Main Card */}
			<div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-gray-300 p-8 border border-gray-100">
				{/* Header */}
				<div className="text-center mb-8">
					<img className="h-18 mx-auto" src={logo} alt="" />
					<p className="text-gray-400 mt-2">
						Welcome back! Please enter your details.
					</p>
				</div>

				<form onSubmit={formHandler} className="flex flex-col gap-5">
					{/* Email Input Group */}
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="email"
							className="text-sm font-semibold text-gray-700 ml-1"
						>
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

					{/* Password Input Group */}
					<div className="flex flex-col gap-1.5">
						<div className="flex justify-between items-center px-1">
							<label
								htmlFor="pass"
								className="text-sm font-semibold text-gray-700"
							>
								Password
							</label>

							{/* NEW: Forgot Password Link */}
							<Link
								to="/forget-password"
								className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
							>
								Forgot password?
							</Link>
						</div>
						<div className="relative">
							<i className="ri-lock-2-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
							<input
								ref={password}
								type="password"
								id="pass"
								placeholder="••••••••"
								className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-300"
							/>
						</div>
					</div>

					{/* Submit Button */}
					<button className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">
						Sign In
					</button>

					{/* Footer Text */}
					<p className="text-center text-sm text-gray-500 mt-4">
						Don't have an account?{" "}
						<Link
							to="/signup"
							className="text-indigo-600 font-bold hover:underline underline-offset-4"
						>
							Sign Up
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
