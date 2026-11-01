import { useState, useRef, type KeyboardEvent } from 'react';
import { askAIAgent } from '../../services/aiAgent';
import type { AIAgentResponse } from '../../types';
import styles from './ChatAgent.module.css';

interface ChatAgentProps {
  onResponse: (response: AIAgentResponse) => void;
}

const SUGGESTIONS = [
  'Where is the turbocharger?',
  'Show me the headlights',
  'Where is the fuel tank?',
  'Show me the sunroof',
  'Where are the brakes?',
  'Show me the trunk',
];

export function ChatAgent({ onResponse }: ChatAgentProps) {
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = async (text: string) => {
    const q = text.trim();
    if (!q || isLoading) return;

    setIsLoading(true);
    setMessage(null);
    setQuery('');

    try {
      const result = await askAIAgent(q);
      setMessage(result.message);
      onResponse(result);
    } catch {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') submit(query);
  };

  const handleSuggestion = (s: string) => {
    setQuery(s);
    submit(s);
  };

  return (
    <div className={styles.container}>
      {message && (
        <div className={styles.responseCard}>
          <p className={styles.responseText}>{message}</p>
        </div>
      )}

      {!message && !isLoading && (
        <div className={styles.suggestions}>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              className={styles.chip}
              onClick={() => handleSuggestion(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {isLoading && (
        <div className={styles.responseCard}>
          <div className={styles.loader}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
        </div>
      )}

      <div className={styles.inputRow}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          placeholder="Ask about any car part..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKey}
          disabled={isLoading}
        />
        <button
          className={styles.sendBtn}
          onClick={() => submit(query)}
          disabled={isLoading || !query.trim()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
