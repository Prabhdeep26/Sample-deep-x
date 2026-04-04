import React from "react";
import FileUpload from "../components/general/FileUpload";

const Home = () => {
	return (
		<div className="flex-1 w-full h-screen overflow-y-auto bg-gray-50">
			<div className="p-4 pt-20 md:p-8 md:pt-8 max-w-6xl mx-auto flex flex-col h-full">
				<div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-10 flex flex-col min-h-100">
					<FileUpload />
				</div>
			</div>
		</div>
	);
};

export default Home;
