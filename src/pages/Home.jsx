import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Welcome Section */}
        <section className="bg-gray-100 py-12">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Welcome to Crowdfund</h1>
              <p className="text-xl mb-8">
                Join us in supporting creative projects and innovative ideas.
              </p>
              <div className="flex gap-3 justify-center">
              <Link
                to="/stories"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Explore Stories
              </Link>
              <Link
                to="/add-story"
                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Add Your Story
              </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Information Section */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Empower Innovation</h2>
                <p>Fuel innovative ideas and bring breakthrough projects to life by contributing to crowdfunded campaigns.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Support Creatives</h2>
                <p>Back creative individuals and projects across various categories, helping them turn their visions into reality.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Join the Community</h2>
                <p>Become part of a vibrant community that values collaboration and the collective power of shared contributions.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;