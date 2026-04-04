import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setIsAuth } from "../../redux/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthSingup } from "../../Api's/api's_Config/api.config.js";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();

  // Changed to 'navigate' for React Router best practices
  const navigate = useNavigate(); 
  const location = useLocation();

  const signupData = location.state;

  // ─── Security Check ──────────────────────────────────────────
  // If user refreshes the page, state is lost. Send them back!
  useEffect(() => {
    if (!signupData || !signupData.email || !signupData.password) {
      toast.error("Session expired or missing data. Please sign up again.");
      navigate("/signup");
    }
  }, [signupData, navigate]);

  // Handle typing
  const handleChange = (e, index) => {
    let value = e.target.value;
    value = value.substring(value.length - 1).toUpperCase();
    if (value && !/^[A-Z0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle pasting a full code
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .trim()
      .slice(0, 6)
      .toUpperCase();
      
    if (!/^[A-Z0-9]+$/.test(pastedData)) {
      toast.error("Please paste a valid alphanumeric code.");
      return;
    }

    const pastedArray = pastedData.split("");
    const newOtp = [...otp];
    pastedArray.forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);

    const focusIndex = pastedArray.length < 6 ? pastedArray.length : 5;
    if (inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus();
    }
  };

  // ─── The Final Submission to Backend ────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalCode = otp.join("");

    if (finalCode.length === 6) {
      // Double check data exists before sending
      if (!signupData) return;

      const tid = toast.loading("Verifying and creating account...");

      //  Build the precise payload your backend demands
      const payload = {
        firstName: signupData.firstName || "",
        lastName: signupData.lastName || "",
        email: signupData.email,
        password: signupData.password, 
        accountType: "user",
        otp: finalCode,
      };

      // Look at this in your browser console! (F12)
      console.log("🚀 Payload leaving Frontend:", payload);

      try {
        await AuthSingup(payload);

        toast.update(tid, {
          render: "Account created successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });

        dispatch(setIsAuth());
        navigate("/");
        
      } catch (error) {
        console.error("Signup failed:", error);
        
        // Safely extract the exact error message from Express
        const errorMessage = error.response?.data?.message || "Verification failed. Please try again.";

        toast.update(tid, {
          render: errorMessage,
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 mb-4">
            <i className="ri-shield-keyhole-line text-3xl text-indigo-600"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verify your account
          </h2>
          <p className="text-sm text-gray-500">
            We've sent a 6-character verification code to <br />
            <span className="font-semibold text-gray-800">
              {signupData?.email || "your email"}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="text"
                maxLength={1}
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-10 h-14 sm:w-12 sm:h-16 text-center text-xl sm:text-2xl font-bold text-gray-900 bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all uppercase"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={otp.join("").length !== 6}
            className="w-full py-4 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 disabled:active:scale-100 mt-4"
          >
            Verify & Create Account
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          Didn't receive the code?{" "}
          <button className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-all outline-none">
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;