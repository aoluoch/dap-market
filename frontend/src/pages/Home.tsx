import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ShoppingBag, Zap, Package, Wallet } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: ShoppingBag,
      title: "Browse Marketplace",
      description: "Discover and purchase unique widgets from other users",
      href: "/marketplace",
    },
    {
      icon: Zap,
      title: "Mint Widgets",
      description: "Create new unique widget NFTs with our minting system",
      href: "/mint-widget",
    },
    {
      icon: Package,
      title: "Manage Listings",
      description: "View and manage your owned items and listings",
      href: "/my-listings",
    },
    {
      icon: Wallet,
      title: "Withdraw Profits",
      description: "Access your earnings from successful sales",
      href: "/withdraw-profits",
    },
  ];

  return (
    <div className="bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-8 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Marketplace DApp (Mock)
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Experience the future of decentralized marketplaces with our Sui Move simulator. 
            Buy, sell, and mint unique digital widgets in a seamless mock environment.
          </p>
          <div className="mt-6 sm:mt-8">
            <Button asChild size="lg" className="bg-gradient-primary hover:shadow-glow text-base sm:text-lg px-6 sm:px-8">
              <Link to="/marketplace">
                <ShoppingBag className="mr-2" size={20} />
                Explore Marketplace
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map(({ icon: Icon, title, description, href }) => (
            <Card key={title} className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:shadow-glow transition-all duration-300">
                  <Icon size={24} className="sm:hidden text-primary-foreground" />
                  <Icon size={32} className="hidden sm:block text-primary-foreground" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                  {title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3 sm:mb-4">
                  {description}
                </p>
                <Button asChild variant="outline" className="w-full text-sm">
                  <Link to={href}>Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 sm:mt-16">
          <Card className="bg-accent/50 border-accent">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">
                Built on Sui Move Technology
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                This frontend simulates the behavior of Sui Move smart contracts, 
                demonstrating marketplace operations and NFT minting without blockchain connectivity. 
                Perfect for testing and development purposes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;