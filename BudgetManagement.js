import React, { useState, useEffect } from 'react';
import Layout from '../../components/shared/Layout';

const BudgetManagement = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch('/api/admin/budgets');
        const data = await response.json();
        setBudgets(data);
      } catch (err) {
        setError('Failed to fetch budgets');
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  if (loading) {
    return <Layout><div>Loading...</div></Layout>;
  }

  if (error) {
    return <Layout><div className="error">{error}</div></Layout>;
  }

  return (
    <Layout>
      <div className="budget-management">
        <h1>Budget Management</h1>
        <button onClick={() => window.location.href = '/admin/budgets/new'}>
          Create New Budget
        </button>
        <div className="budget-grid">
          {budgets.map(budget => (
            <div key={budget.id} className="budget-card">
              <h3>{budget.project.name}</h3>
              <p>Total Budget: ${budget.totalAmount}</p>
              <p>Used: ${budget.usedAmount}</p>
              <p>Remaining: ${budget.remainingAmount}</p>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${(budget.usedAmount / budget.totalAmount) * 100}%` }}
                />
              </div>
              <div className="budget-actions">
                <button onClick={() => window.location.href = `/admin/budgets/${budget.id}`}>
                  View Details
                </button>
                <button onClick={() => window.location.href = `/admin/budgets/${budget.id}/edit`}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BudgetManagement; 