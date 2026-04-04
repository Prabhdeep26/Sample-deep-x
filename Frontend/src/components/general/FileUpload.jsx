import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { DocumentUpload } from "../../Api's/api's_Config/api.document.config";

const FileUpload = () => {
    const mainFileInputRef = useRef(null);
    const supportFileInputRef = useRef(null);

    const [documentGroups, setDocumentGroups] = useState([]);
    const [activeDocId, setActiveDocId] = useState(null);
    const [sector, setSector] = useState("legal");
    
    const [isUploading, setIsUploading] = useState(false);
    // ─── NEW: State for tracking upload percentage ───
    const [uploadProgress, setUploadProgress] = useState(0);

    const MAX_TOTAL_SIZE = 15 * 1024 * 1024;

    const calculateTotalSize = () => {
        return documentGroups.reduce((total, group) => {
            const mainSize = group.mainFile.size;
            const supportSize = group.supportFiles.reduce((sum, f) => sum + f.size, 0);
            return total + mainSize + supportSize;
        }, 0);
    };

    const getValidFiles = (files, currentTotal) => {
        const allowedExtensions = [".pdf", ".docx", ".txt"];
        let runningTotal = currentTotal;

        return Array.from(files).filter((file) => {
            const isImage = file.type.startsWith("image/");
            const hasValidExtension = allowedExtensions.some((ext) =>
                file.name.toLowerCase().endsWith(ext),
            );

            if (!isImage && !hasValidExtension) {
                toast.warning(`Skipped: "${file.name}". Only .pdf, .docx, .txt, and images allowed.`);
                return false;
            }

            if (runningTotal + file.size > MAX_TOTAL_SIZE) {
                toast.error(`Skipped: "${file.name}". Combined total cannot exceed 15MB.`);
                return false;
            }

            runningTotal += file.size;
            return true;
        });
    };

    const handleMainFileSelect = (files) => {
        if (!files) return;
        const currentTotal = calculateTotalSize();
        const validFiles = getValidFiles(files, currentTotal);
        const newGroups = validFiles.map((file) => ({
            id: Math.random().toString(36).substr(2, 9),
            mainFile: file,
            supportFiles: [],
        }));
        setDocumentGroups((prev) => [...prev, ...newGroups]);
    };

    const removeMainDocument = (id) => {
        setDocumentGroups((prev) => prev.filter((doc) => doc.id !== id));
    };

    const triggerSupportUpload = (id) => {
        setActiveDocId(id);
        supportFileInputRef.current.click();
    };

    const handleSupportFileSelect = (files) => {
        if (!files || !activeDocId) return;
        const targetGroup = documentGroups.find((doc) => doc.id === activeDocId);
        if (!targetGroup) return;

        const currentCount = targetGroup.supportFiles.length;
        const remainingSlots = 5 - currentCount;

        if (remainingSlots <= 0) {
            toast.error("You can only attach a maximum of 5 support files.");
            setActiveDocId(null);
            return;
        }

        const currentTotal = calculateTotalSize();
        const validFiles = getValidFiles(files, currentTotal);
        let filesToAdd = validFiles;

        if (validFiles.length > remainingSlots) {
            toast.warning(`Limit reached. Only ${remainingSlots} more file(s) were added.`);
            filesToAdd = validFiles.slice(0, remainingSlots);
        }

        setDocumentGroups((prev) =>
            prev.map((doc) => {
                if (doc.id === activeDocId) {
                    return { ...doc, supportFiles: [...doc.supportFiles, ...filesToAdd] };
                }
                return doc;
            }),
        );
        setActiveDocId(null);
    };

    const removeSupportFile = (docId, supportFileIndex) => {
        setDocumentGroups((prev) =>
            prev.map((doc) => {
                if (doc.id === docId) {
                    const updatedSupport = doc.supportFiles.filter((_, i) => i !== supportFileIndex);
                    return { ...doc, supportFiles: updatedSupport };
                }
                return doc;
            }),
        );
    };

    // ─── SUBMISSION ──────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (documentGroups.length === 0) {
            toast.error("Please select at least one primary document.");
            return;
        }

        setIsUploading(true);
        setUploadProgress(0); // Reset progress on new upload
        const uploadToastId = toast.loading("Preparing upload...");

        const formData = new FormData();
        
        formData.append("sector", sector);

        documentGroups.forEach((group) => {
            formData.append("files", group.mainFile);
            
            group.supportFiles.forEach((supportFile) => {
                formData.append("files", supportFile);
            });
        });

        // ─── NEW: Axios Progress Configuration ───
        const config = {
            onUploadProgress: (progressEvent) => {
                // Calculate percentage
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted);
                
                // Update toast message dynamically
                toast.update(uploadToastId, {
                    render: `Uploading... ${percentCompleted}%`,
                });
            }
        };

        try {
            // Pass the config alongside your formData!
            const response = await DocumentUpload(formData, config);

            console.log("Upload successful:", response);
            setDocumentGroups([]);

            toast.update(uploadToastId, {
                render: "Documents uploaded successfully!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

        } catch (error) {
            console.error("Upload failed:", error);
            const errorMsg = error.response?.data?.message || "Failed to upload documents.";
            
            toast.update(uploadToastId, {
                render: errorMsg,
                type: "error",
                isLoading: false,
                autoClose: 4000,
            });
        } finally {
            setIsUploading(false);
            // Optionally, you can keep the progress bar at 100% for a moment, 
            // but setting it back to 0 cleans up the UI.
            setTimeout(() => setUploadProgress(0), 1000); 
        }
    };
    // ─────────────────────────────────────────────────────────────

    const currentTotalSizeMB = (calculateTotalSize() / (1024 * 1024)).toFixed(1);
    const sizePercentage = Math.min((calculateTotalSize() / MAX_TOTAL_SIZE) * 100, 100);

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="w-full max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-start"
        >
            <input
                type="file"
                multiple
                ref={supportFileInputRef}
                onChange={(e) => {
                    handleSupportFileSelect(e.target.files);
                    e.target.value = null;
                }}
                className="hidden"
                accept=".pdf, .docx, .txt, image/*"
            />

            <div className="space-y-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <h2 className="text-lg font-semibold text-gray-800">
                            1. Select Primary Documents
                        </h2>
                        <div className="text-right">
                            <p className="text-xs font-semibold text-gray-500 mb-1">TOTAL SIZE</p>
                            <p className={`text-sm font-bold ${sizePercentage > 90 ? "text-red-500" : "text-indigo-600"}`}>
                                {currentTotalSizeMB} <span className="text-gray-400 font-medium">/ 15 MB</span>
                            </p>
                        </div>
                    </div>

                    <div
                        onClick={() => mainFileInputRef.current.click()}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => { e.preventDefault(); handleMainFileSelect(e.dataTransfer.files); }}
                        className={`group flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-2xl transition-all cursor-pointer px-4 text-center ${isUploading || sizePercentage >= 100 ? "opacity-50 pointer-events-none" : "border-indigo-400 bg-white hover:bg-indigo-50/50"}`}
                    >
                        <input
                            type="file"
                            multiple
                            ref={mainFileInputRef}
                            onChange={(e) => handleMainFileSelect(e.target.files)}
                            className="hidden"
                            accept=".pdf, .docx, .txt, image/*"
                        />
                        <div className="flex flex-col items-center gap-2 pointer-events-none">
                            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
                                <i className="ri-upload-cloud-2-line text-indigo-500 text-xl"></i>
                            </div>
                            <p className="text-gray-600 text-sm">
                                <span className="text-indigo-600 font-bold group-hover:underline">Click here</span>{" "}
                                to upload primary files.
                            </p>
                            <p className="text-gray-400 text-xs">Max 15MB combined total</p>
                        </div>
                    </div>

                    {documentGroups.length > 0 && (
                        <div className="space-y-4">
                            {documentGroups.map((group) => (
                                <div key={group.id} className="p-4 bg-white border border-gray-200 rounded-2xl shadow-sm">
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            <i className="ri-file-text-fill text-2xl text-indigo-500 shrink-0"></i>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-semibold text-gray-800 truncate">{group.mainFile.name}</p>
                                                <p className="text-xs text-gray-400">{(group.mainFile.size / 1024 / 1024).toFixed(1)} MB</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => triggerSupportUpload(group.id)}
                                                disabled={isUploading || group.supportFiles.length >= 5 || sizePercentage >= 100}
                                                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${group.supportFiles.length >= 5 || sizePercentage >= 100 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"}`}
                                            >
                                                <i className="ri-attachment-line"></i>{" "}
                                                {group.supportFiles.length >= 5 ? "Max 5 Attached" : "Attach Support"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeMainDocument(group.id)}
                                                disabled={isUploading}
                                                className="text-gray-400 hover:text-red-500 p-1 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors"
                                            >
                                                <i className="ri-delete-bin-line text-lg"></i>
                                            </button>
                                        </div>
                                    </div>

                                    {group.supportFiles.length > 0 && (
                                        <div className="mt-3 ml-4 pl-4 border-l-2 border-indigo-100 space-y-2">
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Validating Documents</p>
                                                <p className="text-[10px] font-medium text-gray-400">{group.supportFiles.length} / 5</p>
                                            </div>
                                            {group.supportFiles.map((supportFile, sIndex) => (
                                                <div key={sIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded-xl border border-gray-100">
                                                    <div className="flex items-center gap-2 min-w-0 flex-1">
                                                        <i className="ri-shield-check-line text-emerald-500 text-lg shrink-0"></i>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-xs font-medium text-gray-600 truncate">{supportFile.name}</p>
                                                            <p className="text-[10px] text-gray-400">{(supportFile.size / 1024 / 1024).toFixed(1)} MB</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSupportFile(group.id, sIndex)}
                                                        disabled={isUploading}
                                                        className="text-gray-400 hover:text-red-500 p-1 shrink-0"
                                                    >
                                                        <i className="ri-close-line text-lg"></i>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-6 bg-gray-50 p-6 rounded-3xl border border-gray-100 sticky top-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">2. Document Category</h2>
                    <div className="flex flex-col gap-3">
                        <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${sector === "legal" ? "border-indigo-500 bg-indigo-50/50" : "border-gray-200 bg-white hover:bg-gray-50"} ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}>
                            <input type="radio" name="sector" value="legal" checked={sector === "legal"} onChange={(e) => setSector(e.target.value)} disabled={isUploading} className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                            <div className="ml-3">
                                <span className="block text-sm font-medium text-gray-900">Legal Documents</span>
                                <span className="block text-xs text-gray-500">Contracts, NDAs, compliance forms.</span>
                            </div>
                        </label>
                        <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${sector === "financial" ? "border-indigo-500 bg-indigo-50/50" : "border-gray-200 bg-white hover:bg-gray-50"} ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}>
                            <input type="radio" name="sector" value="financial" checked={sector === "financial"} onChange={(e) => setSector(e.target.value)} disabled={isUploading} className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500" />
                            <div className="ml-3">
                                <span className="block text-sm font-medium text-gray-900">Financial Documents</span>
                                <span className="block text-xs text-gray-500">Invoices, tax returns, balance sheets.</span>
                            </div>
                        </label>
                    </div>
                </div>

                <hr className="border-gray-200" />

                <div className="flex flex-col gap-3">
                    <button
                        type="submit"
                        disabled={documentGroups.length === 0 || isUploading}
                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex justify-center items-center gap-2"
                    >
                        {isUploading ? (
                            <><i className="ri-loader-4-line animate-spin"></i> Uploading...</>
                        ) : (
                            "Upload to Server"
                        )}
                    </button>

                    {/* ─── NEW: Visual Progress Bar ─── */}
                    {isUploading && (
                        <div className="w-full mt-2 animate-pulse">
                            <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1 px-1">
                                <span>Transferring data...</span>
                                <span>{uploadProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden border border-gray-300">
                                <div 
                                    className="bg-indigo-600 h-2.5 rounded-full transition-all ease-out duration-300" 
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
};

export default FileUpload;