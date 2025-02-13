import React, { useContext, useMemo, useState } from 'react';
export type Theme = 'light' | 'dark';
type ThemeContext = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = React.createContext<ThemeContext>({} as ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? null : 'light');
    console.log(theme);
  };

  const containerStyle = useMemo(() => {
    return { background: theme === 'light' ? '#000' : '#fff' };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={containerStyle}>{children}</div>
    </ThemeContext.Provider>
  );
};
