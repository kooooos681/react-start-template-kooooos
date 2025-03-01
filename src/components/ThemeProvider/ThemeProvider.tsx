import React, { useContext, useEffect, useMemo, useState } from "react";
export type Theme = 'light' | 'dark';
type ThemeContext = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = React.createContext<ThemeContext>({} as ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({});

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    console.log(theme);
  };

  useEffect(() => {
    setContainerStyle({
      background: theme === 'light' ? '#000' : '#fff',
      color: theme === 'light' ? '#fff' : '#000',
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={containerStyle}>{children}</div>
    </ThemeContext.Provider>
  );
};
