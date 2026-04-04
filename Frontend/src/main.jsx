import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Bounce, ToastContainer } from "react-toastify";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Settings from "./pages/Settings.jsx";
import Error from "./pages/Error.jsx";
import Help from "./pages/Help.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";
import Forget from "./components/security/Forget.jsx";
import Otp from "./components/security/Otp.jsx";
import ProtectedRoute from "./components/security/ProtectedRoute.jsx";
import ChangePass from "./components/security/ChangePass.jsx";
import DeleteAccount from "./components/security/DeleteAccount.jsx";

const appRouter = createBrowserRouter([
	{
		path: "/login",
		element: <SignIn />,
	},
	{
		path: "/signup",
		element: <SignUp />,
	},
	{
		path: "/otp",
		element: <Otp />,
	},
	{
		path: "/forget-password",
		element: <Forget />,
	},
	{
		// 🚨 UPDATE THIS ROUTE 🚨
		path: "/",
		element: (
			<ProtectedRoute>
				<App />
			</ProtectedRoute>
		),
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/settings",
				element: <Settings />,
			},
			{
				path: "/help",
				element: <Help />,
			},
			{
				path: "*",
				element: <Error />,
			},
			{
				path: "/change-password",
				element: <ChangePass />,
			},
			{
				path: "/delete-account",
				element: <DeleteAccount />,
			},
		],
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={appRouter} />
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
				transition={Bounce}
			/>
		</Provider>
	</StrictMode>,
);
