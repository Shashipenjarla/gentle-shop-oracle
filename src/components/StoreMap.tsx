import { useState, useRef, useEffect } from 'react';
import { StoreLayout, StoreAisle } from '@/data/storeLayout';

interface StoreMapProps {
  storeLayout: StoreLayout;
  highlightedAisle?: string;
  onAisleClick?: (aisle: StoreAisle) => void;
  navigationPath?: string[];
}

const StoreMap = ({ storeLayout, highlightedAisle, onAisleClick, navigationPath = [] }: StoreMapProps) => {
  const [selectedAisle, setSelectedAisle] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleAisleClick = (aisle: StoreAisle) => {
    setSelectedAisle(aisle.id);
    onAisleClick?.(aisle);
  };

  const getAisleColor = (aisleId: string) => {
    if (aisleId === highlightedAisle) return '#ef4444'; // Red for highlighted
    if (navigationPath.includes(aisleId)) return '#22c55e'; // Green for path
    if (aisleId === selectedAisle) return '#3b82f6'; // Blue for selected
    return '#6b7280'; // Gray for default
  };

  const getAisleOpacity = (aisleId: string) => {
    if (aisleId === highlightedAisle || navigationPath.includes(aisleId)) return 0.8;
    return 0.6;
  };

  return (
    <div className="w-full h-full bg-muted/10 rounded-lg overflow-hidden relative">
      {/* Store Map SVG */}
      <svg
        ref={svgRef}
        viewBox="0 0 500 400"
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      >
        {/* Background */}
        <rect width="500" height="400" fill="white" />
        
        {/* Grid lines for reference */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="500" height="400" fill="url(#grid)" />
        
        {/* Store Aisles */}
        {storeLayout.aisles.map((aisle) => (
          <g key={aisle.id}>
            <rect
              x={aisle.position.x}
              y={aisle.position.y}
              width={aisle.position.width}
              height={aisle.position.height}
              fill={getAisleColor(aisle.id)}
              opacity={getAisleOpacity(aisle.id)}
              stroke="#374151"
              strokeWidth="2"
              rx="4"
              className="cursor-pointer transition-all duration-200 hover:opacity-90"
              onClick={() => handleAisleClick(aisle)}
            />
            <text
              x={aisle.position.x + aisle.position.width / 2}
              y={aisle.position.y + aisle.position.height / 2 - 5}
              textAnchor="middle"
              className="text-xs font-semibold fill-white"
              style={{ fontSize: '10px' }}
            >
              {aisle.id}
            </text>
            <text
              x={aisle.position.x + aisle.position.width / 2}
              y={aisle.position.y + aisle.position.height / 2 + 8}
              textAnchor="middle"
              className="text-xs fill-white"
              style={{ fontSize: '8px' }}
            >
              {aisle.name.length > 15 ? `${aisle.name.slice(0, 15)}...` : aisle.name}
            </text>
          </g>
        ))}
        
        {/* Special Areas */}
        {storeLayout.specialAreas.map((area) => (
          <g key={area.id}>
            <rect
              x={area.position.x}
              y={area.position.y}
              width={area.position.width}
              height={area.position.height}
              fill="#8b5cf6"
              opacity="0.7"
              stroke="#6d28d9"
              strokeWidth="2"
              rx="4"
            />
            <text
              x={area.position.x + area.position.width / 2}
              y={area.position.y + area.position.height / 2}
              textAnchor="middle"
              className="text-xs font-semibold fill-white"
              style={{ fontSize: '9px' }}
            >
              {area.name}
            </text>
          </g>
        ))}
        
        {/* Navigation Path Lines */}
        {navigationPath.length > 1 && (
          <g>
            {navigationPath.slice(0, -1).map((aisleId, index) => {
              const currentAisle = storeLayout.aisles.find(a => a.id === aisleId);
              const nextAisle = storeLayout.aisles.find(a => a.id === navigationPath[index + 1]);
              
              if (!currentAisle || !nextAisle) return null;
              
              const x1 = currentAisle.position.x + currentAisle.position.width / 2;
              const y1 = currentAisle.position.y + currentAisle.position.height / 2;
              const x2 = nextAisle.position.x + nextAisle.position.width / 2;
              const y2 = nextAisle.position.y + nextAisle.position.height / 2;
              
              return (
                <line
                  key={`path-${index}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#22c55e"
                  strokeWidth="4"
                  strokeDasharray="5,5"
                  opacity="0.8"
                />
              );
            })}
          </g>
        )}
        
        {/* You are here indicator */}
        <g>
          <circle cx="225" cy="60" r="8" fill="#ef4444" opacity="0.9" />
          <circle cx="225" cy="60" r="4" fill="white" />
          <text x="225" y="85" textAnchor="middle" className="text-xs font-bold fill-red-600">
            You are here
          </text>
        </g>
      </svg>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Current Location / Highlighted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Navigation Path</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span>Special Areas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreMap;