import React, { useState } from "react";

const ChangePass = () => {
	const [formData, setFormData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const [showPasswords, setShowPasswords] = useState({
		current: false,
		new: false,
		confirm: false,
	});

	// Handle input changes
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Handle visibility toggles
	const toggleVisibility = (field) => {
		setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
	};

	// Validation
	const passwordsMatch = formData.newPassword === formData.confirmPassword;
	const isFormValid =
		formData.currentPassword.length > 0 &&
		formData.newPassword.length >= 6 &&
		passwordsMatch;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isFormValid) {
			alert("Password successfully changed!");
			// Add your API call here
			setFormData({
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			});
		}
	};

	return (
		// pt-20 on mobile ensures the mobile hamburger menu doesn't overlap the content
		<div className="w-full h-full p-4 pt-20 md:p-8 md:pt-8 max-w-3xl mx-auto flex flex-col">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
					Security Settings
				</h1>
				<p className="text-gray-500 text-sm sm:text-base">
					Update your password to keep your account secure.
				</p>
			</div>

			{/* Main Card */}
			<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 md:p-10">
				<form onSubmit={handleSubmit} className="flex flex-col gap-6">
					{/* Current Password */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Current Password
						</label>
						<div className="relative">
							<input
								type={
									showPasswords.current ? "text" : "password"
								}
								name="currentPassword"
								value={formData.currentPassword}
								onChange={handleChange}
								placeholder="Enter your current password"
								className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none pr-12"
							/>
							<button
								type="button"
								onClick={() => toggleVisibility("current")}
								className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
							>
								<i
									className={`ri-eye-${showPasswords.current ? "off-" : ""}line text-xl`}
								></i>
							</button>
						</div>
					</div>

					<hr className="border-gray-100 my-2" />

					{/* New Password */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							New Password
						</label>
						<div className="relative">
							<input
								type={showPasswords.new ? "text" : "password"}
								name="newPassword"
								value={formData.newPassword}
								onChange={handleChange}
								placeholder="Create a new password"
								className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none pr-12"
							/>
							<button
								type="button"
								onClick={() => toggleVisibility("new")}
								className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
							>
								<i
									className={`ri-eye-${showPasswords.new ? "off-" : ""}line text-xl`}
								></i>
							</button>
						</div>
						<p className="text-xs text-gray-400 mt-2">
							Must be at least 6 characters long.
						</p>
					</div>

					{/* Confirm New Password */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Confirm New Password
						</label>
						<div className="relative">
							<input
								type={
									showPasswords.confirm ? "text" : "password"
								}
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleChange}
								placeholder="Confirm your new password"
								className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:bg-white focus:ring-4 transition-all outline-none pr-12 ${
									formData.confirmPassword && !passwordsMatch
										? "border-red-300 focus:ring-red-500/10 focus:border-red-500"
										: "border-gray-200 focus:ring-indigo-500/10 focus:border-indigo-500"
								}`}
							/>
							<button
								type="button"
								onClick={() => toggleVisibility("confirm")}
								className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors"
							>
								<i
									className={`ri-eye-${showPasswords.confirm ? "off-" : ""}line text-xl`}
								></i>
							</button>
						</div>
						{/* Error Message if passwords don't match */}
						{formData.confirmPassword && !passwordsMatch && (
							<p className="text-xs text-red-500 mt-2 flex items-center gap-1">
								<i className="ri-error-warning-line"></i>{" "}
								Passwords do not match
							</p>
						)}
					</div>

					{/* Action Buttons */}
					<div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-4">
						<button
							type="button"
							onClick={() =>
								setFormData({
									currentPassword: "",
									newPassword: "",
									confirmPassword: "",
								})
							}
							className="px-6 py-3 font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
						>
							Cancel
						</button>
						<button
							type="submit"
							disabled={!isFormValid}
							className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 disabled:active:scale-100"
						>
							Update Password
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ChangePass;
