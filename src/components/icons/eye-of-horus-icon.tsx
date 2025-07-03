import { cn } from "@/lib/utils";

export default function EyeOfHorusIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-eye", className)}
      {...props}
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <path d="M12.01 19.5c-1 0-2.5-1-2.5-2.5"/>
      <path d="M19 18l-1.5-3" />
    </svg>
  );
}
