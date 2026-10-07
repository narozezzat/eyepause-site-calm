import { BrandMark } from "@/components/brand/BrandMark";
import { withBasePath } from "@/config/site";
import styles from "./SiteHeader.module.css";

const home = withBasePath("/");

const links = [
  { href: `${home}#tour`, label: "Tour" },
  { href: `${home}#details`, label: "Details" },
  { href: `${home}#download`, label: "Download" },
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <a className={styles.brand} href={home}>
        <BrandMark className={styles.mark} />
        EyePause
      </a>
      <nav className={styles.nav} aria-label="Primary">
        {links.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
