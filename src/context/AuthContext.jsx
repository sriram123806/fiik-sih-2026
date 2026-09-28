import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const USER_PROFILES = {
  startup: {
    name: 'GreenGrid Technologies Pvt. Ltd.',
    contactName: 'Rahul Deshmukh',
    email: 'rahul.deshmukh@greengridtech.in',
    sector: 'CleanTech / Waste Management',
    roleTitle: 'Startup Innovator',
  },
  department: {
    name: 'Department of Urban Development',
    contactName: 'Mr. Rahul Deshmukh (Deputy Commissioner)',
    email: 'ud.dept@maha.gov.in',
    sector: 'Municipal Governance',
    roleTitle: 'Government Nodal Officer',
  },
  evaluator: {
    name: 'Dr. Ananya Rao',
    contactName: 'Dr. Ananya Rao',
    email: 'ananya.rao@msins.gov.in',
    sector: 'Technical Evaluation Cell (MSInS)',
    roleTitle: 'Empanelled Evaluator',
  },
  admin: {
    name: 'MSInS Nodal Secretariat',
    contactName: 'MSInS Director',
    email: 'admin@msins.in',
    sector: 'State Innovation Society',
    roleTitle: 'MSInS Admin Authority',
  },
};

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const stored = localStorage.getItem('fiik_auth');
      return stored !== null ? stored === 'true' : true;
    } catch (e) {
      return true;
    }
  });

  const [role, setRoleState] = useState(() => {
    try {
      const storedRole = localStorage.getItem('fiik_role');
      return storedRole && USER_PROFILES[storedRole] ? storedRole : 'startup';
    } catch (e) {
      return 'startup';
    }
  });

  const [verifiedRoles, setVerifiedRoles] = useState(() => {
    try {
      const storedVerified = localStorage.getItem('fiik_verified_roles');
      return storedVerified ? JSON.parse(storedVerified) : { startup: true, department: true, evaluator: true, admin: true };
    } catch (e) {
      return { startup: true, department: true, evaluator: true, admin: true };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('fiik_role', role);
      localStorage.setItem('fiik_auth', isAuthenticated ? 'true' : 'false');
      localStorage.setItem('fiik_verified_roles', JSON.stringify(verifiedRoles));
    } catch (e) {
      // ignore
    }
  }, [role, isAuthenticated, verifiedRoles]);

  const login = (roleType = 'startup') => {
    const validRole = USER_PROFILES[roleType] ? roleType : 'startup';
    setIsAuthenticated(true);
    setRoleState(validRole);
    try {
      localStorage.setItem('fiik_role', validRole);
      localStorage.setItem('fiik_auth', 'true');
    } catch (e) {
      // ignore
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.setItem('fiik_auth', 'false');
    } catch (e) {
      // ignore
    }
  };

  const chooseRole = (selectedRole) => {
    const validRole = USER_PROFILES[selectedRole] ? selectedRole : 'startup';
    setRoleState(validRole);
    try {
      localStorage.setItem('fiik_role', validRole);
    } catch (e) {
      // ignore
    }
  };

  const verifyRole = (roleType, details = {}) => {
    setVerifiedRoles((prev) => {
      const updated = { ...prev, [roleType]: true };
      try {
        localStorage.setItem('fiik_verified_roles', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const isRoleVerified = (roleType = role) => {
    return !!verifiedRoles[roleType];
  };

  const currentUser = USER_PROFILES[role] || USER_PROFILES.startup;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        user: currentUser,
        login,
        logout,
        chooseRole,
        verifiedRoles,
        verifyRole,
        isRoleVerified,
      }}
    >
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
