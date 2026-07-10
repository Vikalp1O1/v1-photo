import React from 'react';
import { FiChevronRight, FiFacebook, FiInstagram, FiYoutube, FiHome, FiPhone, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full bg-black pt-16 pb-6 text-white">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Main Columns */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: QUICK LINKS */}
          <div>
            <h3 className="mb-6 font-sans text-sm font-bold uppercase tracking-widest text-white">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {['Home', 'About Me', 'Real Weddings', 'Photo Gallery', 'Video Gallery'].map((link) => (
                <li key={link}>
                  <a href="#" className="group flex items-center gap-2 font-sans text-[13px] text-gray-300 transition-colors hover:text-gold">
                    <FiChevronRight className="text-gold transition-transform group-hover:translate-x-1" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: FACEBOOK */}
          <div>
            <h3 className="mb-6 font-sans text-sm font-bold uppercase tracking-widest text-white">
              Facebook
            </h3>
            {/* Mock Facebook Page Plugin */}
            <div className="flex flex-col bg-white overflow-hidden rounded-sm w-[250px] max-w-full">
              {/* Cover Photo Area */}
              <div 
                className="h-[100px] bg-cover bg-center relative p-3 flex flex-col justify-end"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80')" }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="h-10 w-10 flex-shrink-0 bg-black border border-white flex items-center justify-center p-1">
                    <span className="text-white font-serif font-bold text-xs">as</span>
                  </div>
                  <div>
                    <h4 className="text-white font-sans font-bold text-sm leading-tight drop-shadow-md">Abhinav Soni Phot...</h4>
                    <p className="text-white/90 font-sans text-[10px] drop-shadow-md">55,000+ followers</p>
                  </div>
                </div>
              </div>
              {/* Action Area */}
              <div className="bg-gray-100 p-2 flex justify-between items-center border-t border-gray-200">
                <button className="flex items-center gap-1 bg-[#1877f2] text-white text-[10px] font-bold px-2 py-1 rounded-sm hover:bg-[#166fe5]">
                   <FiFacebook /> Follow Page
                </button>
                <button className="flex items-center gap-1 bg-white border border-gray-300 text-gray-700 text-[10px] font-bold px-2 py-1 rounded-sm hover:bg-gray-50">
                   Share
                </button>
              </div>
            </div>
          </div>

          {/* Column 3: FOLLOW US */}
          <div>
            <h3 className="mb-6 font-sans text-sm font-bold uppercase tracking-widest text-white">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <a href="#" className="text-white transition-colors hover:text-gold">
                <FiFacebook className="text-2xl" />
              </a>
              <a href="#" className="text-white transition-colors hover:text-gold">
                <FiInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-white transition-colors hover:text-red-500">
                <FiYoutube className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Column 4: ADDRESS */}
          <div>
            <h3 className="mb-6 font-sans text-sm font-bold uppercase tracking-widest text-white">
              Address
            </h3>
            <ul className="flex flex-col gap-4 font-sans text-[12px] leading-relaxed text-gray-300">
              <li className="flex items-start gap-3">
                <FiHome className="mt-1 flex-shrink-0 text-gold text-sm" />
                <span>B-65, First Floor, Jagdamba Colony, Shiv Path, Naya Khera, Ambabari, Jaipur, Rajasthan (302039)</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="flex-shrink-0 text-gold text-sm" />
                <span>+91-9799252529 / 9772792792</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="flex-shrink-0 text-gold text-sm" />
                <span>contact@abhinavsoniphotography.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-16 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-[11px] text-gray-400">
            © {new Date().getFullYear()} Abhinav Soni Photography. All Rights Reserved.
          </p>
          <p className="font-sans text-[11px] text-gray-400">
            Designed by <a href="#" className="text-gold hover:underline">Vikalp</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
