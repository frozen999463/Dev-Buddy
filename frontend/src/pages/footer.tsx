import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white rounded-base shadow-xs ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-7" alt="Flowbite Logo" />
            <span className="text-heading self-center text-2xl font-semibold whitespace-nowrap">Flowbite</span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-body sm:mb-0">
             <Link to="/signup" className="text-blue-600 hover:underline font-medium">
              about
            </Link>
            <li><a href="#" className="hover:underline mr-4 md:mr-6">About</a></li>
            <li><a href="#" className="hover:underline mr-4 md:mr-6">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline mr-4 md:mr-6">Licensing</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <hr className="my-6 border-default sm:mx-auto lg:my-8 " />
        <span className="block text-sm text-body sm:text-center">
          © 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
