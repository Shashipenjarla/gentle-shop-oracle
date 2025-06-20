import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SocialShopping from "./pages/SocialShopping";
import ARStoreNavigator from "./pages/ARStoreNavigator";
import VirtualTryOnPage from "./pages/VirtualTryOnPage";
import StoreLocator from "./pages/StoreLocator";
import GreenRewards from "./pages/GreenRewards";
import LoyaltyDashboard from "./pages/LoyaltyDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/social" element={<SocialShopping />} />
          <Route path="/ar-navigator" element={<ARStoreNavigator />} />
          <Route path="/virtual-tryon" element={<VirtualTryOnPage />} />
          <Route path="/store-locator" element={<StoreLocator />} />
          <Route path="/green-rewards" element={<GreenRewards />} />
          <Route path="/loyalty-dashboard" element={<LoyaltyDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
