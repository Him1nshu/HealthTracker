import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import styles from './History.module.css';

export default function History() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    api.get('/health').then(res => setLogs(res.data)).finally(() => setLoading(false));
  }, []);

  const handleDelete = async id => {
    if (!window.confirm('Delete this entry?')) return;
    setDeleting(id);
    try {
      await api.delete(`/health/${id}`);
      setLogs(prev => prev.filter(l => l._id !== id));
    } catch {
      alert('Failed to delete');
    } finally {
      setDeleting(null);
    }
  };

  const fmt = v => v !== undefined && v !== null ? v : '—';

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Health History</h1>

      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : logs.length === 0 ? (
        <div className={styles.empty}>No entries yet. Start logging your health!</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>⚖️ Weight (kg)</th>
                <th>🔥 Calories</th>
                <th>👟 Steps</th>
                <th>💧 Water (L)</th>
                <th>😴 Sleep (hrs)</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log._id}>
                  <td>{new Date(log.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                  <td>{fmt(log.weight)}</td>
                  <td>{fmt(log.calories)}</td>
                  <td>{fmt(log.steps)}</td>
                  <td>{fmt(log.water)}</td>
                  <td>{fmt(log.sleep)}</td>
                  <td className={styles.notes}>{log.notes || '—'}</td>
                  <td>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(log._id)}
                      disabled={deleting === log._id}
                    >
                      {deleting === log._id ? '...' : '🗑'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
