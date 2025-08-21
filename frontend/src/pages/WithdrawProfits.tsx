import { useAppState } from '@/hooks/useAppState';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, TrendingUp, DollarSign } from 'lucide-react';

const WithdrawProfits = () => {
  const { state, withdrawProfits } = useAppState();

  return (
    <div className="bg-gradient-subtle">
      <div className="container mx-auto px-4 py-6 sm:py-8 text-center">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Withdraw Profits.
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Manage your earnings from marketplace sales.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="hover:shadow-elegant transition-all duration-300 mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-lg sm:text-xl">
                <Wallet className="text-primary" size={24} />
                Available Balance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="text-center py-6 sm:py-8">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-glow">
                  <DollarSign size={32} className="sm:hidden text-primary-foreground" />
                  <DollarSign size={48} className="hidden sm:block text-primary-foreground" />
                </div>
                
                <div className="mb-4 sm:mb-6">
                  <p className="text-3xl sm:text-5xl font-bold text-primary mb-2">
                    {state.profits}
                  </p>
                  <p className="text-base sm:text-xl text-muted-foreground">
                    Coins Available
                  </p>
                </div>

                {state.profits > 0 ? (
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Your profits from successful sales are ready to withdraw.
                    </p>
                    <Button
                      onClick={withdrawProfits}
                      size="lg"
                      className="bg-gradient-primary hover:shadow-glow text-base sm:text-lg px-6 sm:px-8"
                    >
                      <Wallet className="mr-2" size={20} />
                      Withdraw {state.profits} Coins
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-sm sm:text-base">
                      No profits available for withdrawal. Start selling items to earn coins!
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <TrendingUp size={16} />
                      <span>Profits accumulate when users buy your items</span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4 sm:mt-6 bg-accent/50 border-accent mx-auto text-center">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 text-center">
                How It Works
              </h3>
              <ul className="space-y-2 text-muted-foreground text-xs sm:text-sm text-center">
                <li>• Profits accumulate when other users purchase your listings</li>
                <li>• Each sale adds the item price to your available balance</li>
                <li>• Withdraw anytime to reset your balance to zero</li>
                <li>• Transactions are processed by the connected backend</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WithdrawProfits;