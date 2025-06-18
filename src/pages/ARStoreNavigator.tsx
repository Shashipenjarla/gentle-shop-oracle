import { useState, useEffect } from 'react';
import { ArrowLeft, Camera, Map, MessageSquare, Navigation, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import StoreMap from '@/components/StoreMap';
import NavigationChatbot from '@/components/NavigationChatbot';
import { walmartStoreLayout, getAisleById } from '@/data/storeLayout';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ARStoreNavigator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [highlightedAisle, setHighlightedAisle] = useState<string>('');
  const [navigationPath, setNavigationPath] = useState<string[]>([]);
  const [currentItem, setCurrentItem] = useState<string>('');
  const [arMode, setArMode] = useState(false);

  const handleNavigateToAisle = (aisleId: string) => {
    setHighlightedAisle(aisleId);
    // Simulate path from entrance to target aisle
    const pathToAisle = calculatePath('entrance', aisleId);
    setNavigationPath(pathToAisle);
  };

  const handleHighlightItem = (itemName: string) => {
    setCurrentItem(itemName);
  };

  const calculatePath = (from: string, to: string): string[] => {
    // Simple path calculation - in real app this would be more sophisticated
    const aisleOrder = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'];
    const targetIndex = aisleOrder.indexOf(to);
    
    if (targetIndex === -1) return [to];
    
    // Return a simple path through adjacent aisles
    return aisleOrder.slice(0, targetIndex + 1);
  };

  const toggleARMode = () => {
    setArMode(!arMode);
    toast({
      title: arMode ? "AR Mode Disabled" : "AR Mode Enabled",
      description: arMode ? "Switched to map view" : "Simulating AR camera view",
    });
  };

  const clearNavigation = () => {
    setHighlightedAisle('');
    setNavigationPath([]);
    setCurrentItem('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Compass className="h-6 w-6 text-blue-600" />
                  AR Store Navigator
                </h1>
                <p className="text-muted-foreground">Find anything in the store with AI assistance</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={arMode ? "default" : "outline"}
                onClick={toggleARMode}
                className="gap-2"
              >
                <Camera className="h-4 w-4" />
                {arMode ? "AR View" : "Map View"}
              </Button>
              
              {(highlightedAisle || navigationPath.length > 0) && (
                <Button variant="outline" onClick={clearNavigation}>
                  Clear Navigation
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Store Info Banner */}
      <div className="bg-primary/10 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">{walmartStoreLayout.name}</h2>
              <p className="text-sm text-muted-foreground">
                Demo store layout • {walmartStoreLayout.aisles.length} aisles
              </p>
            </div>
            
            {currentItem && (
              <Badge variant="secondary" className="gap-1">
                <Navigation className="h-3 w-3" />
                Finding: {currentItem}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Map/AR View */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  {arMode ? (
                    <>
                      <Camera className="h-5 w-5" />
                      AR Camera View (Simulated)
                    </>
                  ) : (
                    <>
                      <Map className="h-5 w-5" />
                      Store Map
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="h-[calc(100%-4rem)]">
                {arMode ? (
                  // AR Camera Simulation
                  <div className="relative w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg overflow-hidden">
                    {/* Simulated camera view */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23e5e7eb%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
                    
                    {/* AR Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="bg-black/70 text-white px-6 py-4 rounded-lg backdrop-blur-sm">
                          <h3 className="text-lg font-semibold mb-2">AR View Active</h3>
                          <p className="text-sm opacity-90 mb-4">
                            In a real AR implementation, you would see:
                          </p>
                          <ul className="text-sm space-y-1 text-left">
                            <li>• Live camera feed as background</li>
                            <li>• 3D directional arrows overlaid on floor</li>
                            <li>• Product highlights and information tags</li>
                            <li>• Real-time distance and direction indicators</li>
                          </ul>
                          
                          {highlightedAisle && (
                            <div className="mt-4 p-3 bg-blue-600 rounded">
                              <p className="font-medium">Navigate to:</p>
                              <p className="text-sm">{getAisleById(highlightedAisle)?.name}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* AR Navigation Indicators */}
                    {navigationPath.length > 0 && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Navigation className="h-4 w-4 text-blue-600" />
                            <span>Following path: {navigationPath.join(' → ')}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Regular Map View
                  <StoreMap
                    storeLayout={walmartStoreLayout}
                    highlightedAisle={highlightedAisle}
                    navigationPath={navigationPath}
                    onAisleClick={(aisle) => {
                      setHighlightedAisle(aisle.id);
                      toast({
                        title: `Selected ${aisle.name}`,
                        description: `Aisle ${aisle.id} - ${aisle.sections.join(', ')}`,
                      });
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Navigation Chatbot */}
          <div className="lg:col-span-1">
            <NavigationChatbot
              onNavigateToAisle={handleNavigateToAisle}
              onHighlightItem={handleHighlightItem}
            />
          </div>
        </div>
        
        {/* Feature Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>AR Store Navigator Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                  Smart Chatbot
                </h4>
                <p className="text-muted-foreground">
                  Ask natural language questions like "Where can I find toothpaste?" and get instant directions.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Map className="h-4 w-4 text-green-600" />
                  Interactive Map
                </h4>
                <p className="text-muted-foreground">
                  Visual store layout with highlighted paths and aisle information for easy navigation.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Camera className="h-4 w-4 text-purple-600" />
                  AR Experience
                </h4>
                <p className="text-muted-foreground">
                  Simulated AR view showing how real-time camera overlays would guide you through the store.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ARStoreNavigator;