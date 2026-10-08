import { withBasePath } from "@/config/site";
export function SiteFooter() {
  return (
    <>
      <footer>
        <a href={withBasePath("/")} className="brand">
          <svg aria-hidden="true" className="brandmark icon">
            <use href="#eye" />
          </svg>
          EyePause
        </a>
        <span>A small reminder to look beyond your screen.</span>
        <span>Made for macOS 14+</span>
      </footer>
    </>
  );
}
