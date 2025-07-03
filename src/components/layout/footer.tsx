import Link from 'next/link';
import { Twitter, Linkedin, Gitlab } from 'lucide-react';
import AnkhIcon from '@/components/icons/ankh-icon';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-white/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-primary">
            <AnkhIcon className="h-6 w-6" />
            <p className="font-headline text-lg font-semibold">Uncle Pete's Labs</p>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Uncle Pete's Labs. Ancient Knowledge, Modern Fun.
          </p>
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
