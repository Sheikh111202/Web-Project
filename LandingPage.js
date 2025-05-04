import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    activeProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    averageCompletionTime: 0
  });

  useEffect(() => {
    // Mock data for demonstration
    setStats({
      activeProjects: 5,
      totalTasks: 120,
      completedTasks: 85,
      averageCompletionTime: 3.5 // in days
    });
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">Task Management System</div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </header>

      <main className="main-content">
        <section className="hero">
          <h1>Welcome to Task Management System</h1>
          <p>Streamline your projects and tasks with our comprehensive management solution</p>
        </section>

        <section className="stats-section">
          <h2>Current Project Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Active Projects</h3>
              <p className="stat-value">{stats.activeProjects}</p>
            </div>
            <div className="stat-card">
              <h3>Total Tasks</h3>
              <p className="stat-value">{stats.totalTasks}</p>
            </div>
            <div className="stat-card">
              <h3>Completed Tasks</h3>
              <p className="stat-value">{stats.completedTasks}</p>
            </div>
            <div className="stat-card">
              <h3>Avg. Completion Time</h3>
              <p className="stat-value">{stats.averageCompletionTime} days</p>
            </div>
          </div>
        </section>

        <section className="features">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Task Management</h3>
              <p>Create, assign, and track tasks efficiently</p>
            </div>
            <div className="feature-card">
              <h3>Time Tracking</h3>
              <p>Monitor project progress and time spent</p>
            </div>
            <div className="feature-card">
              <h3>Budget Control</h3>
              <p>Manage project budgets and resources</p>
            </div>
            <div className="feature-card">
              <h3>Feedback System</h3>
              <p>Collect and analyze user feedback</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2024 Task Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage; 