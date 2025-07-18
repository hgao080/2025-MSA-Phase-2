import { create } from 'zustand';

interface ThemeStore {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  isDarkMode: false,

  toggleTheme: () => {
    const { isDarkMode } = get();
    const newMode = !isDarkMode;
    
    // Update local storage
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    
    // Update document class
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    set({ isDarkMode: newMode });
  },

  setTheme: (isDark: boolean) => {
    // Update local storage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Update document class
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    set({ isDarkMode: isDark });
  },

  initializeTheme: () => {
    // Check for saved theme preference - default to light mode
    const savedTheme = localStorage.getItem('theme');
    
    // Only use dark mode if explicitly saved as 'dark'
    const isDarkMode = savedTheme === 'dark';
    
    // Apply theme
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    set({ isDarkMode });
  }
}));
