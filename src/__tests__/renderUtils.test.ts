/**
 * Tests for renderWithToolRefs utility
 * Validates: Requirements 8.2
 */
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import React from 'react';
import { renderWithToolRefs } from '../utils/renderWithToolRefs';
import { IDE_TOOLS } from '../types/journey';

describe('renderWithToolRefs', () => {
  it('returns original string when no tool names present', () => {
    const result = renderWithToolRefs('hello world');
    expect(result).toBe('hello world');
  });

  it('returns empty string unchanged', () => {
    const result = renderWithToolRefs('');
    expect(result).toBe('');
  });

  it('wraps a single tool name in an array of nodes', () => {
    const result = renderWithToolRefs('I use Kiro daily');
    expect(Array.isArray(result)).toBe(true);
    const nodes = result as React.ReactNode[];
    // Should have text before, badge, text after
    expect(nodes.length).toBeGreaterThanOrEqual(2);
  });

  it('handles multiple tool names in one string', () => {
    const result = renderWithToolRefs('Kiro and Cursor are both great');
    expect(Array.isArray(result)).toBe(true);
    const nodes = result as React.ReactNode[];
    // At least 2 badge elements
    const badges = nodes.filter(n => React.isValidElement(n));
    expect(badges.length).toBeGreaterThanOrEqual(2);
  });

  it('is case-sensitive — lowercase tool names are not matched', () => {
    const result = renderWithToolRefs('i use kiro and cursor');
    // No match — returns original string
    expect(result).toBe('i use kiro and cursor');
  });

  it('handles "Claude Code" as a single tool (not split)', () => {
    const result = renderWithToolRefs('Try Claude Code today');
    expect(Array.isArray(result)).toBe(true);
    const nodes = result as React.ReactNode[];
    const badges = nodes.filter(n => React.isValidElement(n));
    expect(badges.length).toBe(1);
  });

  // Property 12: IDE tool names in content are rendered as distinct badges
  it('Property 12: IDE tool names in content are rendered as distinct badges', () => {
    // Feature: developer-ide-consumer-journey, Property 12: IDE tool names in content are rendered as distinct badges
    fc.assert(
      fc.property(
        fc.constantFrom(...IDE_TOOLS),
        fc.string({ maxLength: 20 }),
        fc.string({ maxLength: 20 }),
        (toolName, prefix, suffix) => {
          const text = `${prefix}${toolName}${suffix}`;
          const result = renderWithToolRefs(text);
          // Result should be an array (not the original string) since tool name is present
          expect(Array.isArray(result)).toBe(true);
          const nodes = result as React.ReactNode[];
          const badges = nodes.filter(n => React.isValidElement(n));
          expect(badges.length).toBeGreaterThanOrEqual(1);
        }
      ),
      { numRuns: 100 }
    );
  });
});
