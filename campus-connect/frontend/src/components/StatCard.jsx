import React from 'react';

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = '#2563eb',
  bg = '#eff6ff',
  loading = false,
}) {
  if (loading) {
    return (
      <div className="stat-card" aria-busy="true" aria-label={`Loading ${title || 'metric'}`}>
        <div className="stat-icon-wrapper skeleton" style={{ width: '50px', height: '50px' }} />
        <div style={{ flex: 1 }}>
          <div className="skeleton" style={{ height: '28px', width: '60px', marginBottom: '0.4rem' }} />
          <div className="skeleton" style={{ height: '14px', width: '120px', marginBottom: '0.3rem' }} />
          <div className="skeleton" style={{ height: '12px', width: '80px' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="stat-card" tabIndex="0" aria-label={`${title}: ${value}${subtitle ? `, ${subtitle}` : ''}`}>
      <div className="stat-icon-wrapper" style={{ backgroundColor: bg, color }} aria-hidden="true">
        {icon}
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{title}</div>
        {subtitle && (
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
