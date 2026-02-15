import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  role: null, // 'student', 'guardian', or 'teacher'
  isLoggedIn: false,

  login: (userData, userRole) => {
    set({
      user: userData,
      role: userRole,
      isLoggedIn: true,
    });
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('role', userRole);
  },

  logout: () => {
    set({
      user: null,
      role: null,
      isLoggedIn: false,
    });
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  },

  initializeFromStorage: () => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');
    if (storedUser && storedRole) {
      set({
        user: JSON.parse(storedUser),
        role: storedRole,
        isLoggedIn: true,
      });
    }
  },
}));

export default useAuthStore;
