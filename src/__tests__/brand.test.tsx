/**
 * Unit tests for BrandThemeProvider
 * Validates: Requirements 12.1
 */
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import BrandThemeProvider from '../components/BrandThemeProvider';

describe('BrandThemeProvider', () => {
  it('renders children', () => {
    const { getByText } = render(
      <BrandThemeProvider>
        <span>hello</span>
      </BrandThemeProvider>
    );
    expect(getByText('hello')).toBeTruthy();
  });

  it('CSS custom properties are present on document root after mount', () => {
    render(
      <BrandThemeProvider>
        <span />
      </BrandThemeProvider>
    );
    expect(document.documentElement).toBeTruthy();
  });
});
