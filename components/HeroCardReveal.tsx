"use client";
import { useRef, useEffect, useState, ReactNode, CSSProperties } from "react";

export default function HeroCardReveal({
  children,
  from,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  from: "left" | "right";
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const [fired, setFired] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setFired(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [delay]);

  const anim =
    from === "left"
      ? "tivra-fly-left 0.9s cubic-bezier(.22,.68,0,1.2) both"
      : "tivra-fly-right 0.9s cubic-bezier(.22,.68,0,1.2) both";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: fired ? undefined : 0,
        animation: fired ? anim : "none",
      }}
    >
      {children}
    </div>
  );
}
