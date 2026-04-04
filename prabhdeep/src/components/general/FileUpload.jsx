import React, { useRef, useState } from "react";

const FileUpload = () => {
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [docType, setDocType] = useState("legal");
    const [isUploading, setIsUploading] = useState(false);

    const handleFileSelect = (files) => {
        if (!files) return;

        // Define the exact extensions and types we want to allow
        const allowedExtensions = ['.pdf', '.docx', '.txt'];
        const maxFileSize = 15 * 1024 * 1024; // 15MB

        const validFiles = Array.from(files).filter(file => {
            // 1. Check File Type (Images or specific extensions)
            const isImage = file.type.startsWith('image/');
            const hasValidExtension = allowedExtensions.some(ext => 
                file.name.toLowerCase().endsWith(ext)
            );

            if (!isImage && !hasValidExtension) {
                alert(`File skipped: "${file.name}". Only .pdf, .docx, .txt, and images are allowed.`);
                return false;
            }

            // 2. Check File Size
            if (file.size > maxFileSize) {
                alert(`File skipped: "${file.name}". It exceeds the 15MB limit.`);
                return false;
            }

            return true;
        });

        setSelectedFiles((prev) => [...prev, ...validFiles]);
    };

    const removeFile = (index) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("documentCategory", docType);

        selectedFiles.forEach((file) => {
            formData.append("files", file); 
        });

        try {
            const response = await fetch("https://your-api.com/endpoint", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();
            console.log("Upload successful:", data);
            
            setSelectedFiles([]);
            alert("Documents uploaded successfully!");

        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload documents.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* COLUMN 1: File Upload Area */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">1. Select Documents</h2>
                
                <div
                    onClick={() => fileInputRef.current.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        handleFileSelect(e.dataTransfer.files);
                    }}
                    className="group flex flex-col items-center justify-center w-full h-40 sm:h-44 border-2 border-dashed border-indigo-400 rounded-2xl bg-white hover:bg-indigo-50/50 transition-all cursor-pointer px-4 text-center"
                >
                    <input
                        type="file"
                        multiple
                        ref={fileInputRef}
                        onChange={(e) => handleFileSelect(e.target.files)}
                        className="hidden"
                        // Updated Accept Attribute
                        accept=".pdf, .docx, .txt, image/*"
                    />
                    <div className="flex flex-col items-center gap-3 pointer-events-none">
                        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                            <i className="ri-upload-cloud-2-line text-indigo-500 text-xl"></i>
                        </div>
                        <p className="text-gray-600 text-sm">
                            <span className="text-indigo-600 font-bold group-hover:underline">Click here</span> to upload your file or drag.
                        </p>
                        {/* Updated UI Text */}
                        <p className="text-gray-400 text-xs">
                            Supported Format: .pdf, .docx, .txt, images (Max 15MB)
                        </p>
                    </div>
                </div>

                {/* File List */}
                {selectedFiles.length > 0 && (
                    <div className="space-y-2">
                        {selectedFiles.map((file, index) => (
                            <div key={`${file.name}-${index}`} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-sm gap-4">
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                    <i className="ri-file-text-line text-xl text-gray-400 shrink-0"></i>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
                                        <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile(index);
                                    }}
                                    className="text-gray-400 hover:text-red-500 p-1"
                                >
                                    <i className="ri-delete-bin-line text-lg"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* COLUMN 2: Document Settings & Submission */}
            <div className="space-y-6 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">2. Document Category</h2>
                    
                    <div className="flex flex-col gap-3">
                        <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${docType === "legal" ? "border-indigo-500 bg-indigo-50/50" : "border-gray-200 bg-white hover:bg-gray-50"}`}>
                            <input
                                type="radio"
                                name="docType"
                                value="legal"
                                checked={docType === "legal"}
                                onChange={(e) => setDocType(e.target.value)}
                                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <div className="ml-3">
                                <span className="block text-sm font-medium text-gray-900">Legal Documents</span>
                                <span className="block text-xs text-gray-500">Contracts, NDAs, compliance forms.</span>
                            </div>
                        </label>

                        <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${docType === "financial" ? "border-indigo-500 bg-indigo-50/50" : "border-gray-200 bg-white hover:bg-gray-50"}`}>
                            <input
                                type="radio"
                                name="docType"
                                value="financial"
                                checked={docType === "financial"}
                                onChange={(e) => setDocType(e.target.value)}
                                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                            />
                            <div className="ml-3">
                                <span className="block text-sm font-medium text-gray-900">Financial Documents</span>
                                <span className="block text-xs text-gray-500">Invoices, tax returns, balance sheets.</span>
                            </div>
                        </label>
                    </div>
                </div>

                <hr className="border-gray-200" />

                <button
                    onClick={handleUpload}
                    disabled={selectedFiles.length === 0 || isUploading}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex justify-center items-center gap-2"
                >
                    {isUploading ? (
                        <>
                            <i className="ri-loader-4-line animate-spin"></i> Uploading...
                        </>
                    ) : (
                        "Upload to Server"
                    )}
                </button>
            </div>
            
        </div>
    );
};

export default FileUpload;