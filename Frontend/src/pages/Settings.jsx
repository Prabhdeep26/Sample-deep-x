import React from "react";
import { Link } from "react-router-dom";

const Settings = () => {
	return (
		// pt-20 on mobile gives space for the hamburger menu!
		<div className="w-full h-full p-4 pt-20 md:p-8 md:pt-8 max-w-4xl mx-auto flex flex-col">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
					Settings
				</h1>
				<p className="text-gray-500 text-sm sm:text-base">
					Manage your account preferences and security.
				</p>
			</div>

			{/* Settings Sections Container */}
			<div className="space-y-6">
				{/* 1. Security Section (Where your Change Password link is) */}
				<section>
					<h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 ml-2">
						Security
					</h2>
					<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
						{/* Change Password Link */}
						<Link
							to="/change-password"
							className="flex items-center justify-between p-4 sm:p-5 hover:bg-gray-50 transition-colors group cursor-pointer"
						>
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
									<i className="ri-lock-password-line text-xl sm:text-2xl"></i>
								</div>
								<div>
									<h3 className="text-sm sm:text-base font-semibold text-gray-900">
										Change Password
									</h3>
									<p className="text-xs sm:text-sm text-gray-500 mt-0.5">
										Update your password to keep your
										account secure
									</p>
								</div>
							</div>
							<i className="ri-arrow-right-s-line text-2xl text-gray-400 group-hover:text-indigo-600 transition-colors shrink-0"></i>
						</Link>

						{/* Two-Factor Authentication (Dummy placeholder for looks) */}
						<div className="items-center justify-between p-4 sm:p-5 hover:bg-gray-50 transition-colors cursor-pointer hidden">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
									<i className="ri-shield-check-line text-xl sm:text-2xl"></i>
								</div>
								<div>
									<h3 className="text-sm sm:text-base font-semibold text-gray-900">
										Two-Factor Authentication
									</h3>
									<p className="text-xs sm:text-sm text-gray-500 mt-0.5">
										Add an extra layer of security
									</p>
								</div>
							</div>
							{/* Dummy Toggle Switch */}
							<div className="w-11 h-6 bg-gray-200 rounded-full relative cursor-pointer">
								<div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
							</div>
						</div>
					</div>
				</section>

				{/* 2. Profile & Account Section (Dummy examples) */}
				<section>
					<h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 ml-2">
						Account
					</h2>
					<div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
						<div className="flex items-center justify-between p-4 sm:p-5 hover:bg-gray-50 transition-colors cursor-pointer group">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
									<i className="ri-user-settings-line text-xl sm:text-2xl"></i>
								</div>
								<div>
									<h3 className="text-sm sm:text-base font-semibold text-gray-900">
										Personal Information
									</h3>
									<p className="text-xs sm:text-sm text-gray-500 mt-0.5">
										Update your name, email, and avatar
									</p>
								</div>
							</div>
							<i className="ri-arrow-right-s-line text-2xl text-gray-400 group-hover:text-indigo-600 transition-colors shrink-0"></i>
						</div>

						<div className="flex items-center justify-between p-4 sm:p-5 hover:bg-gray-50 transition-colors cursor-pointer group">
							<div className="flex items-center gap-4">
								<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
									<i className="ri-notification-3-line text-xl sm:text-2xl"></i>
								</div>
								<div>
									<h3 className="text-sm sm:text-base font-semibold text-gray-900">
										Notifications
									</h3>
									<p className="text-xs sm:text-sm text-gray-500 mt-0.5">
										Manage your email and app alerts
									</p>
								</div>
							</div>
							<i className="ri-arrow-right-s-line text-2xl text-gray-400 group-hover:text-indigo-600 transition-colors shrink-0"></i>
						</div>
					</div>
				</section>

				{/* 3. Danger Zone */}
				<section className="mt-8">
					<div className="bg-red-50 rounded-2xl border border-red-100 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
						<div>
							<h3 className="text-sm sm:text-base font-semibold text-red-700">
								Delete Account
							</h3>
							<p className="text-xs sm:text-sm text-red-500 mt-0.5">
								Permanently remove your account and data
							</p>
						</div>
						<Link
							to={"/delete-account"}
							className="px-4 py-2 bg-white text-red-600 text-sm font-semibold border border-red-200 rounded-lg hover:bg-red-600 hover:text-white transition-colors whitespace-nowrap"
						>
							Delete Account
						</Link>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Settings;
