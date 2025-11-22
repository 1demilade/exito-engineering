import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { Calendar, Tag, Building2 } from "lucide-react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get("/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Projects</h1>
          <p className="text-lg md:text-xl text-gray-100">
            Excellence Delivered, One Project at a Time
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-gray-50 py-10">
        <div className="container-max">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition duration-300 ${
                  selectedCategory === category
                    ? "bg-accent text-white shadow-md"
                    : "bg-white text-primary hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="py-20 bg-white">
        <div className="container-max">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Loading projects...</p>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 border border-gray-100"
                >
                  <div className="h-56 bg-gradient-to-br from-gray-300 to-gray-400 overflow-hidden">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Building2 size={48} />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-3 text-primary line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-accent font-semibold">
                        <Tag size={16} />
                        <span>{project.category}</span>
                      </div>
                      {project.completion_date && (
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                          <Calendar size={14} />
                          <span>{project.completion_date}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
