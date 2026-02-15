import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  role: null, // 'student', 'guardian', or 'teacher'
  isLoggedIn: false,
  schoolCode: null,

  login: (userData, userRole, schoolCode = '') => {
    const userDataWithSchool = {
      ...userData,
      schoolCode: schoolCode,
    };
    set({
      user: userDataWithSchool,
      role: userRole,
      schoolCode: schoolCode,
      isLoggedIn: true,
    });
    localStorage.setItem('user', JSON.stringify(userDataWithSchool));
    localStorage.setItem('role', userRole);
    localStorage.setItem('schoolCode', schoolCode);
  },

  logout: () => {
    set({
      user: null,
      role: null,
      schoolCode: null,
      isLoggedIn: false,
    });
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('schoolCode');
  },

  initializeFromStorage: () => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');
    const storedSchoolCode = localStorage.getItem('schoolCode');
    if (storedUser && storedRole) {
      set({
        user: JSON.parse(storedUser),
        role: storedRole,
        schoolCode: storedSchoolCode || '',
        isLoggedIn: true,
      });
    }
  },
}));

export default useAuthStore;
