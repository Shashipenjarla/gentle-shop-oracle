import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Ruler, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserMeasurements {
  height: string;
  weight: string;
  bodyType: string;
  preferredFit: string;
}

interface SizePrediction {
  recommendedSize: string;
  confidence: number;
  alternativeSizes: string[];
  returnRisk: 'low' | 'medium' | 'high';
  reasons: string[];
}

const SizePredictor = () => {
  const [measurements, setMeasurements] = useState<UserMeasurements>({
    height: '',
    weight: '',
    bodyType: '',
    preferredFit: ''
  });
  const [prediction, setPrediction] = useState<SizePrediction | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { toast } = useToast();

  const bodyTypes = [
    'Athletic',
    'Slim',
    'Average',
    'Broad',
    'Plus Size'
  ];

  const preferredFits = [
    'Tight/Fitted',
    'Regular',
    'Loose/Relaxed'
  ];

  const categories = [
    'Shirts & Tops',
    'Pants & Jeans',
    'Dresses',
    'Shoes',
    'Outerwear'
  ];

  // Mock size chart data
  const sizeCharts = {
    'Shirts & Tops': {
      XS: { chest: '32-34', height: '5\'2"-5\'6"' },
      S: { chest: '34-36', height: '5\'4"-5\'8"' },
      M: { chest: '36-38', height: '5\'6"-5\'10"' },
      L: { chest: '38-40', height: '5\'8"-6\'0"' },
      XL: { chest: '40-42', height: '5\'10"-6\'2"' },
      XXL: { chest: '42-44', height: '6\'0"-6\'4"' }
    },
    'Pants & Jeans': {
      XS: { waist: '26-28', inseam: '28-30' },
      S: { waist: '28-30', inseam: '30-32' },
      M: { waist: '30-32', inseam: '32-34' },
      L: { waist: '32-34', inseam: '32-34' },
      XL: { waist: '34-36', inseam: '32-34' },
      XXL: { waist: '36-38', inseam: '32-34' }
    }
  };

  const predictSize = (): SizePrediction => {
    const height = parseFloat(measurements.height);
    const weight = parseFloat(measurements.weight);
    
    // Mock AI prediction algorithm
    let recommendedSize = 'M';
    let confidence = 85;
    let returnRisk: 'low' | 'medium' | 'high' = 'low';
    let reasons: string[] = [];

    // Simple prediction based on height/weight ratio
    const bmi = weight / Math.pow(height / 100, 2);
    
    if (bmi < 18.5) {
      recommendedSize = measurements.bodyType === 'Slim' ? 'XS' : 'S';
      reasons.push('BMI indicates smaller frame');
    } else if (bmi < 25) {
      recommendedSize = measurements.bodyType === 'Athletic' ? 'M' : 'S';
      reasons.push('BMI within normal range');
    } else if (bmi < 30) {
      recommendedSize = 'L';
      reasons.push('BMI indicates larger frame');
    } else {
      recommendedSize = 'XL';
      reasons.push('BMI indicates plus size');
    }

    // Adjust for preferred fit
    if (measurements.preferredFit === 'Tight/Fitted') {
      confidence -= 10;
      reasons.push('Fitted preference may require size down');
      returnRisk = 'medium';
    } else if (measurements.preferredFit === 'Loose/Relaxed') {
      const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
      const currentIndex = sizes.indexOf(recommendedSize);
      if (currentIndex < sizes.length - 1) {
        recommendedSize = sizes[currentIndex + 1];
        reasons.push('Relaxed fit preference');
      }
    }

    // Return risk assessment
    if (selectedCategory === 'Dresses' || selectedCategory === 'Shoes') {
      returnRisk = 'high';
      confidence -= 15;
      reasons.push('High return rate category');
    }

    const alternativeSizes = getAlternativeSizes(recommendedSize);

    return {
      recommendedSize,
      confidence: Math.max(60, confidence),
      alternativeSizes,
      returnRisk,
      reasons
    };
  };

  const getAlternativeSizes = (mainSize: string): string[] => {
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const index = sizes.indexOf(mainSize);
    const alternatives = [];
    
    if (index > 0) alternatives.push(sizes[index - 1]);
    if (index < sizes.length - 1) alternatives.push(sizes[index + 1]);
    
    return alternatives;
  };

  const handlePredict = () => {
    if (!measurements.height || !measurements.weight || !measurements.bodyType || !selectedCategory) {
      toast({
        title: "Missing Information",
        description: "Please fill in all measurements and select a category",
        variant: "destructive",
      });
      return;
    }

    const result = predictSize();
    setPrediction(result);
    
    toast({
      title: "Size Prediction Complete!",
      description: `Recommended size: ${result.recommendedSize} (${result.confidence}% confidence)`,
    });
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <CheckCircle className="h-4 w-4" />;
      case 'medium': return <TrendingUp className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ruler className="h-5 w-5 text-purple-600" />
            AI Size Predictor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Get accurate size recommendations based on your measurements and body type.
          </p>

          {/* Measurements Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={measurements.height}
                onChange={(e) => setMeasurements(prev => ({ ...prev, height: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                value={measurements.weight}
                onChange={(e) => setMeasurements(prev => ({ ...prev, weight: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="bodyType">Body Type</Label>
              <Select
                value={measurements.bodyType}
                onValueChange={(value) => setMeasurements(prev => ({ ...prev, bodyType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select body type" />
                </SelectTrigger>
                <SelectContent>
                  {bodyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="preferredFit">Preferred Fit</Label>
              <Select
                value={measurements.preferredFit}
                onValueChange={(value) => setMeasurements(prev => ({ ...prev, preferredFit: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select fit preference" />
                </SelectTrigger>
                <SelectContent>
                  {preferredFits.map((fit) => (
                    <SelectItem key={fit} value={fit}>
                      {fit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <Label htmlFor="category">Product Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handlePredict} className="w-full">
            <Ruler className="h-4 w-4 mr-2" />
            Predict My Size
          </Button>
        </CardContent>
      </Card>

      {/* Prediction Results */}
      {prediction && (
        <Card>
          <CardHeader>
            <CardTitle>Size Prediction Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Main Recommendation */}
            <div className="text-center p-6 bg-accent rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-2">
                Recommended Size: {prediction.recommendedSize}
              </h3>
              <p className="text-muted-foreground">
                {prediction.confidence}% confidence
              </p>
            </div>

            {/* Return Risk Warning */}
            <Alert>
              <div className="flex items-center gap-2">
                {getRiskIcon(prediction.returnRisk)}
                <AlertDescription className="flex-1">
                  <span className="font-medium">Return Risk: </span>
                  <Badge className={getRiskColor(prediction.returnRisk)}>
                    {prediction.returnRisk.toUpperCase()}
                  </Badge>
                  {prediction.returnRisk === 'high' && (
                    <span className="ml-2 text-sm">
                      Consider trying in-store or ordering multiple sizes
                    </span>
                  )}
                </AlertDescription>
              </div>
            </Alert>

            {/* Alternative Sizes */}
            {prediction.alternativeSizes.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Alternative Sizes to Consider:</h4>
                <div className="flex gap-2">
                  {prediction.alternativeSizes.map((size) => (
                    <Badge key={size} variant="outline">
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Reasoning */}
            <div>
              <h4 className="font-medium mb-2">Why this recommendation?</h4>
              <ul className="space-y-1">
                {prediction.reasons.map((reason, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Chart Reference */}
            {selectedCategory && sizeCharts[selectedCategory as keyof typeof sizeCharts] && (
              <div>
                <h4 className="font-medium mb-2">Size Chart Reference:</h4>
                <div className="text-sm space-y-1 bg-muted p-3 rounded">
                  {Object.entries(sizeCharts[selectedCategory as keyof typeof sizeCharts]).map(([size, measurements]) => (
                    <div key={size} className="flex justify-between">
                      <span className={size === prediction.recommendedSize ? 'font-bold text-primary' : ''}>
                        {size}:
                      </span>
                      <span className="text-muted-foreground">
                        {Object.values(measurements).join(', ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SizePredictor;