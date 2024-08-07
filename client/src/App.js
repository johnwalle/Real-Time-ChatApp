import './App.css';
import { useState } from 'react'; // Add this
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client'; // Add this
import Chat from './pages/chat/Chat'; // Add this
import Login from './components/auth/Login'; 
import Register from './components/auth/Register'; 

function App() {

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;