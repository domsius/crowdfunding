import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [currentStoryId, setCurrentStoryId] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/stories");
        setStories(response.data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  const handleDonateClick = (storyId) => {
    setCurrentStoryId(storyId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setDonationAmount("");
    setCurrentStoryId(null);
  };

  const handleDonateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/donations", {
        story_id: currentStoryId,
        amount: donationAmount,
      });
      handleModalClose();
      // Optionally, you can refetch the stories to update the collected amount
      const response = await axios.get("http://localhost:3001/api/stories");
      setStories(response.data);
    } catch (error) {
      console.error("Error submitting donation:", error);
    }
  };

  const calculateProgress = (collected, target) => {
    return (collected / target) * 100;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-8">Stories</h1>
          {stories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <div
                  key={story.id}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <img
                    src={story.image || "https://via.placeholder.com/150"}
                    alt={story.title}
                    className="w-full h-40 object-cover mb-4 rounded"
                  />
                  <h2 className="text-2xl font-bold mb-2">{story.title}</h2>
                  <p className="text-gray-700 mb-4">{story.description}</p>
                  <p className="text-gray-900 mb-4">
                    Target Amount: ${story.target_amount}
                  </p>
                  <p className="text-gray-900 mb-4">
                    Collected Amount: ${story.collected_amount}
                  </p>
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-indigo-600 h-4 rounded-full max-w-[341px]"
                        style={{
                          width: `${calculateProgress(
                            story.collected_amount,
                            story.target_amount
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {calculateProgress(
                        story.collected_amount,
                        story.target_amount
                      ).toFixed(2)}
                      % collected
                    </p>
                  </div>
                  <button
                    onClick={() => handleDonateClick(story.id)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    Donate
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No stories available
            </p>
          )}
        </div>
      </main>
      <Footer />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Donate</h2>
            <form onSubmit={handleDonateSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Donation Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Donate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
