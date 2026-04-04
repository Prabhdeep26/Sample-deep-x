import React, { useState } from "react";
import { Link } from "react-router-dom";

const Forget = () => {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		// TODO: Add your API call here to send the reset link to the backend
		console.log("Reset link requested for:", email);

		// Simulate a successful API response
		setIsSubmitted(true);
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
			<div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
				{/* Icon Header */}
				<div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
					<i className="ri-lock-password-line text-2xl text-indigo-600"></i>
				</div>

				<h2 className="text-2xl font-bold text-gray-800 mb-2">
					Forgot Password?
				</h2>

				{/* Conditional Rendering: Form vs Success Message */}
				{!isSubmitted ? (
					<>
						<p className="text-gray-500 text-sm mb-6">
							No worries! Enter your email address below and we'll
							send you instructions to reset your password.
						</p>

						<form onSubmit={handleSubmit} className="space-y-5">
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 mb-1.5"
								>
									Email Address
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
										<i className="ri-mail-line text-gray-400 text-lg"></i>
									</div>
									<input
										type="email"
										id="email"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-700"
										placeholder="Enter your email"
										required
									/>
								</div>
							</div>

							<button
								type="submit"
								className="w-full bg-indigo-600 text-white font-medium py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
							>
								Send Reset Link
							</button>
						</form>
					</>
				) : (
					<div className="py-2">
						<div className="bg-green-50 border border-green-100 text-green-700 p-4 rounded-xl mb-6 text-sm flex items-start gap-3">
							<i className="ri-checkbox-circle-fill text-xl mt-0.5"></i>
							<p>
								We have sent a password reset link to{" "}
								<span className="font-semibold text-green-800">
									{email}
								</span>
								. Please check your inbox.
							</p>
						</div>

						<button
							onClick={() => setIsSubmitted(false)}
							className="text-indigo-600 text-sm font-medium hover:underline"
						>
							Didn't receive the email? Try again.
						</button>
					</div>
				)}

				{/* Back to Login Link */}
				<div className="mt-8 text-center">
					<Link
						to="/login"
						className="text-sm font-medium text-gray-500 hover:text-indigo-600 flex items-center justify-center gap-2 transition-colors"
					>
						<i className="ri-arrow-left-line"></i>
						Back to log in
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Forget;
