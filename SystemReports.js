import React, { useState, useEffect } from 'react';
import Layout from '../../components/shared/Layout';

const SystemReports = () => {
  const [reports, setReports] = useState({
    taskProgress: [],
    timeTracking: [],
    budget: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // TODO: Replace with actual API calls
        const [taskProgress, timeTracking, budget] = await Promise.all([
          fetch('/api/admin/reports/task-progress').then(res => res.json()),
          fetch('/api/admin/reports/time-tracking').then(res => res.json()),
          fetch('/api/admin/reports/budget').then(res => res.json())
        ]);

        setReports({
          taskProgress,
          timeTracking,
          budget
        });
      } catch (err) {
        setError('Failed to fetch reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <Layout><div>Loading...</div></Layout>;
  }

  if (error) {
    return <Layout><div className="error">{error}</div></Layout>;
  }

  return (
    <Layout>
      <div className="system-reports">
        <h1>System Reports</h1>
        
        <div className="report-section">
          <h2>Task Progress Report</h2>
          <table className="reports-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Total Tasks</th>
                <th>Completed</th>
                <th>In Progress</th>
                <th>Not Started</th>
              </tr>
            </thead>
            <tbody>
              {reports.taskProgress.map(project => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{project.totalTasks}</td>
                  <td>{project.completedTasks}</td>
                  <td>{project.inProgressTasks}</td>
                  <td>{project.notStartedTasks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="report-section">
          <h2>Time Tracking Report</h2>
          <table className="reports-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Total Hours</th>
                <th>Tasks Completed</th>
                <th>Average Time per Task</th>
              </tr>
            </thead>
            <tbody>
              {reports.timeTracking.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.totalHours}</td>
                  <td>{user.tasksCompleted}</td>
                  <td>{user.averageTimePerTask}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="report-section">
          <h2>Budget Report</h2>
          <table className="reports-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Total Budget</th>
                <th>Used</th>
                <th>Remaining</th>
                <th>Utilization %</th>
              </tr>
            </thead>
            <tbody>
              {reports.budget.map(project => (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>${project.totalBudget}</td>
                  <td>${project.usedBudget}</td>
                  <td>${project.remainingBudget}</td>
                  <td>{project.utilizationPercentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="report-actions">
          <button onClick={() => window.print()}>
            Print Reports
          </button>
          <button onClick={() => window.location.href = '/api/admin/reports/export'}>
            Export to CSV
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SystemReports; 