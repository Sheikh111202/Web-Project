import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <Link to="/">Task Management System</Link>
          </div>
          {user && (
            <div className="nav-links">
              {isAdmin() ? (
                <>
                  <Link to="/admin">Admin Dashboard</Link>
                  <Link to="/admin/users">Manage Users</Link>
                  <Link to="/admin/projects">Projects</Link>
                  <Link to="/admin/tasks">Tasks</Link>
                  <Link to="/feedback">Submit Feedback</Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/tasks">My Tasks</Link>
                  <Link to="/projects">Projects</Link>
                  <Link to="/time-tracking">Time Tracking</Link>
                  <Link to="/feedback">Submit Feedback</Link>
                </>
              )}
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </nav>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Task Management System</p>
      </footer>
    </div>
  );
};

export default Layout; 