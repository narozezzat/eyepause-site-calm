import { withBasePath } from "@/config/site";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { DesignSymbols } from "@/components/brand/DesignSymbols";
export function SiteHeader() {
  return (
    <>
      <DesignSymbols />
      <header>
        <div className="wrap header-row">
          <a
            href={withBasePath("/")}
            className="brand"
            aria-label="EyePause home"
          >
            <svg aria-hidden="true" className="brandmark icon">
              <use href="#eye" />
            </svg>
            EyePause
          </a>
          <nav className="nav" aria-label="Main navigation">
            <a className="nav-link" href={withBasePath("/#experience")}>
              The experience
            </a>
            <a className="nav-link" href={withBasePath("/#details")}>
              Made for Mac
            </a>
            <ThemeToggle />
            <a className="nav-download" href={withBasePath("/#download")}>
              Download
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}
