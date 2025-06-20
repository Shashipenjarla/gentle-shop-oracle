import { useState, useEffect } from 'react';
import { MapPin, Clock, Car, Train, Bike, Navigation, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { 
  getCurrentLocation, 
  findNearestStores, 
  getDirections, 
  StoreLocation, 
  TravelRoute,
  GeolocationResult
} from '@/services/locationService';

const StoreLocator = () => {
  const { toast } = useToast();
  const [userLocation, setUserLocation] = useState<GeolocationResult | null>(null);
  const [nearestStores, setNearestStores] = useState<StoreLocation[]>([]);
  const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(null);
  const [routes, setRoutes] = useState<Record<string, TravelRoute>>({});
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  useEffect(() => {
    // Check if API key is stored in localStorage
    const storedApiKey = localStorage.getItem('google_maps_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    } else {
      setShowApiKeyInput(true);
    }
  }, []);

  const handleGetLocation = async () => {
    setLoading(true);
    setLocationError('');
    
    try {
      const location = await getCurrentLocation();
      setUserLocation(location);
      
      const stores = findNearestStores(location.lat, location.lng);
      setNearestStores(stores);
      
      toast({
        title: "Location found!",
        description: `Found ${stores.length} nearby stores`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get location';
      setLocationError(errorMessage);
      toast({
        title: "Location error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGetDirections = async (store: StoreLocation) => {
    if (!userLocation || !apiKey) {
      if (!apiKey) {
        setShowApiKeyInput(true);
        toast({
          title: "API Key Required",
          description: "Please enter your Google Maps API key to get directions",
          variant: "destructive"
        });
      }
      return;
    }

    setSelectedStore(store);
    setLoading(true);

    const travelModes: Array<'DRIVING' | 'WALKING' | 'TRANSIT' | 'BICYCLING'> = 
      ['DRIVING', 'WALKING', 'TRANSIT', 'BICYCLING'];

    try {
      const routePromises = travelModes.map(async (mode) => {
        try {
          const route = await getDirections(userLocation, store, mode, apiKey);
          return { mode, route };
        } catch (error) {
          console.error(`Failed to get ${mode} directions:`, error);
          return null;
        }
      });

      const results = await Promise.allSettled(routePromises);
      const newRoutes: Record<string, TravelRoute> = {};

      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value) {
          newRoutes[result.value.mode] = result.value.route;
        }
      });

      setRoutes(newRoutes);
      
      toast({
        title: "Directions loaded",
        description: `Found ${Object.keys(newRoutes).length} travel options`,
      });
    } catch (error) {
      toast({
        title: "Directions error",
        description: "Failed to get directions. Please check your API key.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('google_maps_api_key', apiKey.trim());
      setShowApiKeyInput(false);
      toast({
        title: "API Key saved",
        description: "Your Google Maps API key has been saved locally",
      });
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'DRIVING': return <Car className="h-4 w-4" />;
      case 'WALKING': return <Navigation className="h-4 w-4" />;
      case 'TRANSIT': return <Train className="h-4 w-4" />;
      case 'BICYCLING': return <Bike className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'DRIVING': return 'text-blue-600';
      case 'WALKING': return 'text-green-600';
      case 'TRANSIT': return 'text-purple-600';
      case 'BICYCLING': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={0}
        onCartClick={() => {}}
        onSearchChange={() => {}}
        greenWalletData={{
          totalPoints: 0,
          level: 'Eco Starter',
          monthlyPoints: 0,
          totalProductsPurchased: 0,
          carbonSaved: 0
        }}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Store Locator</h1>
          <p className="text-muted-foreground">
            Find the nearest Walmart store and get directions with multiple travel options
          </p>
        </div>

        {/* API Key Setup */}
        {showApiKeyInput && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-2">Google Maps API Key Required</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    To get directions and transit information, you need a Google Maps API key. 
                    Your key will be stored locally in your browser for convenience.
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="password"
                      placeholder="Enter your Google Maps API key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="max-w-md"
                    />
                    <Button onClick={handleSaveApiKey} disabled={!apiKey.trim()}>
                      Save Key
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>Don't have an API key? Get one from the <a href="https://developers.google.com/maps/documentation/directions/get-api-key" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Location & Stores */}
          <div className="lg:col-span-2 space-y-6">
            {/* Get Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Your Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    onClick={handleGetLocation} 
                    disabled={loading}
                    className="w-full sm:w-auto"
                  >
                    {loading ? 'Getting Location...' : 'Get My Location'}
                  </Button>
                  
                  {locationError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{locationError}</AlertDescription>
                    </Alert>
                  )}
                  
                  {userLocation && (
                    <div className="text-sm text-muted-foreground">
                      <p>📍 Location found (accuracy: ~{Math.round(userLocation.accuracy)}m)</p>
                      <p>Latitude: {userLocation.lat.toFixed(6)}</p>
                      <p>Longitude: {userLocation.lng.toFixed(6)}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Nearest Stores */}
            {nearestStores.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Nearest Stores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {nearestStores.map((store) => (
                      <div key={store.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold">{store.name}</h3>
                            <p className="text-sm text-muted-foreground">{store.address}</p>
                            <p className="text-sm text-muted-foreground">{store.phone}</p>
                          </div>
                          <Badge variant="secondary">
                            {store.distance?.toFixed(1)} mi
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {store.services.map((service) => (
                            <Badge key={service} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {store.hours}
                          </div>
                          <Button 
                            size="sm" 
                            onClick={() => handleGetDirections(store)}
                            disabled={loading || !apiKey}
                          >
                            Get Directions
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Directions */}
          <div className="lg:col-span-1">
            {selectedStore && Object.keys(routes).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Directions</CardTitle>
                  <p className="text-sm text-muted-foreground">{selectedStore.name}</p>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue={Object.keys(routes)[0]} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 gap-1">
                      {Object.entries(routes).map(([mode, route]) => (
                        <TabsTrigger 
                          key={mode} 
                          value={mode}
                          className="flex items-center gap-1 text-xs"
                        >
                          <span className={getModeColor(mode)}>
                            {getModeIcon(mode)}
                          </span>
                          {mode.charAt(0) + mode.slice(1).toLowerCase()}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    
                    {Object.entries(routes).map(([mode, route]) => (
                      <TabsContent key={mode} value={mode} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="font-semibold text-lg">{route.duration}</div>
                            <div className="text-sm text-muted-foreground">Duration</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-lg">{route.distance}</div>
                            <div className="text-sm text-muted-foreground">Distance</div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Directions:</h4>
                          <ol className="space-y-1 text-sm">
                            {route.instructions.map((instruction, index) => (
                              <li key={index} className="flex gap-2">
                                <span className="text-muted-foreground">{index + 1}.</span>
                                <span>{instruction}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;