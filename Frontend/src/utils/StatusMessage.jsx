// StatusMessage.jsx — drop-in error/status component for React

import React from 'react';

// Colour map for each status family
const familyStyles = {
  '1xx': { bg: '#E6F1FB', border: '#B5D4F4', text: '#0C447C', label: 'Informational' },
  '2xx': { bg: '#EAF3DE', border: '#C0DD97', text: '#27500A', label: 'Success'       },
  '3xx': { bg: '#FAEEDA', border: '#FAC775', text: '#633806', label: 'Redirect'      },
  '4xx': { bg: '#FAECE7', border: '#F5C4B3', text: '#712B13', label: 'Client Error'  },
  '5xx': { bg: '#FBEAF0', border: '#F4C0D1', text: '#72243E', label: 'Server Error'  },
};

function getFamily(code) {
  if (code >= 100 && code < 200) return '1xx';
  if (code >= 200 && code < 300) return '2xx';
  if (code >= 300 && code < 400) return '3xx';
  if (code >= 400 && code < 500) return '4xx';
  return '5xx';
}

/**
 * @param {number}  code     — HTTP status code e.g. 404
 * @param {string}  title    — Short heading shown to the user
 * @param {string}  message  — Descriptive message
 * @param {{ label: string, href?: string, onClick?: fn }} action  — Optional CTA
 */
export default function StatusMessage({ code, title, message, action }) {
  const family = getFamily(code);
  const s = familyStyles[family];

  return (
    <div style={{
      background: s.bg,
      border: `1px solid ${s.border}`,
      borderRadius: '12px',
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    }}>

      { /* Badge row */ }
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          fontSize: '12px', fontWeight: 500,
          color: s.text, background: 'rgba(255,255,255,0.55)',
          border: `0.5px solid ${s.border}`,
          borderRadius: '6px', padding: '2px 8px',
        }}>{code}</span>
        <span style={{ fontSize: '12px', color: s.text, opacity: 0.7 }}>{s.label}</span>
      </div>

      { /* Title */ }
      <p style={{ fontSize: '15px', fontWeight: 500, color: s.text, margin: 0 }}>
        {title}
      </p>

      { /* Message */ }
      <p style={{ fontSize: '13px', color: s.text, opacity: 0.8, margin: 0 }}>
        {message}
      </p>

      { /* Optional action button */ }
      {action && (
        <div style={{ marginTop: '8px' }}>
          {action.href ? (
            <a
              href={action.href}
              style={{
                fontSize: '13px', fontWeight: 500, color: s.text,
                textDecoration: 'underline', cursor: 'pointer',
              }}
            >{action.label}</a>
          ) : (
            <button
              onClick={action.onClick}
              style={{
                fontSize: '13px', fontWeight: 500, color: s.text,
                background: 'rgba(255,255,255,0.55)',
                border: `0.5px solid ${s.border}`,
                borderRadius: '6px', padding: '4px 14px', cursor: 'pointer',
              }}
            >{action.label}</button>
          )}
        </div>
      )}
    </div>
  );
}