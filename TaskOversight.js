import React, { useState, useEffect } from 'react';
import Layout from '../../components/shared/Layout';

const TaskOversight = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch('/api/admin/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/admin/tasks/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <Layout><div>Loading...</div></Layout>;
  }

  if (error) {
    return <Layout><div className="error">{error}</div></Layout>;
  }

  return (
    <Layout>
      <div className="task-oversight">
        <h1>Task Oversight</h1>
        <button onClick={() => window.location.href = '/admin/tasks/new'}>
          Create New Task
        </button>
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Project</th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.project.name}</td>
                <td>{task.assignedTo.name}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => window.location.href = `/admin/tasks/${task.id}`}>
                    View
                  </button>
                  <button onClick={() => window.location.href = `/admin/tasks/${task.id}/edit`}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(task.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default TaskOversight; 