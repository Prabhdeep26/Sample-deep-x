import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
// import { logout } from "../../redux/userSlice"; // Assuming you added the logout action!

const DeleteAccount = () => {
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isConfirmed, setIsConfirmed] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Validation: Button is only active if the box is checked and a password is typed
	const isFormValid = isConfirmed && password.length > 0;

	const handleDelete = (e) => {
		e.preventDefault();
		if (isFormValid) {
			// In a real app: Wait for API call to successfully delete the account here
			alert("Account permanently deleted.");

			// Clear Redux state & localStorage, then kick them to the signup page
			dispatch(logout());
			navigate("/signup");
		}
	};

	return (
		// Responsive padding: pt-20 on mobile gives space for the hamburger menu
		<div className="w-full h-full p-4 pt-20 md:p-8 md:pt-8 max-w-3xl mx-auto flex flex-col">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
					Delete Account
				</h1>
				<p className="text-gray-500 text-sm sm:text-base">
					Permanently remove your personal data and account details.
				</p>
			</div>

			{/* Warning Banner */}
			<div className="bg-red-50 border-l-4 border-red-500 p-4 sm:p-5 rounded-r-2xl mb-8 flex gap-4">
				<i className="ri-error-warning-fill text-2xl text-red-500 shrink-0"></i>
				<div>
					<h3 className="text-sm sm:text-base font-bold text-red-800 mb-1">
						Warning: This action is irreversible.
					</h3>
					<p className="text-xs sm:text-sm text-red-600">
						Once you delete your account, there is no going back.
						All of your uploaded files, settings, and personal data
						will be permanently wiped from our servers immediately.
					</p>
				</div>
			</div>

			{/* Main Card */}
			<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 md:p-10">
				<form onSubmit={handleDelete} className="flex flex-col gap-6">
					{/* Confirmation Checkbox */}
					<label className="flex items-start gap-3 cursor-pointer group">
						<div className="relative flex items-center justify-center mt-0.5">
							<input
								type="checkbox"
								checked={isConfirmed}
								onChange={(e) =>
									setIsConfirmed(e.target.checked)
								}
								className="w-5 h-5 appearance-none border-2 border-gray-300 rounded bg-white checked:bg-red-500 checked:border-red-500 transition-colors cursor-pointer"
							/>
							{/* Custom Checkmark Icon */}
							{isConfirmed && (
								<i className="ri-check-line text-white absolute text-sm pointer-events-none"></i>
							)}
						</div>
						<span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors select-none">
							I understand that deleting my account is permanent
							and cannot be undone.
						</span>
					</label>

					<hr className="border-gray-100 my-2" />

					{/* Password Verification */}
					<div
						className={`${isConfirmed ? "opacity-100" : "opacity-50 pointer-events-none"} transition-opacity duration-300`}
					>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Enter your password to verify
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Current password"
								className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-red-500/10 focus:border-red-500 transition-all outline-none pr-12"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
							>
								<i
									className={`ri-eye-${showPassword ? "off-" : ""}line text-xl`}
								></i>
							</button>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
						<button
							type="button"
							onClick={() => navigate("/settings")}
							className="px-6 py-3 font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={!isFormValid}
							className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600 disabled:active:scale-100 flex items-center justify-center gap-2"
						>
							<i className="ri-delete-bin-line"></i>
							Delete My Account
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default DeleteAccount;
