import './App.css';
import { useState } from 'react'; // Add this
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client'; // Add this
import Chat from './pages/chat'; // Add this
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Toaster } from 'react-hot-toast'; // Import Toaster for notifications
import { useAuthStore } from './container/auth.store'; // Import the store



function App() {

  // Access the user data from the store
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/login' element={!user ? <Login /> : <Chat />} />
          <Route path='/signup' element={!user ? <Register /> : <Chat />} />
          <Route path='/' element={user ? <Chat /> : <Login />} />
        </Routes>
      </div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </Router>
  );
}

export default App;