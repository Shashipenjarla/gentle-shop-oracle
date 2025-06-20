export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  hours: string;
  services: string[];
  distance?: number;
}

export interface TravelRoute {
  mode: 'DRIVING' | 'WALKING' | 'TRANSIT' | 'BICYCLING';
  duration: string;
  distance: string;
  instructions: string[];
}

export interface GeolocationResult {
  lat: number;
  lng: number;
  accuracy: number;
}

// Mock store locations (in real app, these would come from API)
export const mockStoreLocations: StoreLocation[] = [
  {
    id: 'store1',
    name: 'Walmart Supercenter - Downtown',
    address: '123 Main Street, Downtown, NY 10001',
    lat: 40.7128,
    lng: -74.0060,
    phone: '(555) 123-4567',
    hours: '6:00 AM - 11:00 PM',
    services: ['Grocery', 'Pharmacy', 'Auto Center', 'Vision Center']
  },
  {
    id: 'store2',
    name: 'Walmart Neighborhood Market - Midtown',
    address: '456 Broadway, Midtown, NY 10018',
    lat: 40.7505,
    lng: -73.9934,
    phone: '(555) 234-5678',
    hours: '6:00 AM - 10:00 PM',
    services: ['Grocery', 'Pharmacy', 'Money Services']
  },
  {
    id: 'store3',
    name: 'Walmart Supercenter - Upper East Side',
    address: '789 Lexington Ave, Upper East Side, NY 10065',
    lat: 40.7736,
    lng: -73.9566,
    phone: '(555) 345-6789',
    hours: '6:00 AM - 11:00 PM',
    services: ['Grocery', 'Pharmacy', 'Vision Center', 'Tire & Lube']
  }
];

export const getCurrentLocation = (): Promise<GeolocationResult> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });
};

export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const findNearestStores = (userLat: number, userLng: number, maxResults: number = 5): StoreLocation[] => {
  return mockStoreLocations
    .map(store => ({
      ...store,
      distance: calculateDistance(userLat, userLng, store.lat, store.lng)
    }))
    .sort((a, b) => (a.distance || 0) - (b.distance || 0))
    .slice(0, maxResults);
};

// Mock function to simulate Google Maps API call
export const getDirections = async (
  origin: { lat: number; lng: number },
  destination: StoreLocation,
  mode: 'DRIVING' | 'WALKING' | 'TRANSIT' | 'BICYCLING',
  apiKey?: string
): Promise<TravelRoute> => {
  // In real implementation, this would call Google Maps Directions API
  if (!apiKey) {
    throw new Error('Google Maps API key is required');
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock response based on mode and distance
  const distance = destination.distance || calculateDistance(origin.lat, origin.lng, destination.lat, destination.lng);
  
  const mockRoutes: Record<string, TravelRoute> = {
    DRIVING: {
      mode: 'DRIVING',
      duration: `${Math.round(distance * 3)} min`,
      distance: `${distance.toFixed(1)} mi`,
      instructions: [
        'Head north on Main St',
        'Turn right onto Broadway',
        `Arrive at ${destination.name}`
      ]
    },
    WALKING: {
      mode: 'WALKING',
      duration: `${Math.round(distance * 20)} min`,
      distance: `${distance.toFixed(1)} mi`,
      instructions: [
        'Head north on Main St',
        'Turn right onto Broadway',
        'Continue straight for 0.5 mi',
        `Arrive at ${destination.name}`
      ]
    },
    TRANSIT: {
      mode: 'TRANSIT',
      duration: `${Math.round(distance * 8)} min`,
      distance: `${distance.toFixed(1)} mi`,
      instructions: [
        'Walk to Main St Station (3 min)',
        'Take Bus Route 42 (8 min)',
        'Get off at Broadway & 5th',
        `Walk to ${destination.name} (2 min)`
      ]
    },
    BICYCLING: {
      mode: 'BICYCLING',
      duration: `${Math.round(distance * 6)} min`,
      distance: `${distance.toFixed(1)} mi`,
      instructions: [
        'Head north on Main St bike lane',
        'Turn right onto Broadway bike path',
        `Arrive at ${destination.name}`
      ]
    }
  };

  return mockRoutes[mode];
};