import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  triggerOnce = true
}: ScrollRevealProps) {
  const { isVisible, elementRef } = useScrollReveal({ threshold, triggerOnce });

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={cn(
        "scroll-reveal transition-all duration-700 ease-out",
        isVisible ? "revealed" : "",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
