import React from "react";
import { useNavigate } from "react-router-dom";

const ContactUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-10">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">

        {/* Left Content */}
        <div>
          <h1 className="text-5xl font-extrabold text-black mb-10">
            CONTACT US
          </h1>

          {/* Contact Items */}
          <div className="space-y-6 mb-10">
            {[
              "aswinks490@gmail.com",
              "dinilbabu8590@gmail.com",
              "devbuddy48@gmail.com",
              "aslamnizarn@gmail.com",
              "abhijithtmofficial@gmail.com",
              "harikrishnaner2006@gmail.com"
            ].map((email, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 cursor-pointer group"
                onClick={() => navigate(`/send-message?to=${email}`)}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black text-white group-hover:bg-indigo-600 transition-colors">
                  <span className="text-xl">✉️</span>
                </div>
                <span className="text-gray-700 font-medium group-hover:text-indigo-600 transition-colors">
                  {email}
                </span>
              </div>
            ))}
          </div>

          {/* Go Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
          >
            ← GO Back
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/images/contactus.jpg"
            alt="Contact illustration"
            className="w-[520px] md:w-[580px]"
          />
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
