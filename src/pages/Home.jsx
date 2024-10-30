import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('science');
  const [difficulty, setDifficulty] = useState('easy');
  const [count, setCount] = useState('10');
  const navigate = useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && topic) {
      // Navigate to quiz page with user's name and topic
      navigate(`/quiz?name=${name}&topic=${topic}&difficulty=${difficulty}&count=${count}`);
    } else {
      alert('Please enter your name, choose a topic and difficulty ');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-[url('/assets/bg-home.jpg')] bg-no-repeat bg-cover">
      <div className="bg-[rgba(255,255,255,.4)] p-8 rounded-xl shadow-md w-96 backdrop-blur-md">
        <h2 className="text-4xl font-bold text-center mb-6">Qwiz</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Enter Your Name:</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-2 border-2 border-white rounded-lg text-black focus-visible:outline-none focus:outline-none"
              placeholder="Your name"
            />
          </div>

          {/* Topic Selection */}
          <div className="mb-6">
            <label htmlFor="topic" className="block text-gray-700 font-semibold mb-2">Choose a Topic:</label>
            <select 
              id="topic" 
              value={topic} 
              onChange={(e) => setTopic(e.target.value)} 
              className="w-full p-2 border-2 border-white focus-visible:outline-none focus:outline-none rounded-lg"
            >
              <option value="science">Science</option>
              <option value="history">History</option>
              <option value="math">Math</option>
              <option value="sports">Sports</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="difficulty" className="block text-gray-700 font-semibold mb-2">Choose a difficulty:</label>
            <select 
              id="difficulty" 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)} 
              className="w-full p-2 border-2 border-white focus-visible:outline-none focus:outline-none rounded-lg"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="count" className="block text-gray-700 font-semibold mb-2">Question Count:</label>
            <select 
              id="count" 
              value={count} 
              onChange={(e) => setCount(e.target.value)} 
              className="w-full p-2 border-2 border-white focus-visible:outline-none focus:outline-none rounded-lg"
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>

          {/* Start Quiz Button */}
          <button 
            type="submit" 
            className="w-full bg-black text-white p-2 rounded-lg hover:bg-neutral-900 transition duration-300"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
