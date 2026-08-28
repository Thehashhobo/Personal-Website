import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import axios from "axios";
import { EASE_OUT } from "../lib/motion";
import styles from "./ChatDock.module.css";

const ENDPOINT = "https://personal-backend.fly.dev/api/ask";

const GREETING =
  "Hi — I am Jerry's assistant. Ask me about the product he runs, how he makes scope calls, or his background.";

const SUGGESTIONS = [
  "What product does he manage?",
  "How does he decide what to cut?",
  "Is he open to product roles?",
];

type Message = { role: "user" | "assistant"; content: string };

/**
 * Floating assistant, talking to the same RAG backend as before.
 *
 * Replaces chatbot-widget-ui so the panel can inherit the site's tokens
 * instead of shipping its own yellow. Conversation state lives here and the
 * last six turns are sent as history, matching the backend contract.
 */
const ChatDock: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: GREETING }]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [nudge, setNudge] = useState(false);

  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelId = useId();

  // A single late nudge, then never again — a looping wiggle is noise.
  useEffect(() => {
    const t = setTimeout(() => setNudge(true), 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) {
      setNudge(false);
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || pending) return;

    const history = messages.slice(-6);
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setDraft("");
    setPending(true);

    try {
      const { data } = await axios.post(ENDPOINT, { question, history });
      setMessages((prev) => [...prev, { role: "assistant", content: data.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong reaching the assistant. Please try again." },
      ]);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className={styles.dock}>
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            className={styles.panel}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            role="dialog"
            aria-label="Ask Jerry's assistant"
          >
            <header className={styles.head}>
              <span className={styles.headLabel}>
                <span className={styles.dot} aria-hidden="true" />
                Assistant
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close assistant" className={styles.close}>
                <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.3" fill="none" />
                </svg>
              </button>
            </header>

            <div className={styles.log} ref={logRef} aria-live="polite">
              {messages.map((m, i) => (
                <motion.p
                  key={i}
                  className={m.role === "user" ? styles.user : styles.assistant}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  {m.content}
                </motion.p>
              ))}

              {pending && (
                <p className={`${styles.assistant} ${styles.typing}`} aria-label="Assistant is typing">
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                </p>
              )}

              {messages.length === 1 && !pending && (
                <ul className={styles.suggestions}>
                  {SUGGESTIONS.map((s) => (
                    <li key={s}>
                      <button onClick={() => send(s)}>{s}</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <form
              className={styles.composer}
              onSubmit={(e) => {
                e.preventDefault();
                send(draft);
              }}
            >
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask a question"
                aria-label="Your question"
              />
              <button type="submit" disabled={!draft.trim() || pending} aria-label="Send">
                <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                  <path
                    d="M2 8h12M9 3l5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="square"
                  />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className={`${styles.trigger} ${nudge ? styles.nudge : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        {open ? "Close" : "Ask about Jerry"}
      </button>
    </div>
  );
};

export default ChatDock;
