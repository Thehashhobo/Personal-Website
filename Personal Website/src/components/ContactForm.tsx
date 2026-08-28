import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "motion/react";
import ArrowLink from "./ArrowLink";
import { EASE_OUT } from "../lib/motion";
import styles from "./ContactForm.module.css";

const SERVICE_ID = "service_cvwwc8c";
const TEMPLATE_ID = "template_jnu6jkn";
const PUBLIC_KEY = "jWOxeHqPjgs3G2q-l";

const EMPTY = { firstName: "", lastName: "", email: "", subject: "", message: "" };

type Field = keyof typeof EMPTY;
type Errors = Partial<Record<Field, string>>;

const FIELDS: { name: Field; label: string; type?: string; half?: boolean; area?: boolean }[] = [
  { name: "firstName", label: "First name", half: true },
  { name: "lastName", label: "Last name", half: true },
  { name: "email", label: "Email", type: "email" },
  { name: "subject", label: "Subject" },
  { name: "message", label: "Message", area: true },
];

/**
 * Contact form.
 *
 * The `name` attributes must keep matching the EmailJS template variables —
 * emailjs.sendForm reads them straight off the DOM node. Validation runs on
 * submit and then per-field as the visitor corrects, so nobody is scolded
 * mid-typing on their first pass.
 */
const ContactForm: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const validate = (data: typeof EMPTY): Errors => {
    const next: Errors = {};
    if (!data.firstName.trim()) next.firstName = "Required";
    if (!data.lastName.trim()) next.lastName = "Required";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) next.email = "Enter a valid email address";
    if (!data.message.trim()) next.message = "Tell me a little about it";
    return next;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as Field;
    const next = { ...values, [name]: e.target.value };
    setValues(next);
    // Only clear errors already on screen — never introduce one mid-keystroke.
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: validate(next)[name] }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length || !form.current) return;

    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY);
      setValues(EMPTY);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form ref={form} className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid}>
        {FIELDS.map((field) => {
          const invalid = Boolean(errors[field.name]);
          const id = `contact-${field.name}`;
          return (
            <div
              key={field.name}
              className={`${styles.field} ${field.half ? styles.half : ""} ${invalid ? styles.invalid : ""}`}
            >
              <label htmlFor={id} className={styles.label}>
                {field.label}
                {field.name !== "subject" && <span aria-hidden="true"> *</span>}
              </label>

              {field.area ? (
                <textarea
                  id={id}
                  name={field.name}
                  rows={5}
                  value={values[field.name]}
                  onChange={handleChange}
                  aria-invalid={invalid}
                  aria-describedby={invalid ? `${id}-error` : undefined}
                />
              ) : (
                <input
                  id={id}
                  name={field.name}
                  type={field.type ?? "text"}
                  value={values[field.name]}
                  onChange={handleChange}
                  aria-invalid={invalid}
                  aria-describedby={invalid ? `${id}-error` : undefined}
                />
              )}

              {/* The underline sweeps in from the left as the field takes focus. */}
              <span className={styles.underline} aria-hidden="true" />

              <AnimatePresence>
                {invalid && (
                  <motion.span
                    id={`${id}-error`}
                    className={styles.error}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                  >
                    {errors[field.name]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className={styles.foot}>
        <ArrowLink type="submit" variant="solid" disabled={status === "sending"}>
          {status === "sending" ? "Sending" : "Send message"}
        </ArrowLink>

        <div className={styles.statusWell} role="status" aria-live="polite">
          <AnimatePresence mode="wait">
            {status === "sent" && (
              <motion.span
                key="sent"
                className={styles.sent}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                Message sent — I will get back to you shortly.
              </motion.span>
            )}
            {status === "error" && (
              <motion.span
                key="error"
                className={styles.failed}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                That did not send. Please try again, or email me directly.
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
