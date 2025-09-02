import React, { useEffect, useState } from 'react';
import styles from './LeadForm.module.css';
import emailjs from '@emailjs/browser';
import { useTracking } from './TrackingProvider';

const EMAILJS_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';

export const LeadForm = ({ role, industry, cta }) => {
  const [form, setForm] = useState({ name: '', company: '', email: '' });
  const [status, setStatus] = useState('idle');
  const tracking = useTracking();

  useEffect(() => {
    if (tracking) tracking('lead_form_view', { role, industry });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const templateParams = {
        name: form.name,
        company: form.company,
        email: form.email,
        role: role || '',
        industry: industry || '',
      };
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
        publicKey: EMAILJS_PUBLIC_KEY,
      });
      setStatus('success');
      if (tracking) tracking('lead_submit', templateParams);
      alert('Thanks! We will be in touch.');
    } catch (err) {
      setStatus('error');
      if (tracking) tracking('lead_submit_error', { message: String(err) });
      alert('Submission failed. Please try again.');
    }
  };

  const isDisabled = status === 'submitting';

  return (
    <form className={styles.formCard} onSubmit={onSubmit}>
      <div className={styles.title}>{cta || 'Get your tailored demo'}</div>
      <div className={styles.row}>
        <label className={styles.label} htmlFor="name">Full name</label>
        <input className={styles.input} id="name" name="name" type="text" required value={form.name} onChange={onChange} placeholder="Jane Doe" />
      </div>
      <div className={styles.row}>
        <label className={styles.label} htmlFor="company">Company name</label>
        <input className={styles.input} id="company" name="company" type="text" required value={form.company} onChange={onChange} placeholder="Acme Inc." />
      </div>
      <div className={styles.row}>
        <label className={styles.label} htmlFor="email">Work email</label>
        <input className={styles.input} id="email" name="email" type="email" required value={form.email} onChange={onChange} placeholder="jane@acme.com" />
      </div>
      <button className={styles.button} type="submit" disabled={isDisabled}>
        {status === 'submitting' ? 'Submitting…' : 'Request demo'}
      </button>
      <div className={styles.hint}>We’ll only use this to contact you about your demo.</div>
    </form>
  );
};

export default LeadForm;
