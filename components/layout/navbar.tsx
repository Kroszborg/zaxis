'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Home, Library, Search, Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Browse', href: '/browse', icon: Library },
  { name: 'Viewer', href: '/viewer', icon: Box },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="glass-morphism border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Box className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 h-8 w-8 bg-primary/20 rounded-full blur-lg group-hover:bg-primary/30 transition-colors duration-300" />
            </div>
            <span className="text-xl font-bold gradient-text">ZAxis</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className={cn(
                      'flex items-center space-x-2 transition-all duration-300',
                      isActive && 'bg-primary text-primary-foreground shadow-lg',
                      !isActive && 'hover:bg-white/10 hover:text-primary dark:hover:bg-white/10'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="hidden sm:flex border-white/20 hover:border-primary/50">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            
            <div className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="hover:bg-white/10 dark:hover:bg-white/10">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-white/10 dark:hover:bg-white/10">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
            
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}