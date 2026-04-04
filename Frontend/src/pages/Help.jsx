import React, { useState } from "react";
import { toast } from "react-toastify";

const Help = () => {
  // State to track which FAQ is currently open
  const [activeIndex, setActiveIndex] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleFAQ = (index) => {
    // If clicking the already open FAQ, close it. Otherwise, open the new one.
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Handle form submission inside the modal
  const handleSupportSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !query) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate an API call here (Replace with your actual Axios POST request)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Your query has been sent! We will reach out to you shortly.");
      
      // Reset form and close modal
      setEmail("");
      setQuery("");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to send query. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Tailored FAQ Data
  const faqs = [
    {
      question: "What file formats are supported?",
      answer: "We currently support standard document formats including .pdf, .docx, .txt, and standard image files (PNG, JPG). The maximum file size for any single document is 15MB.",
    },
    {
      question: "How do I attach a supporting document?",
      answer: "First, upload your primary document. Once it appears in the list, click the 'Attach Support' button located next to that specific file to link a validating document directly to it.",
    },
    {
      question: "What is the difference between Legal and Financial categories?",
      answer: "Legal documents typically include contracts, NDAs, and compliance forms. Financial documents include invoices, tax returns, and balance sheets. Selecting the correct category helps route your files to the correct processing department.",
    },
    {
      question: "Are my uploaded documents secure?",
      answer: "Yes. All documents are encrypted during transfer using industry-standard SSL/TLS protocols. We strictly adhere to data privacy regulations and do not share your documents with unauthorized third parties.",
    },
    {
      question: "Why did my upload fail?",
      answer: "Uploads usually fail due to an unstable internet connection, a file exceeding the 15MB size limit, or an unsupported file type. Please check your network and file properties before trying again.",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 relative">
      
      {/* Header Section */}
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Help & Support
        </h1>
        <p className="text-gray-500 text-sm sm:text-base max-w-2xl">
          Find answers to common questions about uploading and
          managing your documents. If you can't find what you're
          looking for, feel free to reach out to our support team.
        </p>
      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <div
              key={index}
              className={`border-b border-gray-100 last:border-none transition-colors ${isOpen ? "bg-indigo-50/30" : "hover:bg-gray-50"}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
              >
                <span
                  className={`font-medium pr-4 ${isOpen ? "text-indigo-700" : "text-gray-800"}`}
                >
                  {faq.question}
                </span>

                {/* Expand/Collapse Icon */}
                <div
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? "bg-indigo-100 text-indigo-600 rotate-180" : "bg-gray-100 text-gray-500"}`}
                >
                  <i className="ri-arrow-down-s-line text-lg"></i>
                </div>
              </button>

              {/* Expandable Answer Area */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="px-6 pb-5 text-gray-600 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact Support Block */}
      <div className="mt-8 sm:mt-12 p-6 sm:p-8 bg-indigo-600 rounded-3xl text-white text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-indigo-200">
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold mb-2">Still need help?</h2>
          <p className="text-indigo-100 text-sm">
            Our technical support team is available 24/7 to assist
            you with any issues.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="shrink-0 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-50 active:scale-95 transition-all flex items-center gap-2 shadow-sm"
        >
          <i className="ri-mail-send-line text-lg"></i>
          Contact Support
        </button>
      </div>

      {/* Contact Support Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
          
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <i className="ri-customer-service-2-line text-indigo-600"></i>
                Submit a Query
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSupportSubmit} className="p-6 space-y-5">
              
              {/* Email Input */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-700"
                />
              </div>

              {/* Query Input */}
              <div className="space-y-1.5">
                <label htmlFor="query" className="block text-sm font-medium text-gray-700">
                  How can we help you? <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="query"
                  required
                  rows="4"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Please describe your issue or question in detail..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-700 resize-none"
                ></textarea>
              </div>

              {/* Modal Footer / Actions */}
              <div className="pt-2 flex items-center gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <><i className="ri-loader-4-line animate-spin"></i> Sending...</>
                  ) : (
                    <><i className="ri-send-plane-fill"></i> Send Message</>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Help;