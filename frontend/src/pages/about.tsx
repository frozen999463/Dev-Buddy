import React from "react";
import { useNavigate } from "react-router-dom";


const AboutUs: React.FC = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-10">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">

        {/* Left Content */}
        <div>
          <h1 className="text-5xl font-extrabold text-black mb-6">
            ABOUT US
          </h1>

          <p className="text-gray-700 leading-relaxed max-w-md mb-8">
            DevBuddy is a website for learning coding, specially designed for beginners.
            It helps new learners understand programming concepts step by step with
            simple explanations, practical examples, and hands-on practice.
            DevBuddy makes coding easy, friendly, and fun for anyone starting their
            developer journey.
          </p>

          <button
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
            onClick={() => navigate(-1)}

          >
            ← GO Back
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/images/logodb1@2x.png"
            alt="DevBuddy Robot"
            className="w-[320px] md:w-[380px]"
          />
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
