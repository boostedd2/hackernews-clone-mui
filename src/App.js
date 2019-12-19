import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar'
import PostList from './components/posts/postList'

function App() {
  return (
    <div className="App">
      <Navbar />
      <PostList />
    </div>
  );
}

export default App;
