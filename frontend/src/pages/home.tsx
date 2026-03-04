import { useNavigate } from "react-router-dom";
export default function Home() {

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup")
  }

  return (
    <main className="bg-white">
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">

          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              LEARN TO CODE. BUILD <br /> YOUR FUTURE
            </h1>

            <p className="mt-6 text-gray-600 max-w-lg">
              Learn coding the simple and practical way.
              Start your coding journey with easy-to-follow lessons,
              hands-on practice, and real projects. Learn HTML, CSS,
              JavaScript, PHP, and more — designed for beginners and
              future developers.
            </p>

            <button
              onClick={handleGetStarted}
              type="button"
              className="mt-8 inline-flex items-center px-8 py-3 text-base font-semibold text-white bg-indigo-700 rounded-full hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 transition"
            >
              Lets Go
            </button>
          </div>

          {/* Right Illustration */}
          <div className="flex justify-center">
            <img
              src="/images/logodb1@2x.png"
              alt="Coding Illustration"
              className="w-full max-w-md"
            />
          </div>

        </div>
      </section>
    </main>
  );
}
