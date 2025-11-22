import React from "react";
import { Award, Users, Target, Shield } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Award size={40} />,
      title: "Excellence",
      description:
        "We deliver the highest quality engineering solutions that exceed expectations.",
    },
    {
      icon: <Users size={40} />,
      title: "Teamwork",
      description:
        "Collaboration and partnership drive our success in every project.",
    },
    {
      icon: <Target size={40} />,
      title: "Innovation",
      description:
        "We embrace cutting-edge technology and modern engineering practices.",
    },
    {
      icon: <Shield size={40} />,
      title: "Safety",
      description: "Safety is paramount in everything we design and build.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            About Exito Engineering
          </h1>
          <p className="text-lg md:text-xl text-gray-100">
            Building Trust Through Quality Engineering
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-20 bg-white">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-primary">Our Story</h2>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                Exito Engineering Services Limited was founded with a vision to provide world-class structural engineering solutions in Nigeria and beyond. With years of combined experience in the industry, our team has successfully delivered numerous projects across various sectors.
              </p>
              <p>
                From steel roofing and fabrication to complete structural design and construction management, we bring expertise, dedication, and innovation to every project we undertake. Our commitment to excellence has made us a trusted partner for clients seeking reliable engineering services.
              </p>
              <p>
                We pride ourselves on our ability to handle projects of all scales, from residential buildings to large commercial and industrial structures. Our team of experienced engineers and technicians work collaboratively to ensure that every project meets the highest standards of quality and safety.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="py-20 bg-gray-50">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-100 text-center"
              >
                <div className="text-accent mb-6 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-20 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gradient-to-br from-primary to-secondary text-white p-10 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
              <p className="text-gray-100 text-lg leading-relaxed">
                To deliver exceptional structural engineering services that enhance the built environment, ensuring safety, quality, and sustainability in every project we undertake.
              </p>
            </div>
            <div className="bg-gradient-to-br from-secondary to-accent text-white p-10 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
              <p className="text-gray-100 text-lg leading-relaxed">
                To be the leading structural engineering firm in Nigeria, recognized for innovation, excellence, and our commitment to transforming the construction industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
