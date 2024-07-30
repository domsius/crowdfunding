import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StoryList = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/stories');
        setStories(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStories();
  }, []);

  return (
    <div>
      <h1>Stories</h1>
      {stories.length > 0 ? (
        <ul>
          {stories.map((story) => (
            <li key={story.id}>
              <h2>{story.title}</h2>
              <img src={story.image} alt={story.title} />
              <p>{story.description}</p>
              <p>Target Amount: {story.target_amount}</p>
              <p>Collected Amount: {story.collected_amount}</p>
              <p>Author: {story.author_id}</p>
              <button onClick={() => handleDonate(story.id)}>Donate</button>
              <ul>
                {story.donations && story.donations.map(donation => (
                  <li key={donation.id}>
                    {donation.donor_name} donated {donation.amount}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No stories found</p>
      )}
    </div>
  );
};

export default StoryList;