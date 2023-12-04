import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const BACKEND = 'https://locashost:5005';//trabalhar nisto seguda feira ara ir buscar o id
    

    axios.get(BACKEND)
      .then((response) => {
        userName(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName); // SEGUNDA FEIRA, PENSAR EM FAZER ESTE SET NO SIGN UP, E VIR VUSCA LO AQUI 
    socket.emit('newUser', { userName, socketID: socket.id });
    navigate(`/chat/${userName.id}`); // Replace 'id' with the correct property from your book details
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button type="submit">GO TO CHAT</button>
    </form>
  );
};

export default Home;
