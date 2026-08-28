export const SITE = {
  name: "Jerry Wang",
  initials: "JW",
  /** Lead positioning, matching the current résumé. */
  role: "Product Manager",
  org: "The Bright Doctor",
  location: "Toronto, Ontario",
  email: "Jerryja2015@gmail.com",
  phone: "778-251-6946",
  phoneHref: "tel:+17782516946",
  resume: `${import.meta.env.BASE_URL}Junan_Wang_Resume.pdf`,
  resumeFilename: "Junan_Wang_Resume.pdf",
} as const;

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jw011/" },
  { label: "GitHub", href: "https://github.com/Thehashhobo" },
  { label: "Instagram", href: "https://www.instagram.com/jerry_w_02/" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100016401705344" },
] as const;

export const NAV = [
  { label: "Index", to: "/" },
  { label: "Work", to: "/projects" },
  { label: "Résumé", to: "/resume" },
  { label: "Contact", to: "/contact" },
] as const;
