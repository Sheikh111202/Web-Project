import React, { useState, useEffect } from 'react';
import Layout from '../../components/shared/Layout';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All'); // Track the current filter

  // Function to fetch tasks based on filter
  const fetchTasks = async (filter) => {
    try {
      let url = `http://localhost:3000/api/user/tasks`;
      if (filter !== 'All') {
        url += `?status=${filter}`;  // Append filter to URL if it's not 'All'
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(filter); // Fetch tasks whenever filter changes
  }, [filter]);

  if (loading) {
    return <Layout><div>Loading...</div></Layout>;
  }

  if (error) {
    return <Layout><div className="error">{error}</div></Layout>;
  }

  return (
    <Layout>
      <div className="my-tasks">
        <h1>My Tasks</h1>
        <div className="task-filters">
          <button onClick={() => setFilter('All')}>All</button>
          <button onClick={() => setFilter('In Progress')}>In Progress</button>
          <button onClick={() => setFilter('Completed')}>Completed</button>
          <button onClick={() => setFilter('Overdue')}>Overdue</button>
        </div>
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.task_id} className="task-card">
              <h3>{task.title}</h3>
              <p>Project: {task.project_id}</p>
              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>
              <p>Created At: {new Date(task.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MyTasks;
