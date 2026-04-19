import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import styles from './LogHealth.module.css';

export default function LogHealth() {
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '', calories: '', steps: '', water: '', sleep: '', notes: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = Object.fromEntries(
        Object.entries(form).filter(([, v]) => v !== '')
      );
      await api.post('/health', payload);
      setSuccess(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save log');
    } finally {
      setLoading(false);
    }
  };

  const field = (key, label, icon, type = 'number', placeholder = '') => (
    <div className={styles.field}>
      <label>{icon} {label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        step={type === 'number' ? 'any' : undefined}
      />
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Log Health Entry</h1>
        <p className={styles.sub}>Fill in what you tracked today (all fields optional except date)</p>

        {success && <div className={styles.success}>✅ Entry saved! Redirecting...</div>}
        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>📅 Date</label>
            <input
              type="date" required
              value={form.date}
              onChange={e => setForm({ ...form, date: e.target.value })}
            />
          </div>

          <div className={styles.grid}>
            {field('weight', 'Weight (kg)', '⚖️', 'number', 'e.g. 70')}
            {field('calories', 'Calories (kcal)', '🔥', 'number', 'e.g. 2000')}
            {field('steps', 'Steps', '👟', 'number', 'e.g. 8000')}
            {field('water', 'Water (Liters)', '💧', 'number', 'e.g. 2.5')}
            {field('sleep', 'Sleep (hours)', '😴', 'number', 'e.g. 7.5')}
          </div>

          <div className={styles.field}>
            <label>📝 Notes</label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
              placeholder="How are you feeling today?"
            />
          </div>

          <button type="submit" className={styles.btn} disabled={loading || success}>
            {loading ? 'Saving...' : 'Save Entry'}
          </button>
        </form>
      </div>
    </div>
  );
}
