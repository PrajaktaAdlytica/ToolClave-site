import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function usePageMotion(rootRef) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;
    const context = gsap.context(() => {
      const root = rootRef.current;
      const heroTargets = root?.querySelectorAll(
        ".page-hero-copy > *, .expansion-hero-copy > *, .solutions-route-copy > *, .company-route-copy > *, .contact-route-copy > *, .docs-route-copy > *, .demo-route-copy > *, .signin-context > *",
      ) ?? [];
      if (heroTargets.length) {
        gsap.from(heroTargets, {
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        });
      }
      const reveals = root?.querySelectorAll(".page-reveal") ?? [];
      gsap.utils.toArray(reveals).forEach((element, index) => {
        const horizontal = element.matches(
          ".control-ledger-row, .evidence-ledger-row, .principle-ledger-item, .contact-route-item, .architecture-lane",
        );
        gsap.from(element, {
          x: horizontal ? (index % 2 ? 42 : -42) : 0,
          y: horizontal ? 0 : 30,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            once: true,
          },
        });
      });

      const chapterLabels = root?.querySelectorAll(".chapter-label") ?? [];
      gsap.utils.toArray(chapterLabels).forEach((label) => {
        gsap.from(label, {
          x: -24,
          opacity: 0,
          duration: 0.55,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: { trigger: label.parentElement, start: "top 82%", once: true },
        });
      });

      const staggerGroups = [
        ".solution-operating-map",
        ".outcome-grid",
        ".export-rail",
        ".quickstart-grid",
        ".docs-concept-rail",
        ".company-stage-grid",
        ".demo-expectation-grid",
        ".signin-trust-band",
      ];
      staggerGroups.forEach((selector) => {
        const group = root?.querySelector(selector);
        if (!group?.children.length) return;
        gsap.from(group.children, {
          y: 26,
          opacity: 0,
          stagger: 0.09,
          duration: 0.65,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: { trigger: group, start: "top 82%", once: true },
        });
      });

      const heroStage = root?.querySelector(
        ".runtime-hero-stage, .observe-hero-stage, .solution-selector, .code-window, .company-manifesto, .contact-form-wrap, .demo-form-stage, .signin-form-stage",
      );
      if (heroStage && window.matchMedia("(min-width: 980px)").matches) {
        gsap.to(heroStage, {
          y: -34,
          ease: "none",
          scrollTrigger: {
            trigger: heroStage.closest("section"),
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
          },
        });
      }
      ScrollTrigger.refresh();
    }, rootRef);
    return () => context.revert();
  }, [rootRef]);
}
