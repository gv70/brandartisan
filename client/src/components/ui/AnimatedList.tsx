import { useState, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface AnimatedListProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export default function AnimatedList({
  children,
  className,
  staggerDelay = 100
}: AnimatedListProps) {
  const { isVisible, elementRef } = useScrollReveal({ threshold: 0.2 });
  const [animatedItems, setAnimatedItems] = useState<boolean[]>([]);

  useEffect(() => {
    if (!isVisible) return;

    const childrenArray = Array.isArray(children) ? children : [children];
    const newAnimatedItems = new Array(childrenArray.length).fill(false);

    childrenArray.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedItems(prev => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      }, index * staggerDelay);
    });
  }, [isVisible, children, staggerDelay]);

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div ref={elementRef as React.RefObject<HTMLDivElement>} className={cn("animated-list", className)}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={cn(
            "animated-list-item",
            animatedItems[index] ? "animate" : ""
          )}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
