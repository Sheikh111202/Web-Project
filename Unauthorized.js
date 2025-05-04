import React from 'react';
import Layout from '../../components/shared/Layout';

const Unauthorized = () => {
  return (
    <Layout>
      <div className="unauthorized-container">
        <h1>Unauthorized Access</h1>
        <p>You don't have permission to access this page.</p>
        <p>Please contact your administrator if you believe this is an error.</p>
        <button onClick={() => window.location.href = '/dashboard'}>
          Return to Dashboard
        </button>
      </div>
    </Layout>
  );
};

export default Unauthorized; 