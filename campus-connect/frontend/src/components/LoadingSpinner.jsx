import React from 'react';

export default function LoadingSpinner({ message = 'Loading records...' }) {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <div
        style={{
          width: '36px',
          height: '36px',
          border: '3px solid #e2e8f0',
          borderTopColor: '#2563eb',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 1rem auto',
        }}
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>{message}</div>
    </div>
  );
}
