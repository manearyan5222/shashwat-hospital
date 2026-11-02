import React, { useReducer, useState } from 'react';

/**
 * ============================================================================
 * FLUX ARCHITECTURE EDUCATIONAL DEMONSTRATION
 * ============================================================================
 * 
 * Unidirectional Data Flow Cycle:
 * 
 *     +------------+         +------------+         +-----------+
 *     |   ACTION   | ------> | DISPATCHER | ------> |   STORE   |
 *     +------------+         +------------+         +-----------+
 *           ^                                             |
 *           |                                             v
 *     +------------+                                +-----------+
 *     | USER EVENT | <----------------------------- | VIEW (UI) |
 *     +------------+                                +-----------+
 * 
 * Rules of FLUX:
 * 1. Data flows in ONE DIRECTION only (Never two-way binding between store and view).
 * 2. Views CANNOT mutate Store directly; they can only dispatch Actions.
 * 3. Stores are updated exclusively through pure Reducers upon receiving actions.
 * 4. Views automatically re-render when Store state updates.
 * ============================================================================
 */

// 1. ACTION TYPES
const FLUX_ACTIONS = {
  ADD_ANNOUNCEMENT: 'ADD_ANNOUNCEMENT',
  MARK_READ: 'MARK_READ',
  DELETE_ANNOUNCEMENT: 'DELETE_ANNOUNCEMENT',
  RESET_ANNOUNCEMENTS: 'RESET_ANNOUNCEMENTS',
};

// 2. INITIAL STORE STATE
const INITIAL_ANNOUNCEMENTS_STATE = {
  announcements: [
    { id: 1, title: 'Fall 2026 Semester Registration Open', priority: 'HIGH', read: false, time: '10:00 AM' },
    { id: 2, title: 'Google Campus Placement Drive on Dec 15', priority: 'HIGH', read: true, time: '11:30 AM' },
    { id: 3, title: 'Library Renovation Scheduled this Weekend', priority: 'LOW', read: false, time: '02:15 PM' },
  ],
  actionLog: [
    { type: 'INITIALIZE_STORE', payload: 'Default state hydrated', timestamp: new Date().toLocaleTimeString() }
  ],
};

// 3. FLUX REDUCER (The logic inside the Store)
function announcementsReducer(state, action) {
  const newLogEntry = {
    type: action.type,
    payload: action.payload,
    timestamp: new Date().toLocaleTimeString(),
  };

  const updatedLog = [newLogEntry, ...state.actionLog.slice(0, 7)];

  switch (action.type) {
    case FLUX_ACTIONS.ADD_ANNOUNCEMENT:
      return {
        ...state,
        announcements: [action.payload, ...state.announcements],
        actionLog: updatedLog,
      };

    case FLUX_ACTIONS.MARK_READ:
      return {
        ...state,
        announcements: state.announcements.map((item) =>
          item.id === action.payload.id ? { ...item, read: true } : item
        ),
        actionLog: updatedLog,
      };

    case FLUX_ACTIONS.DELETE_ANNOUNCEMENT:
      return {
        ...state,
        announcements: state.announcements.filter((item) => item.id !== action.payload.id),
        actionLog: updatedLog,
      };

    case FLUX_ACTIONS.RESET_ANNOUNCEMENTS:
      return {
        ...INITIAL_ANNOUNCEMENTS_STATE,
        actionLog: updatedLog,
      };

    default:
      return state;
  }
}

