import React, { useState } from 'react';
import { Link } from "react-router";

// 👇 Mood duomenys
const moods = [
  { emoji: '😄', label: 'Laimingas' },
  { emoji: '😔', label: 'Liūdnas' },
  { emoji: '😐', label: 'Neutralus' },
  { emoji: '😡', label: 'Piktas' },
  { emoji: '😴', label: 'Pavargęs' },
  { emoji: '🤩', label: 'Įkvėptas' },
];

// 👇 Pagrindinis komponentas
export function TestInner() {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <div className="container min-page-height">
      <h1>This is inner page of testing</h1>

      <div style={styles.container}>
        <h2 style={styles.title}>🧠 Kaip aš jaučiuosi šiandien?</h2>

        <div style={styles.moodList}>
          {moods.map((mood) => (
            <button
              key={mood.label}
              style={{
                ...styles.moodButton,
                backgroundColor: selectedMood === mood.label ? '#ffe4e1' : '#fff',
                transform: selectedMood === mood.label ? 'scale(1.2)' : 'scale(1)',
              }}
              onClick={() => setSelectedMood(mood.label)}
            >
              <span style={{ fontSize: '2rem' }}>{mood.emoji}</span>
              <span style={{ marginTop: '5px', fontSize: '0.9rem' }}>{mood.label}</span>
            </button>
          ))}
        </div>

        {selectedMood && (
          <div style={styles.result}>
            <p>Šiandien jautiesi: <strong>{selectedMood}</strong> 💬</p>
          </div>
        )}
      </div>

      <Link className="btn btn-success" to='/'>Go home</Link>
    </div>
  );
}

// 👇 CSS-in-JS stilius
const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#fdf6f9',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '20px',
  },
  moodList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    justifyContent: 'center',
  },
  moodButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80px',
    height: '80px',
    backgroundColor: '#fff',
    border: '2px solid #ddd',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  },
  result: {
    marginTop: '30px',
    fontSize: '1.2rem',
    color: '#333',
  },
};
