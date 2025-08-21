import { useAppState } from '@/hooks/useAppState';
import ListingCard from '@/components/ui/listing-card';

const Marketplace = () => {
  const { state, buyListing } = useAppState();

  return (
    <div className="bg-gradient-subtle">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 text-center max-w-2xl mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                Marketplace.
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg">
                Discover and purchase unique widgets from the community.
            </p>
        </div>


        {state.listings.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="text-4xl sm:text-6xl mb-4">🏪</div>
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
              No items available
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              All items have been purchased! Check back later for new listings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {state.listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onBuy={() => buyListing(listing.id)}
                showBuyButton={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;