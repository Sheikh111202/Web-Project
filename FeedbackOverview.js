import React, { useState, useEffect } from 'react';
import Layout from '../../components/shared/Layout';

const FeedbackOverview = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch('/api/admin/feedback');
        const data = await response.json();
        setFeedback(data);
      } catch (err) {
        setError('Failed to fetch feedback');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) {
      return;
    }

    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/admin/feedback/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete feedback');
      }

      setFeedback(feedback.filter(item => item.id !== id));
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
      <div className="feedback-overview">
        <h1>Feedback Overview</h1>
        <div className="feedback-stats">
          <div className="stat-card">
            <h3>Total Feedback</h3>
            <p>{feedback.length}</p>
          </div>
          <div className="stat-card">
            <h3>Average Rating</h3>
            <p>{feedback.reduce((acc, curr) => acc + curr.rating, 0) / feedback.length}</p>
          </div>
        </div>
        <div className="feedback-list">
          {feedback.map(item => (
            <div key={item.id} className="feedback-card">
              <div className="feedback-header">
                <h3>{item.task.name}</h3>
                <span className="rating">Rating: {item.rating}/5</span>
              </div>
              <p className="comment">{item.comment}</p>
              <div className="feedback-meta">
                <span>By: {item.user.name}</span>
                <span>Date: {new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="feedback-actions">
                <button onClick={() => window.location.href = `/admin/feedback/${item.id}`}>
                  View Details
                </button>
                <button onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackOverview; 