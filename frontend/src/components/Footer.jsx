import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-20">
      <div className="container-max py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Exito Engineering</h3>
            <p className="text-gray-200">
              Your trusted partner in structural engineering excellence.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-200 hover:text-accent">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-200 hover:text-accent">
                  Services
                </a>
              </li>
              <li>
                <a href="/projects" className="text-gray-200 hover:text-accent">
                  Projects
                </a>
              </li>
              <li>
                <a href="/careers" className="text-gray-200 hover:text-accent">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-200">
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>+234 XXX XXX XXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>info@exitoengineering.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>Ibadan, Oyo State, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/30 mt-8 pt-8 text-center text-gray-200">
          <p>&copy; {new Date().getFullYear()} Exito Engineering Services Limited.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
