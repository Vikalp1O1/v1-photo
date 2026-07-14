import React, { useState } from 'react';
import { FiHome, FiPhone, FiMail, FiFacebook, FiInstagram, FiYoutube, FiCheckCircle } from 'react-icons/fi';
import { inquiryApi } from '@/lib/endpoints';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirement: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset status on new input
    if (submitStatus) {
      setSubmitStatus(null);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      await inquiryApi.submit(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', requirement: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-white">
      {/* Left Side - Image & Contact Info */}
      <div className="relative w-full md:w-1/2 min-h-[60vh] md:h-auto flex items-center justify-center p-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80 filter grayscale"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=1400&auto=format&fit=crop')" }}
        />
        {/* Overlay block */}
        <div className="relative w-full max-w-md bg-white/55 p-10 shadow-xl z-10 mx-auto">
          <div className="flex flex-col gap-8 text-sm text-text">
            <div className="flex items-start gap-4">
              <FiHome className="text-lg mt-0.5 shrink-0 text-primary" />
              <p className="leading-relaxed">B-65, First Flore, Jagdamba Colony, Shiv Path, Naya Khera, Ambabari, Jaipur, Rajasthan (302039)</p>
            </div>
            <div className="flex items-center gap-4">
              <FiPhone className="text-lg shrink-0 text-primary" />
              <p>+91-9799252529 / 9772792792</p>
            </div>
            <div className="flex items-center gap-4">
              <FiMail className="text-lg shrink-0 text-primary" />
              <p>contact@abhinavsoniphotography.com</p>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white transition-colors text-primary">
                <FiFacebook className="text-sm" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white transition-colors text-primary">
                <FiInstagram className="text-sm" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white transition-colors text-primary">
                <FiYoutube className="text-sm" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-white transition-colors text-primary">
                <FiMail className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-white">
        <div className="w-full max-w-[500px]">
          <h2 className="font-cursive text-5xl md:text-6xl text-primary mb-4 font-bold tracking-wide">Get In Touch</h2>
          <p className="text-sm text-text mb-1">Your Search for Wedding Photographer - End's Here!</p>
          <p className="text-sm text-text mb-8">Get in touch with us to create something really beautiful.</p>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="* Your Name"
                className="w-full sm:w-1/2 border border-gray-200 p-3.5 text-sm focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400 text-text"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="* Your Email"
                className="w-full sm:w-1/2 border border-gray-200 p-3.5 text-sm focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400 text-text"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="* Phone No."
                className="w-full sm:w-1/2 border border-gray-200 p-3.5 text-sm focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400 text-text"
                required
              />
              <div className="w-full sm:w-1/2 relative">
                <select
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  className={`w-full border border-gray-200 p-3.5 text-sm appearance-none bg-transparent focus:outline-none focus:border-gray-400 transition-colors ${formData.requirement ? 'text-text' : 'text-gray-400'}`}
                  required
                >
                  <option value="" disabled className="text-gray-400">* Select an Requirement</option>
                  <option value="wedding" className="text-text">Wedding</option>
                  <option value="pre-wedding" className="text-text">Pre-Wedding</option>
                  <option value="maternity" className="text-text">Maternity</option>
                  <option value="kids" className="text-text">Kids</option>
                  <option value="other" className="text-text">Other</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-300">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4-4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                </div>
              </div>
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="6"
              className="w-full border border-gray-200 p-3.5 text-sm resize-none focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400 text-text"
            ></textarea>

            <p className="text-xs italic text-gray-400 -mt-1">* All fields are required!</p>

            {submitStatus === 'success' && (
              <div className="bg-green-50 text-green-700 border border-green-200 p-4 text-sm flex items-center gap-3">
                <FiCheckCircle className="text-lg shrink-0" />
                <p>Your message has been sent successfully! We will get back to you soon.</p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="bg-red-50 text-red-700 border border-red-200 p-4 text-sm">
                <p>{errorMessage}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#de3b53] hover:bg-[#c22f46] text-white py-4 text-sm font-semibold tracking-wider transition-colors mt-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
