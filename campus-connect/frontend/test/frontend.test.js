import test from 'node:test';
import assert from 'node:assert/strict';

// 1. Test FLUX Action Types & Reducer Logic
test('FLUX State Reducer: should handle LOGIN_SUCCESS action immutably', () => {
  const INITIAL_STATE = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  };

  const action = {
    type: 'LOGIN_SUCCESS',
    payload: {
      user: { id: 1, username: 'admin', role: 'ADMIN' },
      token: 'jwt.sample.token',
    },
  };

  function authReducer(state, act) {
    if (act.type === 'LOGIN_SUCCESS') {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: act.payload.user,
        token: act.payload.token,
        error: null,
      };
    }
    return state;
  }

  const newState = authReducer(INITIAL_STATE, action);

  assert.equal(newState.isAuthenticated, true);
  assert.equal(newState.user.username, 'admin');
  assert.equal(newState.user.role, 'ADMIN');
  assert.equal(newState.token, 'jwt.sample.token');
  assert.notEqual(newState, INITIAL_STATE); // Demonstrates immutability
});

test('FLUX State Reducer: should reset state on LOGOUT action', () => {
  const LOGGED_IN_STATE = {
    user: { id: 1, username: 'admin' },
    token: 'jwt.sample.token',
    isAuthenticated: true,
    loading: false,
    error: null,
  };

  const action = { type: 'LOGOUT' };

  function authReducer(state, act) {
    if (act.type === 'LOGOUT') {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      };
    }
    return state;
  }

  const newState = authReducer(LOGGED_IN_STATE, action);

  assert.equal(newState.isAuthenticated, false);
  assert.equal(newState.user, null);
  assert.equal(newState.token, null);
});

// 2. Test Input Validation Utilities
test('Client Form Validation: GPA bounds check', () => {
  function isValidGpa(gpa) {
    const val = parseFloat(gpa);
    return !isNaN(val) && val >= 0.0 && val <= 4.0;
  }

  assert.equal(isValidGpa('3.85'), true);
  assert.equal(isValidGpa('0.00'), true);
  assert.equal(isValidGpa('4.00'), true);
  assert.equal(isValidGpa('-0.5'), false);
  assert.equal(isValidGpa('4.50'), false);
  assert.equal(isValidGpa('abc'), false);
});

test('Client Form Validation: Email pattern check', () => {
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  assert.equal(isValidEmail('student@campusconnect.edu'), true);
  assert.equal(isValidEmail('admin.mitchell@univ.edu'), true);
  assert.equal(isValidEmail('not-an-email'), false);
  assert.equal(isValidEmail('missing@domain'), false);
});

// 3. Test API URL Query Param Construction
test('API Service: Query parameter builder filters null/empty attributes', () => {
  function buildQueryString(params) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        query.append(key, val);
      }
    });
    return query.toString();
  }

  const result = buildQueryString({
    query: 'Alex',
    department: '',
    year: 4,
    status: null,
  });

  assert.equal(result, 'query=Alex&year=4');
});

// 4. Test Dashboard Calculation & Guard Logic
test('Dashboard Logic: safe percentage calculation with zero candidates', () => {
  function calculatePercentage(count, total) {
    if (!total || total <= 0) return 0;
    return Math.min(100, Math.max(0, Math.round((count / total) * 100)));
  }

  assert.equal(calculatePercentage(3, 10), 30);
  assert.equal(calculatePercentage(0, 0), 0);
  assert.equal(calculatePercentage(5, 0), 0);
  assert.equal(calculatePercentage(15, 10), 100); // clamped to 100
  assert.equal(calculatePercentage(-1, 10), 0); // clamped to 0
});

test('Dashboard Logic: empty state detection triggers when campus records are empty', () => {
  function hasMetrics(summary) {
    if (!summary) return false;
    return (summary.totalStudents > 0 || summary.totalCourses > 0 || summary.totalOpportunities > 0);
  }

  assert.equal(hasMetrics(null), false);
  assert.equal(hasMetrics({ totalStudents: 0, totalCourses: 0, totalOpportunities: 0 }), false);
  assert.equal(hasMetrics({ totalStudents: 6, totalCourses: 4, totalOpportunities: 4 }), true);
});

