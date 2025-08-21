import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Listing } from '@/types';
import { ShoppingCart, X } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  onBuy?: () => void;
  onDelist?: () => void;
  showBuyButton?: boolean;
  showDelistButton?: boolean;
}

const ListingCard = ({ 
  listing, 
  onBuy, 
  onDelist, 
  showBuyButton = false, 
  showDelistButton = false 
}: ListingCardProps) => {
  return (
    <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="aspect-video overflow-hidden">
        <img
          src={listing.imageUrl}
          alt={listing.itemName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-base sm:text-lg text-foreground truncate pr-2">
            {listing.itemName}
          </h3>
          {listing.status && (
            <Badge variant={listing.status === 'sold' ? 'secondary' : 'default'} className="text-xs">
              {listing.status}
            </Badge>
          )}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 text-xs sm:text-sm text-muted-foreground">
          <span className="truncate">Owner: {listing.owner}</span>
          <span className="font-semibold text-sm sm:text-lg text-primary">
            {listing.price} coins
          </span>
        </div>
      </CardContent>
      {(showBuyButton || showDelistButton) && (
        <CardFooter className="p-3 sm:p-4 pt-0">
          {showBuyButton && (
            <Button
              onClick={onBuy}
              className="w-full bg-gradient-primary hover:shadow-glow"
              size="sm"
            >
              <ShoppingCart size={14} className="mr-2" />
              <span className="text-xs sm:text-sm">Buy Now</span>
            </Button>
          )}
          {showDelistButton && (
            <Button
              onClick={onDelist}
              variant="destructive"
              className="w-full"
              size="sm"
            >
              <X size={14} className="mr-2" />
              <span className="text-xs sm:text-sm">Delist</span>
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default ListingCard;