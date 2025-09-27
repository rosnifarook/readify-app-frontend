import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import footerLogo from "../assets/footer-logo.png";

const Footer = () => {
  return (
    <footer className="py-10 text-white bg-gray-900">
      {/* Top Section */}
      <div className="container flex flex-col items-center justify-between gap-8 mx-auto md:flex-row">
        {/* Left Side - Logo and Nav */}
        <div className="w-full md:w-1/2">
          <img src={footerLogo} alt="Logo" className="mb-5 w-36" />
          <ul className="flex flex-col gap-4 md:flex-row">
            <li>
              <a href="#home" className="hover:text-primary">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-primary">
                Services
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-primary">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-primary">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right Side - Newsletter */}
        <div className="w-full md:w-1/2">
          <p className="mb-4">
            Subscribe to our newsletter to receive the latest updates, news, and
            offers!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring focus:ring-primary"
            />
            <button className="px-6 py-2 transition bg-primary rounded-r-md hover:bg-primary-dark">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container flex flex-col items-center justify-between pt-6 mx-auto mt-10 border-t border-gray-700 md:flex-row">
        {/* Left Side - Privacy links */}
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li>
            <a href="#privacy" className="hover:text-primary">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#terms" className="hover:text-primary">
              Terms
            </a>
          </li>
          {/* Copyright */}
          <li className="text-gray-600">
            &copy; 2025 Readify. All rights reserved.
          </li>
        </ul>

        {/* Right Side - Social links */}
        <div className="flex gap-6">
          <a
            href="https://x.com/rosnifarook"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://web.facebook.com/rosnifarook"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.instagram.com/rosnifarook"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
