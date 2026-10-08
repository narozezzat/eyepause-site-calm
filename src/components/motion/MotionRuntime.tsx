"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroTimer } from "@/hooks/useDemoTimer";
import {
  breathe,
  count,
  flipOnChange,
  grow,
  GENTLE,
  nodes,
  reveal,
  trigger,
  vars,
} from "./engine";

/** The page's motion, played once after the splash. Skipped entirely under reduced motion. */
function choreograph() {
  const intro = gsap.timeline({ delay: 0.9 });
  intro
    .from(".hero-copy > *", vars("rise", { stagger: GENTLE.stagger }))
    .from(".dial-label", vars("rise"), 0.2)
    .from(
      ".dial svg line",
      {
        opacity: 0,
        duration: 0.5,
        ease: "none",
        stagger: 0.014,
        clearProps: "opacity",
      },
      0.3,
    )
    .from(".read .label, .read .sub", vars("fade", { stagger: 0.1 }), 0.4)
    .from(
      ".dial-dot",
      {
        opacity: 0,
        scale: 0,
        transformOrigin: "50% 50%",
        duration: 0.5,
        clearProps: "transform,opacity",
      },
      2.4,
    )
    .from(".popover", vars("pop"), 0.9)
    .from(".instrument-caption", vars("rise"), 1.1);
  // The ring drains from a full 20 minutes to the time left, like the real timer.
  heroTimer.animate(heroTimer.cycle, heroTimer.start, {
    duration: GENTLE.count,
    delay: 1.5,
    ease: "power2.inOut",
  });
  breathe(".dial svg circle[stroke-dasharray]", intro.duration());

  reveal(".rule > *", "rise", { trigger: ".rule" });
  nodes(".rule-item strong").forEach((el, i) =>
    count(el, { delay: 0.2 + i * 0.15, scrollTrigger: trigger(".rule") }),
  );

  reveal("#experience .section-head > *");
  gsap
    .timeline({ scrollTrigger: trigger(".break-stage", "top 85%") })
    .from(".break-stage", vars("depth"))
    .from(
      ".break-center > h3, .break-center > p, .stage-top, .stage-bottom",
      vars("rise", { stagger: GENTLE.stagger * 1.4 }),
      "<0.3",
    )
    .from(
      ".flip-clock .flip",
      {
        rotationX: -90,
        opacity: 0,
        transformPerspective: 500,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform,opacity",
      },
      "<0.2",
    );
  reveal(".feature-caption p");

  reveal(".everyday > div:first-child > :not(.feature-list)");
  reveal(".feature-line", "slide-in", { trigger: ".feature-list" });
  gsap
    .timeline({ scrollTrigger: trigger(".daily-stage", "top 85%") })
    .from(".toast", vars("slide"))
    .from(".stats", vars("depth"), "<0.2")
    .add(count(".stats-total strong"), "<0.3")
    .add(grow(".bar-col i"), "<0.1")
    .from(".daily-caption", vars("fade"), "<0.4");

  reveal(".privacy-band > p");
  reveal(".privacy-facts span", "rise", { trigger: ".privacy-band" });
  reveal(".download-copy > *");
  reveal(".download-panel", "depth");
  reveal(".faq details", "rise", { trigger: ".faq" });

  return flipOnChange(".flip-clock .flip");
}

/** Mounted with the page: choreography, the header's scrolled state, and timer glides. */
export function MotionRuntime() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.documentElement;
    const onScroll = () => {
      const scrolled = window.scrollY > 8;
      if (scrolled !== root.hasAttribute("data-scrolled"))
        root.toggleAttribute("data-scrolled", scrolled);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
      });
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      lenis.on("scroll", ScrollTrigger.update);

      const onAnchorClick = (event: MouseEvent) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          !(event.target instanceof Element)
        )
          return;
        const anchor = event.target.closest<HTMLAnchorElement>('a[href*="#"]');
        if (
          !anchor ||
          anchor.hasAttribute("download") ||
          (anchor.target && anchor.target !== "_self")
        )
          return;

        let url: URL;
        let id: string;
        try {
          url = new URL(anchor.href, window.location.href);
          id = decodeURIComponent(url.hash.slice(1));
        } catch {
          return;
        }
        if (
          url.origin !== window.location.origin ||
          url.pathname !== window.location.pathname ||
          url.search !== window.location.search ||
          !id
        )
          return;
        const target = document.getElementById(id);
        if (!target) return;

        event.preventDefault();
        // Measure from the live scroll position: Lenis's own copy can lag behind
        // a restored or native scroll. scroll-padding-top clears the sticky header.
        const pad = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
        lenis.scrollTo(target.getBoundingClientRect().top + window.scrollY - pad);
        if (window.location.hash !== url.hash)
          window.history.pushState(null, "", url.hash);
        if (target.tabIndex < 0 && !target.hasAttribute("tabindex"))
          target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      };
      document.addEventListener("click", onAnchorClick);

      let glide: gsap.core.Tween | undefined;
      heroTimer.setGlide((from, to, paint, done, options) => {
        const proxy = { v: from };
        glide?.kill();
        paint(from);
        glide = gsap.to(proxy, {
          v: to,
          duration: options.duration ?? 0.9,
          delay: options.delay ?? 0,
          ease: options.ease ?? "power3.out",
          onUpdate: () => paint(Math.round(proxy.v)),
          onComplete: done,
          onInterrupt: done,
        });
      });
      const stopFlips = choreograph();
      return () => {
        document.removeEventListener("click", onAnchorClick);
        gsap.ticker.remove(tick);
        lenis.destroy();
        // Restore GSAP's defaults; this runtime owns the ticker configuration.
        gsap.ticker.lagSmoothing(500, 33);
        stopFlips();
        glide?.kill();
        heroTimer.setGlide(null);
      };
    });
    root.dataset.motion = "ready";
    ScrollTrigger.refresh();

    return () => {
      mm.revert();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return null;
}
