import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/general/Sidebar";

const App = () => {
	return (
		<div className="flex w-full">
			<Sidebar />
			<main className="flex-1 bg-gray-50 h-screen overflow-y-auto">
				<Outlet />
			</main>
		</div>
	);
};

export default App;
