import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
// Note: Update this path to wherever your actual auth slice is located
import { logout } from "../../redux/userSlice";
import image from "../../assets/logo.jpg";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch(); // Initialize dispatch

	const navLinkClass = ({ isActive }) =>
		`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
			isActive
				? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
				: "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
		}`;

	const closeSidebar = () => setIsOpen(false);

	// Custom handler for logging out
	const handleLogout = () => {
		dispatch(logout()); // 1. Dispatch the logout action
		closeSidebar(); // 2. Close the mobile sidebar
	};

	return (
		<>
			{/* Mobile Hamburger Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md text-gray-600 hover:text-indigo-600 transition-colors"
			>
				<i
					className={`ri-${isOpen ? "close-line" : "menu-line"} text-2xl`}
				></i>
			</button>

			{/* Mobile Overlay Backdrop */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/30 z-40 md:hidden backdrop-blur-sm transition-opacity"
					onClick={closeSidebar}
				></div>
			)}

			{/* Sidebar Container */}
			<div
				className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 p-6 flex flex-col justify-between z-50 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div>
					{/* Logo Section */}
					<div className="mb-8 px-2 flex justify-between items-center mt-8 md:mt-0">
						<NavLink to={"/"} onClick={closeSidebar}>
							<img
								src={image}
								alt="Logo"
								className="h-16 md:h-20 object-contain"
							/>
						</NavLink>
					</div>

					{/* Navigation Links */}
					<nav>
						<ul className="flex flex-col gap-2">
							<li>
								<NavLink
									to="/"
									className={navLinkClass}
									onClick={closeSidebar}
								>
									<i className="ri-home-4-line text-xl"></i>
									<span className="font-medium">Home</span>
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/settings"
									className={navLinkClass}
									onClick={closeSidebar}
								>
									<i className="ri-settings-3-line text-xl"></i>
									<span className="font-medium">
										Settings
									</span>
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/help"
									className={navLinkClass}
									onClick={closeSidebar}
								>
									<i className="ri-question-line text-xl"></i>
									<span className="font-medium">
										Help & Support
									</span>
								</NavLink>
							</li>
						</ul>
					</nav>
				</div>

				{/* Bottom Section (User/Logout) */}
				<div className="border-t border-gray-100 pt-6">
					{/* Replaced closeSidebar with handleLogout */}
					<Link
						to={"/login"}
						onClick={handleLogout}
						className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
					>
						<i className="ri-logout-box-r-line text-xl"></i>
						<span className="font-medium">Logout</span>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
