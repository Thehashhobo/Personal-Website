import React from "react";
import { Link } from "react-router-dom";
import styles from "./ArrowLink.module.css";

type Props = {
  children: React.ReactNode;
  /** Internal route path, or an absolute URL for external destinations. */
  to?: string;
  href?: string;
  download?: string;
  /** `solid` inverts to ink on hover; `ghost` is a rule-underlined text link. */
  variant?: "solid" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "submit" | "button";
  disabled?: boolean;
};

const Arrow = () => (
  <svg className={styles.arrow} viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path
      d="M3 13L13 3M13 3H5.5M13 3v7.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="square"
    />
  </svg>
);

/**
 * The site's one link treatment.
 *
 * On hover the arrow slides out along its own diagonal while a duplicate
 * slides in behind it, and the label shifts a hair — small, mechanical, and
 * repeated everywhere rather than each surface inventing its own hover.
 */
export const ArrowLink: React.FC<Props> = ({
  children,
  to,
  href,
  download,
  variant = "ghost",
  className,
  onClick,
  type,
  disabled,
}) => {
  const cls = [styles.link, styles[variant], disabled ? styles.disabled : "", className]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span className={styles.label}>{children}</span>
      <span className={styles.arrowWell} aria-hidden="true">
        <Arrow />
        <Arrow />
      </span>
    </>
  );

  if (disabled) {
    return (
      <span className={cls} aria-disabled="true">
        {inner}
      </span>
    );
  }

  if (type) {
    return (
      <button type={type} className={cls} onClick={onClick}>
        {inner}
      </button>
    );
  }

  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        className={cls}
        href={href}
        download={download}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link className={cls} to={to ?? "/"} onClick={onClick}>
      {inner}
    </Link>
  );
};

export default ArrowLink;
