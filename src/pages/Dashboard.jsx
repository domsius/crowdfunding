import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Dashboard = () => {
  const { isAuthenticated, userId } = useAuth();
  const [users, setUsers] = useState([]);
  const [stories, setStories] = useState([]);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user details to get the role
        const userDetailResponse = await axios.get(
          `http://localhost:3001/api/users/profile?userId=${userId}`
        );
        setUserRole(userDetailResponse.data.role);

        // Fetch all users and stories if the user is an admin
        if (userDetailResponse.data.role === "admin") {
          const userResponse = await axios.get(
            "http://localhost:3001/api/users"
          );
          setUsers(userResponse.data);

          const storyResponse = await axios.get(
            "http://localhost:3001/api/stories"
          );
          setStories(storyResponse.data);
        }

        // Fetch stories created by the user if the role is 'user'
        if (userDetailResponse.data.role === "user") {
          const userStoriesResponse = await axios.get(
            `http://localhost:3001/api/stories/author/${userId}`
          );
          setStories(userStoriesResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isAuthenticated && userId) {
      fetchData();
    }
  }, [isAuthenticated, userId]);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteStory = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/stories/${id}`);
      setStories(stories.filter((story) => story.id !== id));
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-100 py-12">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl font-bold text-center mb-8">
              Access Denied
            </h1>
            <p className="text-center">
              You do not have permission to view this page.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center mb-8">Dashboard</h1>

          {userRole === "admin" && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold leading-tight text-gray-900">
                Users
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                        Name
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Role
                      </th>
                      <th className="relative py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900">
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                          {user.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {user.role}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete<span className="sr-only">, {user.name}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {userRole === "admin" ? (
            <div className="overflow-x-auto">
              <h2 className="text-2xl font-semibold leading-tight text-gray-900">
                Stories
              </h2>
              {stories.length > 0 ? (
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                        Title
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Description
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Target Amount
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Collected Amount
                      </th>
                      <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Author
                      </th>
                      <th className="relative py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900">
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {stories.map((story) => (
                      <tr key={story.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                          {story.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {story.description}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          ${story.target_amount}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          ${story.collected_amount}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {story.author_id}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                          <button
                            onClick={() => handleDeleteStory(story.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete<span className="sr-only">, {story.title}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 text-center mt-4">
                  No stories available
                </p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <h2 className="text-2xl font-semibold leading-tight text-gray-900">
                Stories
              </h2>
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
                            className="bg-indigo-600 h-4 rounded-full"
                            style={{
                              width: `${
                                (story.collected_amount / story.target_amount) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {(
                            (story.collected_amount / story.target_amount) *
                            100
                          ).toFixed(2)}
                          % collected
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center mt-4">
                  No stories available
                </p>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
