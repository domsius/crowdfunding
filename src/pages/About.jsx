import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="mb-4">
              Our mission is to support creative projects and innovative ideas through a community-driven crowdfunding platform. We believe in the power of collective support to bring new ideas to life and make a positive impact on the world.
            </p>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="mb-4">
              Crowdfund was founded with the vision of connecting creators with backers who are passionate about supporting new and innovative projects. Since our launch, we have helped bring countless projects to fruition and continue to grow as a platform for creativity and innovation.
            </p>
            <h2 className="text-2xl font-bold mb-4">Meet the Team</h2>
            <p>
              Our team is comprised of experienced professionals from various fields who are dedicated to supporting creators and backers. We work tirelessly to ensure our platform is user-friendly, secure, and effective in helping projects succeed.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;