import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Github, Twitter, Globe, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    marketplace: [
      { label: 'Browse Items', href: '/marketplace' },
      { label: 'My Listings', href: '/my-listings' },
      { label: 'Mint Widget', href: '/mint-widget' },
      { label: 'Withdraw Profits', href: '/withdraw-profits' },
    ],
    resources: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Support', href: '#' },
      { label: 'Community', href: '#' },
    ],
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Globe, href: '#', label: 'Website' },
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Globe size={20} className="text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-primary">
                Sui Move
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Experience the future of decentralized marketplaces with our Sui Move interface.
              Explore marketplace operations with a sleek frontend.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 bg-accent hover:bg-primary rounded-lg flex items-center justify-center transition-colors group"
                  aria-label={label}
                >
                  <Icon size={18} className="text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Marketplace Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Marketplace</h3>
            <ul className="space-y-3">
              {footerLinks.marketplace.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-muted-foreground">
            <span>© {currentYear} Sui Move Marketplace. All rights reserved.</span>
            <div className="hidden sm:block">•</div>
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart size={14} className="text-red-500 fill-current" />
              <span>for the community</span>
            </div>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;