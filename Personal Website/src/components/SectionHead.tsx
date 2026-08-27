import React from "react";
import Rule from "./Rule";
import SplitLines from "./SplitLines";
import Reveal from "./Reveal";
import styles from "./SectionHead.module.css";

type Props = {
  /** Two-digit section number, e.g. "02". */
  index: string;
  label: string;
  /** One string per authored line of the heading. */
  lines: string[];
  /** Optional standfirst set beside the heading on wide screens. */
  note?: React.ReactNode;
};

/** The repeating section masthead: numbered label, drawn rule, display heading. */
const SectionHead: React.FC<Props> = ({ index, label, lines, note }) => (
  <header className={styles.head}>
    <Reveal className={styles.meta} y={14}>
      <span className={styles.index}>{index}</span>
      <span className={styles.label}>{label}</span>
    </Reveal>

    <Rule className={styles.rule} />

    <div className={styles.row}>
      <SplitLines as="h2" lines={lines} className={styles.title} each={0.08} />
      {note && (
        <Reveal className={styles.note} delay={0.15}>
          {note}
        </Reveal>
      )}
    </div>
  </header>
);

export default SectionHead;
