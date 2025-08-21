import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, ShoppingBag, Package, Zap, Wallet, Menu, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/marketplace', label: 'Marketplace', icon: ShoppingBag },
    { href: '/my-listings', label: 'My Listings', icon: Package },
    { href: '/mint-widget', label: 'Mint Widget', icon: Zap },
    { href: '/withdraw-profits', label: 'Withdraw Profits', icon: Wallet },
  ];

  const NavLink = ({ href, label, icon: Icon, mobile = false }: {
    href: string;
    label: string;
    icon: LucideIcon;
    mobile?: boolean;
  }) => (
    <Link
      to={href}
      onClick={() => mobile && setIsOpen(false)}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
        "hover:bg-accent hover:text-accent-foreground",
        location.pathname === href
          ? "bg-primary text-primary-foreground shadow-elegant"
          : "text-muted-foreground",
        mobile && "w-full justify-start text-base py-3"
      )}
    >
      <Icon size={mobile ? 20 : 16} />
      {label}
    </Link>
  );

  return (
    <nav className="bg-card/95 border-b border-border sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Globe size={20} className="text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-primary hidden sm:block">
              Sui Move Marketplace
            </span>
            <span className="text-xl font-semibold text-primary sm:hidden">
              Sui Move
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {navItems.map(({ href, label, icon }) => (
              <NavLink key={href} href={href} label={label} icon={icon} />
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex items-center space-x-2 mb-8">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Globe size={20} className="text-primary-foreground" />
                </div>
                <span className="text-xl font-semibold text-primary">
                  Sui Move
                </span>
              </div>
              <nav className="space-y-2">
                {navItems.map(({ href, label, icon }) => (
                  <NavLink key={href} href={href} label={label} icon={icon} mobile />
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;