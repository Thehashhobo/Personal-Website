import React from "react";
import styles from "./Marquee.module.css";

type Props = {
  items: readonly string[];
  /** Seconds for one full pass. Longer reads calmer. */
  speed?: number;
};

/**
 * A slow horizontal band of stack keywords, pausing on hover.
 *
 * The list is duplicated and the track translated by exactly -50%, so the
 * second copy lands where the first began and the loop has no visible seam.
 * The duplicate is aria-hidden so screen readers hear the list once.
 */
const Marquee: React.FC<Props> = ({ items, speed = 42 }) => {
  const group = (hidden: boolean) => (
    <ul className={styles.group} aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.marquee} style={{ ["--speed" as string]: `${speed}s` }}>
      <div className={styles.track}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
};

export default Marquee;
