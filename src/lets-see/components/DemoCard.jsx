import React from 'react';
import styles from './DemoCard.module.css';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';

// Pastel color themes (matching main carousel)
const pastelThemes = [
  { line: '#7ecbff', bar: '#7ecbff', grid: '#e3f4fd', axis: '#6a8caf' }, // blue
  { line: '#a3e3a1', bar: '#a3e3a1', grid: '#eafbe7', axis: '#6fa86f' }, // green
  { line: '#ffb3b3', bar: '#ffb3b3', grid: '#ffeaea', axis: '#c97a7a' }, // red
  { line: '#cdb3ff', bar: '#cdb3ff', grid: '#f3eaff', axis: '#8a7ac9' }, // purple
  { line: '#ffd6a3', bar: '#ffd6a3', grid: '#fff3e3', axis: '#c99b7a' }, // orange
  { line: '#b3fff6', bar: '#b3fff6', grid: '#e3fffd', axis: '#7ac9c9' }, // teal
  { line: '#ffb3e6', bar: '#ffb3e6', grid: '#ffe3f7', axis: '#c97aac' }, // pink
];

const ChartPreview = ({ data, theme }) => {
  if (!data) return null;
  
  if (data.type === 'line') {
    return (
      <div className={styles.chartPreview}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.values} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} isAnimationActive={false}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.grid} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: theme.axis, fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: theme.axis, fontSize: 12 }} width={30} />
            <Line type="monotone" dataKey="value" stroke={theme.line} strokeWidth={3} dot={{ r: 4, fill: theme.line }} isAnimationActive={false}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  if (data.type === 'bar') {
    return (
      <div className={styles.chartPreview}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.values} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} isAnimationActive={false}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.grid} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: theme.axis, fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: theme.axis, fontSize: 12 }} width={30} />
            <Bar dataKey="value" fill={theme.bar} radius={[6, 6, 0, 0]} barSize={24} isAnimationActive={false}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  return null;
};

export const DemoCard = ({ demoData }) => {
  if (!demoData) return null;

  const theme = pastelThemes[0]; // Use first theme for consistency

  return (
    <div className={styles.card}>
      <div className={styles.chartContainer}>
        <ChartPreview data={demoData.data} theme={theme} />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{demoData.title}</h3>
        <p className={styles.cardText}>{demoData.subtext}</p>
        <ul className={styles.cardBullets}>
          {(demoData.bullets || []).map((bullet, index) => (
            <li key={index} className={styles.cardBullet}>
              <span className={styles.cardBulletText}>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.cardFooter}>
        <span className={styles.leftText}>{demoData.leftText}</span>
      </div>
    </div>
  );
};

export default DemoCard;