export default function FluxArchitecturePage() {
  // Using useReducer as the local FLUX Dispatcher + Store
  const [storeState, dispatch] = useReducer(announcementsReducer, INITIAL_ANNOUNCEMENTS_STATE);

  // Local View state for input form
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState('MEDIUM');

  // ACTION CREATORS (Helper functions that dispatch Actions)
  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const action = {
      type: FLUX_ACTIONS.ADD_ANNOUNCEMENT,
      payload: {
        id: Date.now(),
        title: newTitle.trim(),
        priority: newPriority,
        read: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    };

    // Step 1 & 2: View creates Action and delivers to Dispatcher
    dispatch(action);
    setNewTitle('');
  };

  const handleMarkRead = (id) => {
    dispatch({
      type: FLUX_ACTIONS.MARK_READ,
      payload: { id },
    });
  };

  const handleDelete = (id) => {
    dispatch({
      type: FLUX_ACTIONS.DELETE_ANNOUNCEMENT,
      payload: { id },
    });
  };

  const handleReset = () => {
    dispatch({
      type: FLUX_ACTIONS.RESET_ANNOUNCEMENTS,
      payload: 'Reset to initial state',
    });
  };

  return (
    <div>
      <div className="card-header">
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>FLUX Architectural Pattern Demonstration</h1>
          <p className="card-desc">
            Unidirectional Data Flow &bull; Action &rarr; Dispatcher &rarr; Reducer (Store) &rarr; View (React)
          </p>
        </div>

        <button onClick={handleReset} className="btn btn-secondary btn-sm">
          Reset Store State
        </button>
      </div>

      {/* Visual Diagram Banner */}
      <div className="card" style={{ background: '#f8fafc', borderLeft: '4px solid #10b981' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#065f46', marginBottom: '0.75rem' }}>
          Unidirectional Data Flow Architecture
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', textAlign: 'center' }}>
          <div style={{ background: 'white', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>🎯 1. Action</div>
            <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Plain JavaScript object with <code>type</code> and <code>payload</code>.</p>
          </div>
          <div style={{ background: 'white', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>📢 2. Dispatcher</div>
            <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Central hub broadcasting actions to registered stores.</p>
          </div>
          <div style={{ background: 'white', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>📦 3. Store</div>
            <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Holds immutable application state; pure reducer computes next state.</p>
          </div>
          <div style={{ background: 'white', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>🖥️ 4. View</div>
            <p style={{ fontSize: '0.78rem', color: '#64748b' }}>React UI subscribing to store changes; dispatches new actions.</p>
          </div>
        </div>
      </div>

      {/* Live Interactive FLUX Playground */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* Left: View & Action Creator */}
        <div className="card" style={{ marginBottom: 0 }}>
          <h3 className="card-title" style={{ marginBottom: '0.25rem' }}>Interactive Announcement Hub (View)</h3>
          <p className="card-desc" style={{ marginBottom: '1rem' }}>
            Dispatching user actions directly updates the immutable store
          </p>

          <form onSubmit={handleAddAnnouncement} style={{ marginBottom: '1.25rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="announcementTitle">New Announcement Title</label>
              <input
                id="announcementTitle"
                type="text"
                className="form-input"
                placeholder="e.g. Midterm Exams Schedule Published"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <select
                className="form-select"
                style={{ width: '130px' }}
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>

              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                Dispatch Action &rarr;
              </button>
            </div>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {storeState.announcements.map((item) => (
              <div
                key={item.id}
                style={{
                  background: item.read ? '#f8fafc' : '#eff6ff',
                  border: item.read ? '1px solid #e2e8f0' : '1px solid #bfdbfe',
                  borderRadius: '6px',
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontWeight: item.read ? 500 : 700, fontSize: '0.88rem' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
                    Priority: <strong>{item.priority}</strong> &bull; {item.time} &bull; {item.read ? '✓ Read' : '● Unread'}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  {!item.read && (
                    <button
                      onClick={() => handleMarkRead(item.id)}
                      className="btn btn-secondary btn-sm"
                      title="Mark as read"
                    >
                      Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-danger btn-sm"
                    title="Delete announcement"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Dispatcher & Store Inspector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Dispatcher Action Log */}
          <div className="card" style={{ marginBottom: 0, flex: 1 }}>
            <h3 className="card-title" style={{ marginBottom: '0.25rem' }}>Dispatcher Action Stream</h3>
            <p className="card-desc" style={{ marginBottom: '0.75rem' }}>
              Real-time audit log of every dispatched Action
            </p>

            <div style={{ background: '#0f172a', color: '#93c5fd', padding: '0.75rem 1rem', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.8rem', maxHeight: '180px', overflowY: 'auto' }}>
              {storeState.actionLog.map((log, idx) => (
                <div key={idx} style={{ marginBottom: '0.35rem', borderBottom: '1px solid #1e293b', paddingBottom: '0.25rem' }}>
                  <span style={{ color: '#f59e0b' }}>[{log.timestamp}]</span>{' '}
                  <span style={{ color: '#10b981', fontWeight: 700 }}>{log.type}</span>
                  <div style={{ color: '#94a3b8', fontSize: '0.74rem', paddingLeft: '1rem' }}>
                    payload: {JSON.stringify(log.payload)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Store State Snapshot */}
          <div className="card" style={{ marginBottom: 0, flex: 1 }}>
            <h3 className="card-title" style={{ marginBottom: '0.25rem' }}>Store Snapshot (JSON)</h3>
            <p className="card-desc" style={{ marginBottom: '0.75rem' }}>
              Immutable single source of truth rendered by View
            </p>

            <pre style={{ background: '#f8fafc', border: '1px solid var(--border)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.78rem', maxHeight: '160px', overflowY: 'auto' }}>
              {JSON.stringify({
                totalCount: storeState.announcements.length,
                unreadCount: storeState.announcements.filter(a => !a.read).length,
                announcements: storeState.announcements,
              }, null, 2)}
            </pre>
          </div>

        </div>

      </div>
    </div>
  );
}
