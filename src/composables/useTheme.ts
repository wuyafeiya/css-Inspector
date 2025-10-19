import { ref } from 'vue';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'css-playground-theme';

const currentTheme = ref<Theme>((localStorage.getItem(THEME_KEY) as Theme) || 'light');

export function useTheme() {
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme;
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
  };

  const toggleTheme = () => {
    const newTheme = currentTheme.value === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
  };

  // 初始化主题
  applyTheme(currentTheme.value);

  return {
    currentTheme,
    setTheme,
    toggleTheme,
  };
}
