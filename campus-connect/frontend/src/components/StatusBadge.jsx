import React from 'react';

export default function StatusBadge({ status }) {
  if (!status) return null;

  const normalized = status.toUpperCase();
  let badgeClass = 'badge-inactive';

  switch (normalized) {
    case 'ACTIVE':
    case 'OPEN':
    case 'SELECTED':
    case 'COMPLETED':
      badgeClass = 'badge-active';
      break;
    case 'ENROLLED':
    case 'APPLIED':
    case 'GRADUATED':
      badgeClass = 'badge-applied';
      break;
    case 'SHORTLISTED':
    case 'INTERVIEWING':
      badgeClass = 'badge-shortlisted';
      break;
    case 'CLOSED':
    case 'REJECTED':
    case 'DROPPED':
      badgeClass = 'badge-closed';
      break;
    default:
      badgeClass = 'badge-inactive';
  }

  return (
    <span className={`badge ${badgeClass}`}>
      {status}
    </span>
  );
}
