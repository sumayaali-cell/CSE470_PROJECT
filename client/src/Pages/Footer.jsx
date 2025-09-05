import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">
        {/* Logo / Brand */}
        <div>
          <h1 className="text-2xl font-bold">MyBrand</h1>
          <p className="mt-2 text-gray-400">
            Building awesome web experiences.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300">About</a></li>
            <li><a href="#" className="hover:text-gray-300">Services</a></li>
            <li><a href="#" className="hover:text-gray-300">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-semibold mb-3">Contact</h2>
          <p>Email: info@mybrand.com</p>
          <p>Phone: +123 456 7890</p>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="hover:text-gray-300"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-300"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MyBrand. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
