import React, { createContext, useContext, useReducer, useEffect } from 'react';

/**
 * ============================================================================
 * FLUX-STYLE ARCHITECTURAL STATE MANAGEMENT DEMONSTRATION
 * ============================================================================
 * 
 * FLUX Pattern Lifecycle:
 * 1. Action: An object containing { type, payload } describing an event.
 * 2. Dispatcher: Delivers the action to registered stores/reducers.
 * 3. Store: Central source of truth holding state; computes new state via pure reducer.
 * 4. View: React components subscribe to store state and dispatch new actions.
 * 
 * Flow: [View] --dispatches--> [Action] --> [Dispatcher/Reducer] --> [Store] --> [View updates]
 * ============================================================================
 */

// 1. FLUX ACTION TYPES
export const ACTION_TYPES = {
  AUTH_START: 'AUTH_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// 2. INITIAL FLUX STORE STATE
const INITIAL_STATE = {
  user: null,
  token: localStorage.getItem('cc_token') || null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

// 3. FLUX REDUCER (Pure function producing new state from action)
function authReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.AUTH_START:
      return { ...state, loading: true, error: null };

    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };

    case ACTION_TYPES.AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };

    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
      };

    case ACTION_TYPES.CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
}

const API_AUTH_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ? `${import.meta.env.VITE_API_URL}/auth` : '/api/auth';

// 4. REACT CONTEXT / STORE BINDING
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

  // Restore session from localStorage on startup & attach unauthorized session cleanup listener
  useEffect(() => {
    const handleUnauthorized = () => {
      dispatch({ type: ACTION_TYPES.LOGOUT });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('auth:unauthorized', handleUnauthorized);
    }

    const storedUser = localStorage.getItem('cc_user');
    const storedToken = localStorage.getItem('cc_token');

    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({
          type: ACTION_TYPES.LOGIN_SUCCESS,
          payload: { user, token: storedToken },
        });
      } catch (e) {
        localStorage.removeItem('cc_user');
        localStorage.removeItem('cc_token');
        dispatch({ type: ACTION_TYPES.LOGOUT });
      }
    } else {
      dispatch({ type: ACTION_TYPES.LOGOUT });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('auth:unauthorized', handleUnauthorized);
      }
    };
  }, []);

  // FLUX ACTION CREATORS (Helper methods that dispatch actions)
  const login = async (username, password) => {
    dispatch({ type: ACTION_TYPES.AUTH_START });
    try {
      const response = await fetch(`${API_AUTH_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      const userData = {
        id: data.id,
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        role: data.role,
        studentProfileId: data.studentProfileId,
      };

      localStorage.setItem('cc_token', data.token);
      localStorage.setItem('cc_user', JSON.stringify(userData));

      dispatch({
        type: ACTION_TYPES.LOGIN_SUCCESS,
        payload: { user: userData, token: data.token },
      });

      return { success: true };
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.AUTH_FAILURE,
        payload: err.message,
      });
      return { success: false, error: err.message };
    }
  };

  const register = async (registerData) => {
    dispatch({ type: ACTION_TYPES.AUTH_START });
    try {
      const response = await fetch(`${API_AUTH_BASE}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      const userData = {
        id: data.id,
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        role: data.role,
        studentProfileId: data.studentProfileId,
      };

      localStorage.setItem('cc_token', data.token);
      localStorage.setItem('cc_user', JSON.stringify(userData));

      dispatch({
        type: ACTION_TYPES.LOGIN_SUCCESS,
        payload: { user: userData, token: data.token },
      });

      return { success: true };
    } catch (err) {
      dispatch({
        type: ACTION_TYPES.AUTH_FAILURE,
        payload: err.message,
      });
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('cc_token');
    localStorage.removeItem('cc_user');
    dispatch({ type: ACTION_TYPES.LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
