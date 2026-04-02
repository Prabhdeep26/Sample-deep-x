import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addFiles, deleteFile } from "../../redux/filesSlice";

const FileUpload = () => {
	const fileInputRef = useRef(null);
	const [selectedFiles, setSelectedFiles] = useState([]);
	const dispatch = useDispatch();

	const handleFileSelect = (files) => {
		const newFiles = Array.from(files);
		setSelectedFiles((prev) => [...prev, ...newFiles]);
		dispatch(addFiles(newFiles));
	};

	const removeFile = (index) => {
		setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
		dispatch(deleteFile(index));
	};

	return (
		<div className="w-full max-w-2xl mx-auto p-4">
			{/* 1. Upload Area */}
			<div
				onClick={() => fileInputRef.current.click()}
				onDragOver={(e) => e.preventDefault()}
				onDrop={(e) => {
					e.preventDefault();
					handleFileSelect(e.dataTransfer.files);
				}}
				className="group flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-indigo-400 rounded-3xl bg-white hover:bg-indigo-50/50 transition-all cursor-pointer"
			>
				<input
					type="file"
					multiple
					ref={fileInputRef}
					onChange={(e) => handleFileSelect(e.target.files)}
					className="hidden"
				/>

				<div className="flex flex-col items-center gap-3">
					{/* Remix Icon: Upload Cloud */}
					<div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
						<i className="ri-upload-cloud-2-line text-indigo-500 text-xl"></i>
					</div>

					<p className="text-gray-600 text-sm">
						<span className="text-indigo-600 font-bold hover:underline">
							Click here
						</span>
						to upload your file or drag.
					</p>
					<p className="text-gray-400 text-xs">
						Supported Format: .pdf,.docx,.xlsx,.md (15mb)
					</p>
				</div>
			</div>

			{/* 2. File List (The bottom part of your screenshot) */}
			<div className="mt-6 space-y-3">
				{selectedFiles.map((file, index) => (
					<div
						key={index}
						className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm"
					>
						<div className="flex items-center gap-3">
							{/* Remix Icon: File Text */}
							<i className="ri-file-text-line text-2xl text-gray-400"></i>
							<div>
								<p className="text-sm font-medium text-gray-700">
									{file.name}
								</p>
								<p className="text-xs text-gray-400">
									{(file.size / 1024 / 1024).toFixed(1)} MB
								</p>
							</div>
						</div>

						{/* Remix Icon: Delete/Trash */}
						<button
							onClick={() => removeFile(index)}
							className="text-gray-400 hover:text-red-500 transition-colors"
						>
							<i className="ri-delete-bin-line text-lg"></i>
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default FileUpload;
