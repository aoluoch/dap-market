import { useAppState } from '@/hooks/useAppState';
import ListingCard from '@/components/ui/listing-card';

const MyListings = () => {
  const { state, delistItem } = useAppState();

  return (
    <div className="bg-gradient-subtle">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            My Listings
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Manage your owned items and active listings
          </p>
        </div>

        {state.myListings.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="text-4xl sm:text-6xl mb-4">📦</div>
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
              No items owned
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Start by purchasing items from the marketplace or mint new widgets.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {state.myListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onDelist={() => delistItem(listing.id)}
                showDelistButton={listing.status !== 'sold'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;