import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Datasets from "./pages/Datasets";
import Explorer from "./pages/Explorer";
import Categories from "./pages/Categories";
import ObjectDetail from "./pages/ObjectDetail";
import SolarSystemView from "./pages/SolarSystemView";
import PlanetView from "./pages/PlanetView";
import MoonView from "./pages/MoonView";
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
          <Route path="/datasets" element={<Datasets />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/solar-system" element={<SolarSystemView />} />
          <Route path="/planet/:planetId" element={<PlanetView />} />
          <Route path="/moon/:planetId/:moonId" element={<MoonView />} />
          <Route path="/object/:category/:objectId" element={<ObjectDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
