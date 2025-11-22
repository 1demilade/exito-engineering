import React, { useState } from "react";
import axiosInstance from "../api/axios";
import { Briefcase, Users, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";

const Careers = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    specialty: "",
    experience_years: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const specialties = [
    "Structural Engineer",
    "Steel Fabricator",
    "Welder",
    "Project Manager",
    "Construction Supervisor",
    "Architect",
    "Civil Engineer",
    "Quantity Surveyor",
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axiosInstance.post("/applications", {
        ...formData,
        experience_years: parseInt(formData.experience_years),
      });
      setSubmitted(true);
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        specialty: "",
        experience_years: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError("Failed to submit application. Please try again.");
      console.error("Error submitting application:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Join Our Team</h1>
          <p className="text-lg md:text-xl text-gray-100">Be Part of Something Great</p>
        </div>
      </div>

      {/* Why Work With Us */}
      <div className="py-20 bg-white">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">
            Why Work With Exito Engineering?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100 text-center">
              <TrendingUp className="text-accent mx-auto mb-6" size={48} />
              <h3 className="text-xl font-bold mb-4 text-primary">
                Growth Opportunities
              </h3>
              <p className="text-gray-600 text-sm">
                Develop your skills and advance your career with diverse and challenging projects.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100 text-center">
              <Briefcase className="text-accent mx-auto mb-6" size={48} />
              <h3 className="text-xl font-bold mb-4 text-primary">
                Competitive Compensation
              </h3>
              <p className="text-gray-600 text-sm">
                We offer attractive packages that recognize and reward your expertise.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100 text-center">
              <Users className="text-accent mx-auto mb-6" size={48} />
              <h3 className="text-xl font-bold mb-4 text-primary">
                Professional Environment
              </h3>
              <p className="text-gray-600 text-sm">
                Work alongside experienced professionals in a collaborative and supportive setting.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary">
            Apply Now
          </h2>

          {submitted && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-green-800">
                  Application Submitted!
                </h4>
                <p className="text-green-700 text-sm">
                  Thank you for your interest. We'll review your application and get back to you soon.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-600 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-red-800">Error</h4>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-md border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                  placeholder="+234 800 000 0000"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Specialty *
                </label>
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                >
                  <option value="">Select a specialty</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                Years of Experience *
              </label>
              <input
                type="number"
                name="experience_years"
                value={formData.experience_years}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="e.g., 5"
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-2 text-sm">
                Why do you want to join us?
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Tell us about yourself and your career goals..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:opacity-95 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>

            <p className="text-xs text-gray-600 mt-4 text-center">
              Note: CV upload feature will be added soon. Please mention your key experience in the message field.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Careers;
