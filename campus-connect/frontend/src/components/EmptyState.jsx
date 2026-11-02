import React from 'react';

export default function EmptyState({ title = 'No records found', description, actionLabel, onAction }) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '3.5rem 1.5rem',
        background: '#ffffff',
        border: '1px dashed #cbd5e1',
        borderRadius: '10px',
        margin: '1rem 0',
      }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📂</div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#334155' }}>{title}</h3>
      {description && (
        <p style={{ color: '#64748b', fontSize: '0.88rem', maxWidth: '420px', margin: '0.35rem auto 1.25rem auto' }}>
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn btn-primary btn-sm">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
