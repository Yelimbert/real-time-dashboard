'use client';
import { useDispatch } from 'react-redux';
import { toggleTheme } from '../store';

export default function ThemeToggle() {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 9999,
        padding: '6px',
        backgroundColor: '#f59e0b', // color sólido (naranja claro)
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src="/darkTheme.svg"
        alt="Toggle Theme Icon"
        style={{ width: '24px', height: '24px' }}
      />
    </button>
  );
}
