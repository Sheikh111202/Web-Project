import React, { useState, useEffect } from 'react';
import Layout from '../../components/shared/Layout';

const Dashboard = () => {
  const [userStats, setUserStats] = useState({
    assignedTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    totalHours: 0,
    projects: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user')); // Fetch user from localStorage
  const userId = user ? user.id : null; // Get the user ID

  useEffect(() => {
    // Fetch the user stats from the API
    const fetchUserStats = async () => {
      try {
        if (!userId) {
          throw new Error('User ID is not available');
        }
        const response = await fetch(`http://localhost:3000/api/user/stats/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user stats');
        }
        const data = await response.json();
        setUserStats(data);
      } catch (error) {
        setError(error.message || 'Error fetching user stats');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserStats();
    }
  }, [userId]);

  if (loading) {
    return <Layout><div>Loading...</div></Layout>;
  }

  if (error) {
    return <Layout><div className="error">{error}</div></Layout>;
  }

  return (
    <Layout>
      <div className="user-dashboard">
        <h1>My Dashboard</h1>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Assigned Tasks</h3>
            <p>{userStats.assignedTasks}</p>
          </div>
          <div className="stat-card">
            <h3>In Progress</h3>
            <p>{userStats.inProgressTasks}</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p>{userStats.completedTasks}</p>
          </div>
          <div className="stat-card">
            <h3>Total Hours</h3>
            <p>{userStats.totalHours}</p>
          </div>
        </div>

        {/* My Projects */}
        <div className="my-projects">
          <h2>My Projects</h2>
          
        </div>

        {/* Recent Tasks */}
        <div className="recent-tasks">
          <h2>Recent Tasks</h2>
          {/* TODO: Add recent tasks list */}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button onClick={() => window.location.href = '/tasks'}>
              View My Tasks
            </button>
            <button onClick={() => window.location.href = '/time-tracking'}>
              Time Tracking
            </button>
            <button onClick={() => window.location.href = '/projects'}>
              View Projects
            </button>
            <button onClick={() => window.location.href = '/feedback'}>
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
