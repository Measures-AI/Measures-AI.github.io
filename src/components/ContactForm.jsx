import React, { useState } from 'react';
import styles from './ContactForm.module.css';
import emailjs from '@emailjs/browser';
import { pushLeadToDataLayer, addAttributionToForm, getFormVariant } from '../lets-see/utils/dataLayer';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const GetStartedForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      // Add attribution data to form
      const formWithAttribution = addAttributionToForm(form);
      
      // Push to data layer before email submission
      pushLeadToDataLayer({
        leadType: 'Contact',
        userData: form,
        formData: {
          id: 'main-contact-form',
          name: 'homepage_contact',
          variant: getFormVariant({})
        },
        value: parseInt(import.meta.env.VITE_DEFAULT_LEAD_VALUE || '100', 10),
        currency: 'USD',
        pageConfig: {
          slug: 'homepage',
          cta: 'Contact Us'
        }
      });
      
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        formWithAttribution,
        PUBLIC_KEY
      );
      setStatus('Message sent! We will follow up soon.');
      setForm({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      setStatus('Failed to send. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="company">Company</label>
        <input type="text" id="company" name="company" value={form.company} onChange={handleChange} />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" value={form.message} onChange={handleChange} required></textarea>
      </div>
      <button type="submit" className={styles.contactBtn}>Submit</button>
      {status && <div style={{ marginTop: '1em', color: status.startsWith('Message') ? 'green' : 'red' }}>{status}</div>}
    </form>
  );
};

export default GetStartedForm; 