import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function SpotlightCard({
  children,
  className,
  delay = 0
}: SpotlightCardProps) {
  return (
    <div
      className={cn(
        "spotlight-card bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 ease-out cursor-pointer",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
