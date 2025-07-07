'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';


const navItems = [
  { href: '#about', label: 'About Us' },
  {
    label: 'Creations',
    children: [
      { href: '/game-development', label: 'Game Development' },
      { href: '/web-architecture', label: 'Web Architecture' },
      { href: '/educational-platforms', label: 'Educational Platforms' },
      { href: '/interactive-experiences', label: 'Interactive Experiences' },
      { href: '/creative-prototyping', label: 'Creative Prototyping' },
      { href: '/digital-asset-forging', label: 'Digital Asset Forging' },
    ],
  },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-card/80 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-headline text-4xl font-bold text-primary hover:text-accent transition-colors">
            <img src="/images/thoth-in-chip.png" alt="Thoth in Chip Logo" className="h-16 w-16 object-contain" />
            Uncle Pete Labs
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              item.children ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    {/* Use a button or div as a trigger for better accessibility if not using an anchor */}
                    <a className="text-sm font-medium text-primary/80 transition-colors hover:text-electric-purple font-headline cursor-pointer">
                      {item.label}
                    </a>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.label}>
                        <Link href={child.href}>
                          {child.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-primary/80 transition-colors hover:text-electric-purple font-headline"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background/95 backdrop-blur-sm">
                <SheetHeader className="sr-only">
                  <SheetTitle>Mobile Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-6">
                  <Link href="/" className="flex items-center gap-2 font-headline text-2xl font-bold text-primary" onClick={() => setMobileMenuOpen(false)}>
                    <img src="/images/thoth-in-chip.png" alt="Thoth in Chip Logo" className="h-15 w-15 object-contain" />
                    Uncle Pete Labs
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      item.children ? (
                        <div key={item.label}>
                          <button
                            className="text-lg font-medium text-electric-purple/80 transition-colors hover:text-primary font-headline w-full text-left"
                            onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                          >
                            {item.label}
                          </button>
                          {openDropdown === item.label && (
                            <div className="flex flex-col gap-2 pl-4 mt-2">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  className="text-base font-medium text-electric-purple/60 transition-colors hover:text-primary font-headline"
                                  onClick={() => setMobileMenuOpen(false)} // Close mobile menu on link click
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="text-lg font-medium text-electric-purple/80 transition-colors hover:text-primary font-headline"
                          onClick={() => setMobileMenuOpen(false)} // Close mobile menu on link click
                        >
                          {item.label}
                        </Link>
                      )
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
