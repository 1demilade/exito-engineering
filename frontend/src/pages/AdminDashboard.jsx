import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { removeToken } from "../utils/auth";
import {
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  FileText,
  Users,
  FolderOpen,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [applications, setApplications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    category: "",
    completion_date: "",
    is_featured: false,
    image_url: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === "projects") {
        const response = await axiosInstance.get("/projects");
        setProjects(response.data);
      } else if (activeTab === "applications") {
        const response = await axiosInstance.get("/applications");
        setApplications(response.data);
      } else if (activeTab === "messages") {
        const response = await axiosInstance.get("/contact-messages");
        setMessages(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    removeToken();
    navigate("/admin/login");
  };

  const handleProjectChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProjectForm({
      ...projectForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await axiosInstance.put(`/projects/${editingProject.id}`, projectForm);
      } else {
        await axiosInstance.post("/projects", projectForm);
      }
      setShowProjectForm(false);
      setEditingProject(null);
      setProjectForm({
        title: "",
        description: "",
        category: "",
        completion_date: "",
        is_featured: false,
        image_url: "",
      });
      fetchData();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm(project);
    setShowProjectForm(true);
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axiosInstance.delete(`/projects/${id}`);
        fetchData();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleUpdateApplicationStatus = async (id, status) => {
    try {
      await axiosInstance.put(`/applications/${id}/status?status=${status}`);
      fetchData();
    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const handleDeleteApplication = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;
    try {
      await axiosInstance.delete(`/applications/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const handleMarkMessageRead = async (id) => {
    try {
      await axiosInstance.put(`/contact-messages/${id}/read`);
      fetchData();
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    try {
      await axiosInstance.delete(`/contact-messages/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-primary text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                activeTab === "projects"
                  ? "border-b-2 border-accent text-accent"
                  : "text-gray-600 hover:text-accent"
              }`}
            >
              <FolderOpen size={20} />
              Projects ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                activeTab === "applications"
                  ? "border-b-2 border-accent text-accent"
                  : "text-gray-600 hover:text-accent"
              }`}
            >
              <Users size={20} />
              Applications ({applications.length})
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition ${
                activeTab === "messages"
                  ? "border-b-2 border-accent text-accent"
                  : "text-gray-600 hover:text-accent"
              }`}
            >
              <FileText size={20} />
              Messages ({messages.filter((m) => !m.is_read).length})
            </button>
          </div>
        </div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-primary">
                Manage Projects
              </h2>
              <button
                onClick={() => {
                  setShowProjectForm(!showProjectForm);
                  setEditingProject(null);
                  setProjectForm({
                    title: "",
                    description: "",
                    category: "",
                    completion_date: "",
                    is_featured: false,
                    image_url: "",
                  });
                }}
                className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                <Plus size={20} />
                Add Project
              </button>
            </div>

            {showProjectForm && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-bold mb-4 text-primary">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h3>
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={projectForm.title}
                      onChange={handleProjectChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={projectForm.description}
                      onChange={handleProjectChange}
                      required
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Category
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={projectForm.category}
                        onChange={handleProjectChange}
                        required
                        placeholder="e.g., Steel Roofing"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Completion Date
                      </label>
                      <input
                        type="text"
                        name="completion_date"
                        value={projectForm.completion_date}
                        onChange={handleProjectChange}
                        placeholder="e.g., March 2024"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      name="image_url"
                      value={projectForm.image_url}
                      onChange={handleProjectChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="is_featured"
                      checked={projectForm.is_featured}
                      onChange={handleProjectChange}
                      className="w-4 h-4"
                    />
                    <label className="text-gray-700 font-semibold">
                      Feature on homepage
                    </label>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
                    >
                      {editingProject ? "Update" : "Create"} Project
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProjectForm(false);
                        setEditingProject(null);
                      }}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-40 bg-gray-300">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {project.description}
                    </p>
                    <p className="text-accent text-sm font-semibold mb-4">
                      {project.category}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="flex-1 flex items-center justify-center gap-2 bg-secondary text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">
              Job Applications
            </h2>
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-primary">
                        {app.full_name}
                      </h3>
                      <p className="text-gray-600">
                        {app.email} | {app.phone}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        app.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : app.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {app.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="font-semibold">Specialty:</span>{" "}
                      {app.specialty}
                    </div>
                    <div>
                      <span className="font-semibold">Experience:</span>{" "}
                      {app.experience_years} years
                    </div>
                  </div>
                  {app.message && (
                    <div className="mb-4">
                      <span className="font-semibold">Message:</span>
                      <p className="text-gray-600 mt-1">{app.message}</p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleUpdateApplicationStatus(app.id, "approved")
                      }
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateApplicationStatus(app.id, "rejected")
                      }
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleDeleteApplication(app.id)}
                      className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition flex items-center gap-2"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">
              Contact Messages
            </h2>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`bg-white p-6 rounded-lg shadow-md ${
                    !msg.is_read ? "border-l-4 border-accent" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-primary">
                        {msg.name}
                      </h3>
                      <p className="text-gray-600">
                        {msg.email} {msg.phone && `| ${msg.phone}`}
                      </p>
                    </div>
                    {!msg.is_read && (
                      <button
                        onClick={() => handleMarkMessageRead(msg.id)}
                        className="flex items-center gap-2 bg-accent text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition"
                      >
                        <Eye size={16} />
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Subject:</span>{" "}
                    {msg.subject}
                  </div>
                  <div>
                    <span className="font-semibold">Message:</span>
                    <p className="text-gray-600 mt-1">{msg.message}</p>
                  </div>
                  <p className="text-sm text-gray-400 mt-4">
                    Received: {new Date(msg.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
