import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import styles from './Dashboard.module.css';

const StatCard = ({ icon, label, value, unit, color }) => (
  <div className={styles.statCard} style={{ borderTopColor: color }}>
    <div className={styles.statIcon}>{icon}</div>
    <div className={styles.statValue}>{value ?? '—'} <span>{value !== undefined && value !== null ? unit : ''}</span></div>
    <div className={styles.statLabel}>{label}</div>
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/health').then(res => setLogs(res.data)).finally(() => setLoading(false));
  }, []);

  const latest = logs[0];
  const chartData = [...logs].reverse().slice(-10).map(l => ({
    date: new Date(l.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    Weight: l.weight,
    Calories: l.calories,
    Steps: l.steps,
  }));

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Welcome back, {user?.name} 👋</h1>
          <p className={styles.sub}>Here's your health overview</p>
        </div>
        <Link to="/log" className={styles.logBtn}>+ Log Today</Link>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading your data...</div>
      ) : (
        <>
          <div className={styles.statsGrid}>
            <StatCard icon="⚖️" label="Weight" value={latest?.weight} unit="kg" color="#2d6a4f" />
            <StatCard icon="🔥" label="Calories" value={latest?.calories} unit="kcal" color="#e07800" />
            <StatCard icon="👟" label="Steps" value={latest?.steps} unit="steps" color="#3a86ff" />
            <StatCard icon="💧" label="Water" value={latest?.water} unit="L" color="#0096c7" />
            <StatCard icon="😴" label="Sleep" value={latest?.sleep} unit="hrs" color="#7b2d8b" />
          </div>

          {chartData.length > 1 && (
            <div className={styles.chartSection}>
              <h2>Last 10 Entries — Weight & Steps Trend</h2>
              <div className={styles.chart}>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="Weight" stroke="#2d6a4f" strokeWidth={2} dot={{ r: 4 }} />
                    <Line yAxisId="right" type="monotone" dataKey="Steps" stroke="#3a86ff" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {logs.length === 0 && (
            <div className={styles.empty}>
              <p>No health data yet.</p>
              <Link to="/log" className={styles.logBtn}>Log your first entry</Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
