
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            {/* Redirect from root to default language */}
            <Route path="/" element={<Navigate to="/pt" replace />} />
            
            {/* Language routes */}
            <Route path="/:lang/*" element={
              <LanguageProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <Layout>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      {/* These would be implemented in future iterations */}
                      <Route path="/blog" element={<div className="py-24 text-center"><h1 className="text-4xl font-bold">Blog Page</h1></div>} />
                      <Route path="/web-stories" element={<div className="py-24 text-center"><h1 className="text-4xl font-bold">Web Stories</h1></div>} />
                      <Route path="/about" element={<div className="py-24 text-center"><h1 className="text-4xl font-bold">About Page</h1></div>} />
                      <Route path="/contact" element={<div className="py-24 text-center"><h1 className="text-4xl font-bold">Contact Page</h1></div>} />
                      <Route path="/services" element={<div className="py-24 text-center"><h1 className="text-4xl font-bold">Services Page</h1></div>} />
                      <Route path="/social-media" element={<div className="py-24 text-center"><h1 className="text-4xl font-bold">Social Media Page</h1></div>} />
                      <Route path="/category/:categorySlug" element={<div className="py-24 text-center"><h1 className="text-4xl font-bold">Category Page</h1></div>} />
                      <Route path="/blog/:articleSlug" element={<div className="py-24 text-center"><h1 className="text-4xl font-bold">Blog Article Page</h1></div>} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Layout>
                </TooltipProvider>
              </LanguageProvider>
            } />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
