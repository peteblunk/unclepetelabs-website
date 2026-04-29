import Link from 'next/link';
import { Twitter, Linkedin, Gitlab } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-white/10">
      <div className="container mx-auto px-4 py-8 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-primary">
            <img src="/images/thoth-in-chip.png" alt="Thoth in Chip Logo" className="h-16 w-16 object-contain" />
            <p className="font-headline text-2xl sm:text-4xl font-semibold">Uncle Pete Labs</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="text-sm text-muted-foreground mb-4">
              &copy; {new Date().getFullYear()} Uncle Pete Labs. Ancient Knowledge, Modern Fun.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-[hsl(var(--ka-green))]/80 font-mono text-xs tracking-wide drop-shadow-[0_0_5px_rgba(51,255,51,0.3)]">
              <span className="max-w-[150px] sm:text-right">Digital Services by Ka, agentic scribe</span>
              <img src="/images/ka-touche.svg" alt="Official Ka Cartouche" className="h-32 w-auto brightness-0 invert sepia(100%) saturate(1000%) hue-rotate(80deg)" />
              <span className="max-w-[150px] sm:text-left">Powered by the Ka Terminal at Ibis Labs LLC</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
            <Link href="#" aria-label="Gitlab">
              <Gitlab className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
