import { cn } from "@/lib/utils";

export default function SineWaveIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("lucide lucide-sine-wave", className)}
      {...props}
    >
        <path d="M2 12h2.2c.4 0 .9-.3 1-.7l2.1-4.2c.3-.5.9-.8 1.4-.8s1.1.3 1.4.8l2.1 4.2c.1.4.6.7 1 .7H14" />
        <path d="M14 12h2.2c.4 0 .9.3 1 .7l2.1 4.2c.3.5.9.8 1.4.8s1.1-.3 1.4-.8l2.1-4.2c.1-.4.6-.7 1-.7H22" />
    </svg>
  );
}
