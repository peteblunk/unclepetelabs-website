import { cn } from "@/lib/utils";

export default function TigerClawIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-sparkles", className)}
      {...props}
    >
      <path d="M5 3s2.5 4 4.5 8c0 0-2 1.5-3 3.5s-1 4.5-1 4.5" />
      <path d="M8 3s2.5 4 4.5 8c0 0-2 1.5-3 3.5s-1 4.5-1 4.5" />
      <path d="M11 3s2.5 4 4.5 8c0 0-2 1.5-3 3.5s-1 4.5-1 4.5" />
      <path d="M14 3s2.5 4 4.5 8c0 0-2 1.5-3 3.5s-1 4.5-1 4.5" />
    </svg>
  );
}
