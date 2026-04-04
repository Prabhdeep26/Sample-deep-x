import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setIsAuth } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Otp = () => {
	// 1. Initialized with 6 empty slots
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef([]);
	const dispatch = useDispatch();
	const navigator = useNavigate();

	// Handle typing
	const handleChange = (e, index) => {
		const value = e.target.value;
		if (isNaN(value)) return;

		const newOtp = [...otp];
		newOtp[index] = value.substring(value.length - 1);
		setOtp(newOtp);

		// 2. Auto-focus next input up to index 5
		if (value && index < 5) {
			inputRefs.current[index + 1].focus();
		}
	};

	// Handle Backspace
	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	// Handle pasting a full code
	const handlePaste = (e) => {
		e.preventDefault();
		// 3. Slice up to 6 characters
		const pastedData = e.clipboardData.getData("text").trim().slice(0, 6);

		if (isNaN(pastedData)) return;

		const pastedArray = pastedData.split("");
		const newOtp = [...otp];

		pastedArray.forEach((char, i) => {
			if (i < 6) newOtp[i] = char;
		});

		setOtp(newOtp);

		// 4. Focus the last filled input, or the final box (index 5)
		const focusIndex = pastedArray.length < 6 ? pastedArray.length : 5;
		if (inputRefs.current[focusIndex]) {
			inputRefs.current[focusIndex].focus();
		}
	};
	let tid;
	const handleSubmit = (e) => {
		e.preventDefault();
		const finalCode = otp.join("");
		// 5. Require 6 digits for submission
		if (finalCode.length === 6) {
			toast.success(`succesfully Logging....`, { id: tid });
			// Add your API verification logic here

			dispatch(setIsAuth());
			setTimeout(() => navigator("/"), 2000);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100">
				{/* Header Section */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-4">
						<i className="ri-shield-keyhole-line text-3xl text-indigo-600"></i>
					</div>
					<h2 className="text-2xl font-bold text-gray-900 mb-2">
						Verify your account
					</h2>
					<p className="text-sm text-gray-500">
						We've sent a 6-digit verification code to <br />
						<span className="font-semibold text-gray-800">
							john.doe@example.com
						</span>
					</p>
				</div>

				{/* OTP Form */}
				<form onSubmit={handleSubmit} className="flex flex-col gap-6">
					{/* Input Group: gaps and widths slightly reduced to fit 6 columns on mobile */}
					<div className="flex justify-center gap-2 sm:gap-3">
						{otp.map((digit, index) => (
							<input
								key={index}
								type="text"
								inputMode="numeric"
								maxLength={1}
								value={digit}
								ref={(el) => (inputRefs.current[index] = el)}
								onChange={(e) => handleChange(e, index)}
								onKeyDown={(e) => handleKeyDown(e, index)}
								onPaste={handlePaste}
								className="w-10 h-14 sm:w-12 sm:h-16 text-center text-xl sm:text-2xl font-bold text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
							/>
						))}
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={otp.join("").length !== 6}
						className="w-full py-4 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 disabled:active:scale-100 mt-4"
					>
						Verify Account
					</button>
				</form>

				{/* Resend Section */}
				<div className="mt-8 text-center text-sm text-gray-500">
					Didn't receive the code?{" "}
					<button className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-all outline-none">
						Resend Code
					</button>
				</div>
			</div>
		</div>
	);
};

export default Otp;
