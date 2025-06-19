import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Upload, Camera, RotateCcw, Download, Glasses, Crown, Gem } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Accessory {
  id: string;
  name: string;
  type: 'sunglasses' | 'hat' | 'earrings';
  image: string;
  price: number;
}

const accessories: Accessory[] = [
  {
    id: 'sunglasses-1',
    name: 'Classic Aviators',
    type: 'sunglasses',
    image: '/placeholder.svg',
    price: 89.99
  },
  {
    id: 'sunglasses-2',
    name: 'Round Vintage',
    type: 'sunglasses',
    image: '/placeholder.svg',
    price: 79.99
  },
  {
    id: 'hat-1',
    name: 'Baseball Cap',
    type: 'hat',
    image: '/placeholder.svg',
    price: 29.99
  },
  {
    id: 'hat-2',
    name: 'Fedora Hat',
    type: 'hat',
    image: '/placeholder.svg',
    price: 59.99
  },
  {
    id: 'earrings-1',
    name: 'Pearl Drops',
    type: 'earrings',
    image: '/placeholder.svg',
    price: 149.99
  },
  {
    id: 'earrings-2',
    name: 'Gold Hoops',
    type: 'earrings',
    image: '/placeholder.svg',
    price: 99.99
  }
];

interface VirtualTryOnProps {
  onAddToCart?: (accessory: Accessory) => void;
}

const VirtualTryOn = ({ onAddToCart }: VirtualTryOnProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAccessory, setSelectedAccessory] = useState<Accessory | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  // Mock face detection - in real implementation, you'd use MediaPipe
  const detectFace = useCallback(async (imageUrl: string) => {
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful face detection
    setFaceDetected(true);
    setIsProcessing(false);
    
    toast({
      title: "Face detected!",
      description: "You can now try on accessories",
    });
  }, [toast]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setSelectedImage(imageUrl);
        detectFace(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const drawAccessoryOverlay = useCallback(() => {
    if (!selectedImage || !selectedAccessory || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the original image
      ctx.drawImage(img, 0, 0);
      
      // Mock accessory positioning based on type
      const centerX = img.width / 2;
      const faceTopY = img.height * 0.2;
      const faceWidth = img.width * 0.6;
      
      // Draw accessory overlay (simplified positioning)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      
      switch (selectedAccessory.type) {
        case 'sunglasses':
          // Draw sunglasses placeholder
          ctx.fillRect(centerX - faceWidth * 0.3, faceTopY + 40, faceWidth * 0.6, 20);
          ctx.fillText('😎 ' + selectedAccessory.name, centerX, faceTopY + 100);
          break;
        case 'hat':
          // Draw hat placeholder
          ctx.fillRect(centerX - faceWidth * 0.4, faceTopY - 30, faceWidth * 0.8, 25);
          ctx.fillText('🎩 ' + selectedAccessory.name, centerX, faceTopY - 50);
          break;
        case 'earrings':
          // Draw earrings placeholder
          ctx.beginPath();
          ctx.arc(centerX - faceWidth * 0.25, faceTopY + 80, 8, 0, 2 * Math.PI);
          ctx.arc(centerX + faceWidth * 0.25, faceTopY + 80, 8, 0, 2 * Math.PI);
          ctx.fill();
          ctx.fillText('💎 ' + selectedAccessory.name, centerX, faceTopY + 120);
          break;
      }
    };
    img.src = selectedImage;
  }, [selectedImage, selectedAccessory]);

  useEffect(() => {
    if (selectedAccessory && faceDetected) {
      drawAccessoryOverlay();
    }
  }, [selectedAccessory, faceDetected, drawAccessoryOverlay]);

  const handleAccessorySelect = (accessory: Accessory) => {
    if (!faceDetected) {
      toast({
        title: "Please upload a selfie first",
        description: "Face detection is required for virtual try-on",
        variant: "destructive",
      });
      return;
    }
    setSelectedAccessory(accessory);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = `virtual-tryon-${selectedAccessory?.name || 'image'}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
    
    toast({
      title: "Image saved!",
      description: "Your virtual try-on image has been downloaded",
    });
  };

  const handleAddToCart = () => {
    if (selectedAccessory && onAddToCart) {
      onAddToCart(selectedAccessory);
      toast({
        title: "Added to cart!",
        description: `${selectedAccessory.name} has been added to your cart`,
      });
    }
  };

  const resetTryOn = () => {
    setSelectedImage(null);
    setSelectedAccessory(null);
    setFaceDetected(false);
    setIsProcessing(false);
  };

  const getCategoryIcon = (type: string) => {
    switch (type) {
      case 'sunglasses': return <Glasses className="h-4 w-4" />;
      case 'hat': return <Crown className="h-4 w-4" />;
      case 'earrings': return <Gem className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-purple-600" />
            Virtual Try-On Studio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Upload your selfie and try on accessories virtually before purchasing!
          </p>

          {/* Upload Section */}
          {!selectedImage ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Upload Your Selfie</h3>
              <p className="text-muted-foreground mb-4">
                Take or upload a clear front-facing photo for the best results
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                capture="user"
                className="hidden"
              />
              <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="h-4 w-4 mr-2" />
                Choose Photo
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Image Preview and Controls */}
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="w-full max-w-md mx-auto rounded-lg border"
                  style={{ display: selectedImage ? 'block' : 'none' }}
                />
                {selectedImage && !canvasRef.current && (
                  <img
                    src={selectedImage}
                    alt="Uploaded selfie"
                    className="w-full max-w-md mx-auto rounded-lg border"
                  />
                )}
                
                {/* Processing Overlay */}
                {isProcessing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                      <p>Detecting face...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Status and Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {faceDetected ? (
                    <Badge className="bg-green-100 text-green-800">
                      Face detected ✓
                    </Badge>
                  ) : isProcessing ? (
                    <Badge variant="secondary">Processing...</Badge>
                  ) : (
                    <Badge variant="outline">No face detected</Badge>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={resetTryOn}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                  {selectedAccessory && (
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Accessory Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Accessories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {accessories.map((accessory) => (
              <div
                key={accessory.id}
                className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                  selectedAccessory?.id === accessory.id
                    ? 'border-primary bg-accent'
                    : 'border-gray-200'
                }`}
                onClick={() => handleAccessorySelect(accessory)}
              >
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  {getCategoryIcon(accessory.type)}
                </div>
                <h4 className="font-medium text-sm mb-1">{accessory.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  ${accessory.price.toFixed(2)}
                </p>
                <Badge variant="outline" className="text-xs">
                  {accessory.type}
                </Badge>
              </div>
            ))}
          </div>

          {/* Add to Cart */}
          {selectedAccessory && faceDetected && (
            <div className="mt-6 p-4 bg-accent rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{selectedAccessory.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    ${selectedAccessory.price.toFixed(2)}
                  </p>
                </div>
                <Button onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feature Info */}
      <Card>
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <h4 className="font-medium">How it works</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload selfie
              </div>
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                AI detects face
              </div>
              <div className="flex items-center gap-2">
                <Glasses className="h-4 w-4" />
                Try accessories
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VirtualTryOn;