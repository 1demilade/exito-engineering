import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import axiosInstance from "../api/axios";

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get("/projects");
        setFeaturedProjects(
          response.data.filter((p) => p.is_featured).slice(0, 3)
        );
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const services = [
    "Structural Engineering Design",
    "Steel Roofing & Fabrication",
    "Building Construction",
    "Architectural Design",
    "Project Management",
    "Structural Analysis",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-max py-28 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Building Excellence Through Engineering
          </h1>
          <p className="text-lg md:text-xl mb-10 text-gray-100 max-w-3xl mx-auto">
            Your trusted partner for structural engineering solutions
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="bg-accent text-white px-8 py-3 rounded-full font-semibold hover:bg-yellow-600 transition inline-flex items-center justify-center gap-2"
            >
              View Our Projects <ArrowRight size={18} />
            </Link>

            <Link
              to="/contact"
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="py-20 bg-gray-50">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">
            Our Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-accent mt-1 flex-shrink-0" size={28} />
                  <div>
                    <h3 className="font-semibold text-lg text-primary">
                      {service}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="text-secondary font-semibold hover:text-accent transition inline-flex items-center gap-2"
            >
              View All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
      {/* Featured Projects */}
      <div className="py-20 bg-white">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 border border-gray-100"
                >
                  <div className="h-56 bg-gradient-to-br from-gray-300 to-gray-400">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
                        [Project Image]
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 text-primary">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {project.description.substring(0, 100)}...
                    </p>
                    <span className="text-accent text-sm font-semibold">
                      {project.category}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500 py-12">
                <p>No featured projects yet. Check back soon!</p>
              </div>
            )}
          </div>
          {featuredProjects.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/projects"
                className="text-secondary font-semibold hover:text-accent transition inline-flex items-center gap-2"
              >
                View All Projects <ArrowRight size={18} />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg md:text-xl mb-10 text-gray-100 max-w-2xl mx-auto">
            Let's discuss how we can bring your vision to life with our expert engineering solutions
          </p>
          <Link
            to="/contact"
            className="bg-accent text-white px-8 py-3 rounded-full font-semibold hover:opacity-95 transition inline-block"
          >
            Contact Us Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
