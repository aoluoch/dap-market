import { useAppState } from '@/hooks/useAppState';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Package } from 'lucide-react';

const MintWidget = () => {
  const { state, mintWidget } = useAppState();

  return (
    <div className="bg-gradient-subtle">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Mint Widget
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Create unique widget NFTs on the Sui Move blockchain simulator
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <Card className="hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="text-primary" size={24} />
                Mint New Widget
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="text-center py-6 sm:py-8">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-glow">
                  <Zap size={32} className="sm:hidden text-primary-foreground" />
                  <Zap size={48} className="hidden sm:block text-primary-foreground" />
                </div>
                <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base px-4">
                  Click the button below to mint a new unique widget. Each widget 
                  has a unique ID and is instantly added to your collection.
                </p>
                <Button
                  onClick={mintWidget}
                  size="lg"
                  className="bg-gradient-primary hover:shadow-glow text-base sm:text-lg px-6 sm:px-8"
                >
                  <Zap className="mr-2" size={20} />
                  Mint Widget
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elegant transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="text-primary" size={24} />
                My Widgets ({state.widgets.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {state.widgets.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <div className="text-3xl sm:text-4xl mb-4">🎨</div>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    No widgets minted yet. Create your first widget!
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-64 sm:max-h-96 overflow-y-auto">
                  {state.widgets.map((widget, index) => (
                    <div
                      key={widget.id}
                      className="flex items-center justify-between p-3 bg-accent/50 rounded-lg border border-accent"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <Zap size={16} className="sm:hidden text-primary-foreground" />
                          <Zap size={20} className="hidden sm:block text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm sm:text-base">
                            Widget #{index + 1}
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground font-mono break-all">
                            {widget.id}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">Owned</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MintWidget;