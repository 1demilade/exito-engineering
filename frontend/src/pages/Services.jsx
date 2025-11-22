import React from "react";
import { Link } from "react-router-dom";
import {
  Hammer,
  Building2,
  Cog,
  PenTool,
  ClipboardList,
  Wrench,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Building2 size={48} />,
      title: "Structural Engineering Design",
      description:
        "Comprehensive structural analysis and design for residential, commercial, and industrial buildings. We ensure your structures are safe, efficient, and code-compliant.",
    },
    {
      icon: <Hammer size={48} />,
      title: "Steel Roofing & Fabrication",
      description:
        "Expert steel roofing solutions including design, fabrication, and installation. We work with various roofing systems to meet your specific requirements.",
    },
    {
      icon: <Cog size={48} />,
      title: "Building Construction",
      description:
        "Full-service construction management from foundation to completion. Our team handles all aspects of the construction process with attention to detail.",
    },
    {
      icon: <PenTool size={48} />,
      title: "Architectural Design",
      description:
        "Creative and functional architectural designs that blend aesthetics with practicality. We turn your vision into reality with innovative design solutions.",
    },
    {
      icon: <ClipboardList size={48} />,
      title: "Project Management",
      description:
        "End-to-end project management services ensuring timely delivery, budget control, and quality assurance throughout your project lifecycle.",
    },
    {
      icon: <Wrench size={48} />,
      title: "Structural Analysis",
      description:
        "Advanced structural analysis using modern software and techniques. We provide detailed reports and recommendations for existing and new structures.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Services</h1>
          <p className="text-lg md:text-xl text-gray-100">
            Comprehensive Engineering Solutions for Every Need
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-20 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100"
              >
                <div className="text-accent mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold mb-4 text-primary">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20 bg-gray-50">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">
            Why Choose Exito Engineering?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
              <h3 className="text-lg font-bold mb-4 text-primary">
                Experienced Team
              </h3>
              <p className="text-gray-600">
                Our team consists of highly qualified engineers and technicians
                with years of industry experience.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
              <h3 className="text-lg font-bold mb-4 text-primary">
                Quality Assurance
              </h3>
              <p className="text-gray-600">
                We maintain strict quality control measures throughout every
                phase of your project.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
              <h3 className="text-lg font-bold mb-4 text-primary">
                Timely Delivery
              </h3>
              <p className="text-gray-600">
                We understand the importance of deadlines and work diligently to
                deliver projects on time.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
              <h3 className="text-lg font-bold mb-4 text-primary">
                Competitive Pricing
              </h3>
              <p className="text-gray-600">
                We offer competitive rates without compromising on quality or
                safety standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-lg md:text-xl mb-10 text-gray-100 max-w-2xl mx-auto">
            Contact us to discuss your specific requirements and get a free consultation.
          </p>
          <Link
            to="/contact"
            className="bg-accent text-white px-8 py-3 rounded-full font-semibold hover:opacity-95 transition inline-block"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
