import React from "react";

// 1. The Error Dictionary
// This maps specific status codes or string keys to their exact UI state.
const ERROR_MAP = {
	// --- Client Errors (4xx) ---
	400: {
		title: "Invalid Request",
		message:
			"The server couldn't understand the request due to invalid data.",
		theme: "bg-yellow-50 text-yellow-800 border-yellow-200",
		iconColor: "text-yellow-600 bg-yellow-100",
		canRetry: false,
	},
	401: {
		title: "Session Expired",
		message: "Please log in again to continue accessing your documents.",
		theme: "bg-blue-50 text-blue-800 border-blue-200",
		iconColor: "text-blue-600 bg-blue-100",
		canRetry: false,
	},
	403: {
		title: "Access Restricted",
		message:
			"You lack the necessary permissions to view or upload this file.",
		theme: "bg-orange-50 text-orange-800 border-orange-200",
		iconColor: "text-orange-600 bg-orange-100",
		canRetry: false,
	},
	404: {
		title: "Not Found",
		message: "The requested resource or endpoint could not be located.",
		theme: "bg-gray-50 text-gray-800 border-gray-200",
		iconColor: "text-gray-600 bg-gray-200",
		canRetry: false,
	},
	408: {
		title: "Request Timeout",
		message:
			"The connection timed out. The server took too long to respond.",
		theme: "bg-orange-50 text-orange-800 border-orange-200",
		iconColor: "text-orange-600 bg-orange-100",
		canRetry: true,
	},
	413: {
		title: "File Too Large",
		message:
			"The document you are trying to upload exceeds the maximum allowed size on our server. Please compress it and try again.",
		theme: "bg-orange-50 text-orange-800 border-orange-200",
		iconColor: "text-orange-600 bg-orange-100",
		canRetry: false, // Set to false because hitting 'Retry' with the same huge file will just fail again
	},
	429: {
		title: "Too Many Requests",
		message:
			"You've hit our rate limit. Please wait a moment before trying again.",
		theme: "bg-yellow-50 text-yellow-800 border-yellow-200",
		iconColor: "text-yellow-600 bg-yellow-100",
		canRetry: true,
	},

	// --- Server Errors (5xx) ---
	500: {
		title: "Server Crash",
		message:
			"We encountered an unexpected internal error. Our team has been notified.",
		theme: "bg-red-50 text-red-800 border-red-200",
		iconColor: "text-red-600 bg-red-100",
		canRetry: true,
	},
	502: {
		title: "Bad Gateway",
		message:
			"The server received an invalid response from the upstream server.",
		theme: "bg-red-50 text-red-800 border-red-200",
		iconColor: "text-red-600 bg-red-100",
		canRetry: true,
	},
	503: {
		title: "Service Unavailable",
		message:
			"The system is currently undergoing maintenance. Please try again later.",
		theme: "bg-indigo-50 text-indigo-800 border-indigo-200",
		iconColor: "text-indigo-600 bg-indigo-100",
		canRetry: true,
	},

	// --- Custom App States ---
	OFFLINE: {
		title: "No Internet Connection",
		message:
			"You appear to be offline. Please check your network and try again.",
		theme: "bg-slate-50 text-slate-800 border-slate-200",
		iconColor: "text-slate-600 bg-slate-200",
		canRetry: true,
	},
	DEFAULT: {
		title: "Unexpected Error",
		message: "Something went wrong while processing your request.",
		theme: "bg-red-50 text-red-800 border-red-200",
		iconColor: "text-red-600 bg-red-100",
		canRetry: true,
	},
};

const Error = ({ errorKey, onRetry }) => {
	// 2. Safely look up the error, falling back to 'DEFAULT' if the code isn't found
	const content = ERROR_MAP[errorKey] || ERROR_MAP["DEFAULT"];

	return (
		<div
			className={`flex flex-col items-center justify-center p-8 w-full max-w-md mx-auto text-center rounded-3xl border shadow-sm mt-8 transition-colors ${content.theme}`}
		>
			{/* Dynamic Icon */}
			<div
				className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 shrink-0 ${content.iconColor}`}
			>
				{errorKey === "OFFLINE" ? (
					// Special Wi-Fi slash icon for offline state
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-8 h-8"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 3l18 18M8.06 6.37a11.95 11.95 0 0111.4 1.34m-2.9 8.24a5.96 5.96 0 01-5.18 1.48m-5.4-2.1a8.96 8.96 0 01-1.34-6.84"
						/>
					</svg>
				) : (
					// Standard Alert icon
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-8 h-8"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
				)}
			</div>

			<h2 className="text-xl sm:text-2xl font-bold mb-2">
				{typeof errorKey === "number"
					? `${errorKey} | ${content.title}`
					: content.title}
			</h2>

			<p className="text-sm sm:text-base opacity-90 mb-8 leading-relaxed">
				{content.message}
			</p>

			{/* Conditionally render retry button */}
			{content.canRetry && onRetry && (
				<button
					onClick={onRetry}
					className="px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 active:scale-95 transition-all w-full sm:w-auto flex justify-center items-center gap-2 shadow-md hover:shadow-lg"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-5 h-5"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
						/>
					</svg>
					Try Again
				</button>
			)}
		</div>
	);
};

export default Error;
