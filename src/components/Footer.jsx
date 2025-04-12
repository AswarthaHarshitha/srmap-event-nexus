
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/">
              <img
                src="https://tse2.mm.bing.net/th?id=OIP.xRiZIS_0QzBn0UdNitYlfgAAAA&pid=Api&P=0&h=180"
                alt="SRM Logo"
                className="h-12 mb-4"
              />
            </Link>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              EVENTSPHERE
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              SRM University's official event management platform for students and faculty.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-srm-green dark:text-gray-300 dark:hover:text-srm-gold">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-600 hover:text-srm-green dark:text-gray-300 dark:hover:text-srm-gold">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="text-gray-600 hover:text-srm-green dark:text-gray-300 dark:hover:text-srm-gold">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/auth/signup" className="text-gray-600 hover:text-srm-green dark:text-gray-300 dark:hover:text-srm-gold">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 text-srm-green" />
                <span className="text-gray-600 dark:text-gray-300">
                  SRM University, Andhra Pradesh, Neerukonda, Mangalagiri, Guntur District, Andhra Pradesh - 522240
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-srm-green" />
                <span className="text-gray-600 dark:text-gray-300">
                  +91 866 2429 299
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-srm-green" />
                <span className="text-gray-600 dark:text-gray-300">
                  info@srmap.edu.in
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com/srmuniversityap" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-srm-green dark:text-gray-300 dark:hover:text-srm-gold">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/srmapuni" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-srm-green dark:text-gray-300 dark:hover:text-srm-gold">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/srmap_official" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-srm-green dark:text-gray-300 dark:hover:text-srm-gold">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/srmuniversityap" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-srm-green dark:text-gray-300 dark:hover:text-srm-gold">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-4">
              <h5 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                Subscribe to our newsletter
              </h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-srm-green"
                />
                <button className="px-4 py-2 text-sm font-medium text-white bg-srm-green rounded-r-md hover:bg-srm-green-dark">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} EVENTSPHERE - SRM University AP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
