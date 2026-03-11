import React from "react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          We are committed to providing the best products and services to our
          customers. Our mission is to make your shopping experience seamless
          and enjoyable.
        </p>
      </section>

      {/* Mission Section */}
      <section className="flex flex-col md:flex-row items-center gap-8">
        <img
          src="/assets/img/2_003.webp"
          alt="Our Mission"
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to deliver high-quality products while ensuring
            customer satisfaction. We focus on innovation, sustainability, and
            reliability in everything we do.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              name: "Alice Johnson",
              role: "CEO",
              img: "/assets/img/team1.jpg",
            },
            { name: "Bob Smith", role: "CTO", img: "/assets/img/team2.jpg" },
            {
              name: "Clara Lee",
              role: "Marketing Lead",
              img: "/assets/img/team3.jpg",
            },
            {
              name: "David Kim",
              role: "Designer",
              img: "/assets/img/team4.jpg",
            },
          ].map((member) => (
            <div
              key={member.name}
              className="bg-white p-4 rounded-lg shadow flex flex-col items-center gap-2"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 object-cover rounded-full"
              />
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section className="bg-primary-color text-white p-10 rounded-lg text-center space-y-4">
        <h2 className="text-2xl font-semibold">Get in Touch</h2>
        <p>Have questions or want to collaborate? Reach out to us anytime!</p>
        <a
          href="mailto:contact@yourcompany.com"
          className="inline-block border-white border text-primary-color font-semibold px-6 py-3 rounded hover:border-gray-100 hover:text-gray-100 transition"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
