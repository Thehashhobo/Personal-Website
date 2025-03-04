import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import styles from "./ContactForm.module.css";

const ContactForm: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [status, setStatus] = useState({ message: "", type: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setStatus({ message: "", type: "" }); // Reset status on input
  };

  const validateForm = () => {
    let newErrors = { firstName: "", lastName: "", email: "" };
    if (!formData.firstName) newErrors.firstName = "Enter a first name.";
    if (!formData.lastName) newErrors.lastName = "Enter a last name.";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Enter a valid email address.";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (form.current) {
      emailjs.sendForm("service_cvwwc8c", "template_jnu6jkn", form.current, "jWOxeHqPjgs3G2q-l")
        .then(() => {
          setStatus({ message: "Message sent successfully!", type: "success" });
          setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" }); // Reset form
        })
        .catch(() => {
          setStatus({ message: "Failed to send message. Please try again.", type: "error" });
        });
    }
  };

  return (
    <form ref={form} className={styles.form} onSubmit={sendEmail}>
      <div className={styles.inputGroup}>
        <div className={styles.inputField}>
          <label>First Name *</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
          {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
        </div>
        <div className={styles.inputField}>
          <label>Last Name *</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
          {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
        </div>
      </div>

      <div className={styles.inputField}>
        <label>Email *</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.inputField}>
        <label>Subject</label>
        <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
      </div>

      <div className={styles.inputField}>
        <label>Message</label>
        <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
      </div>

      {status.message && <p className={status.type === "success" ? styles.success : styles.error}>{status.message}</p>}

      <div className={styles.buttonContainer}>
        <button type="submit" className={styles.submitButton}>Send</button>
      </div>
    </form>
  );
};

export default ContactForm;
