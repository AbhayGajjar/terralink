"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Icon from "@/components/ui/Icon";
import { testimonials } from "@/data/home";
import { company } from "@/data/company";
import styles from "./Testimonials.module.css";

const AUTOPLAY_MS = 6000;

/**
 * Scroll-snap carousel: the number of visible cards is set purely in CSS, so it
 * renders correctly on the server at every width and swipes natively on touch.
 */
export default function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback((index: number) => {
    const el = track.current;
    if (!el) return;
    const slides = el.children;
    const target = slides[(index + slides.length) % slides.length] as HTMLElement | undefined;
    if (target) el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }, []);

  const step = useCallback(
    (direction: 1 | -1) => {
      const el = track.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      if (direction === 1 && atEnd) goTo(0);
      else if (direction === -1 && el.scrollLeft <= 8) goTo(testimonials.length - 1);
      else goTo(active + direction);
    },
    [active, goTo],
  );

  // Track which card is at the start of the viewport
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const first = el.children[0] as HTMLElement | undefined;
      if (!first) return;
      setActive(Math.round(el.scrollLeft / first.offsetWidth));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setTimeout(() => step(1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, reduceMotion, step]);

  return (
    <div
      className={styles.wrap}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onTouchStart={() => setPaused(true)}
    >
      <div className={styles.summary}>
        {company.rating ? (
          <div className={styles.score}>
            <strong>{company.rating.value.toFixed(1)}</strong>
            <div>
              <span className={styles.summaryStars} aria-label={`Rated ${company.rating.value} out of 5`}>
                ★★★★★
              </span>
              <span>Based on {company.rating.count} Google reviews</span>
            </div>
          </div>
        ) : (
          <span />
        )}
        <div className={styles.controls}>
          <button type="button" onClick={() => step(-1)} aria-label="Previous testimonial">
            <Icon name="arrowLeft" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Next testimonial">
            <Icon name="arrowRight" />
          </button>
        </div>
      </div>

      <div ref={track} className={styles.track} role="region" aria-roledescription="carousel" aria-label="Customer testimonials" tabIndex={0}>
        {testimonials.map((t, i) => (
          <figure key={t.name} className={`glass-card ${styles.card}`} aria-roledescription="slide" aria-label={`${i + 1} of ${testimonials.length}`}>
            <span className={styles.quoteMark} aria-hidden="true">
              &ldquo;
            </span>
            <span className={styles.stars} role="img" aria-label={`${t.rating} out of 5 stars`}>
              {"★".repeat(Math.round(t.rating))}
              <span className={styles.starsOff}>{"★".repeat(5 - Math.round(t.rating))}</span>
            </span>
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              <span className={styles.avatar} aria-hidden="true">
                {t.name.charAt(0)}
              </span>
              <span>
                <strong>{t.name}</strong>
                <small>
                  {t.location} · {t.service}
                </small>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className={styles.dots}>
        {testimonials.map((t, i) => (
          <button
            key={t.name}
            type="button"
            className={i === active ? styles.dotActive : undefined}
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={i === active}
          />
        ))}
      </div>
    </div>
  );
}
