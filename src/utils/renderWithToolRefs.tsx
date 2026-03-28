import { IDE_TOOLS } from '../types/journey';
import { IDE_TOOLS } from '../types/journey';

// Styled inline badge for IDE tool names
function IDEToolBadge({ children }: { children: string }) {
  return (
    <mark
      style={{
        backgroundColor: 'var(--color-brand-blue)',
        color: 'var(--color-text-on-blue)',
        borderRadius: '3px',
        padding: '0 4px',
        fontWeight: 'bold',
      }}
    >
      {children}
    </mark>
  );
}

// Build a regex that matches any known IDE tool name (case-sensitive, longest first to avoid partial matches)
const toolPattern = new RegExp(
  `(${[...IDE_TOOLS]
    .sort((a, b) => b.length - a.length) // longest first so "Claude Code" beats "Claude"
    .map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')})`,
  'g' // no 'i' flag — case-sensitive
);

/**
 * Scans `text` for known IDE tool names and wraps each match in an IDEToolBadge.
 * Returns the original string as a text node if no matches are found.
 */
export function renderWithToolRefs(text: string): ReactNode {
  if (!text) return text;

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // Reset regex state before use
  toolPattern.lastIndex = 0;

  while ((match = toolPattern.exec(text)) !== null) {
    const [toolName] = match;
    const matchStart = match.index;

    // Push the text segment before this match
    if (matchStart > lastIndex) {
      parts.push(text.slice(lastIndex, matchStart));
    }

    parts.push(<IDEToolBadge key={`${toolName}-${matchStart}`}>{toolName}</IDEToolBadge>);
    lastIndex = matchStart + toolName.length;
  }

  // No matches at all — return original string
  if (parts.length === 0) return text;

  // Push any remaining text after the last match
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}
