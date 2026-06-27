"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  to: number;
  from?: number; // starting value (defaults to 0)
  duration?: number; // ms
  delay?: number; // ms before starting
  suffix?: string;
  prefix?: string;
  decimals?: number;
  loop?: boolean; // repeat: count up, hold, reset to 0, repeat
  holdDuration?: number; // ms to stay at target before looping
  className?: string;
  style?: React.CSSProperties;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function CountUp({
  to,
  from = 0,
  duration = 1400,
  delay = 0,
  suffix = "",
  prefix = "",
  decimals = 0,
  loop = false,
  holdDuration = 1600,
  className,
  style,
}: CountUpProps) {
  const [value, setValue] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setValue(to);
      return;
    }

    let rafId = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setValue(from + (to - from) * easeOutCubic(progress));
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else if (loop) {
          // hold at target, snap back to start, then animate again
          timers.push(
            setTimeout(() => {
              setValue(from);
              timers.push(setTimeout(run, 350));
            }, holdDuration)
          );
        }
      };
      rafId = requestAnimationFrame(tick);
    };

    const reset = () => {
      cancelAnimationFrame(rafId);
      timers.forEach(clearTimeout);
      timers.length = 0;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (!started.current) {
            started.current = true;
            timers.push(setTimeout(run, delay));
          }
        } else {
          // left viewport — stop and reset so it replays on the next scroll-in
          started.current = false;
          reset();
          setValue(from);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      reset();
    };
  }, [to, from, duration, delay, loop, holdDuration]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
