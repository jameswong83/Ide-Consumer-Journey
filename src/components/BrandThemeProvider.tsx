import '../styles/brand-theme.css';

interface BrandThemeProviderProps {
  children: React.ReactNode;
}

export default function BrandThemeProvider({ children }: BrandThemeProviderProps) {
  return <>{children}</>;
}
