import { cn } from "@/lib/utils";

export default function AnkhIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-ankh", className)}
      {...props}
    >
      <path d="M12 2v6" />
      <path d="M8 8h8" />
      <path d="M12 8v14" />
      <path d="M12 5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    </svg>
  );
}
