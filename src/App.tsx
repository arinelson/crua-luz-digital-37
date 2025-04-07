
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
import BlogPage from "./pages/BlogPage";
import WebStoriesPage from "./pages/WebStoriesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ServicesPage from "./pages/ServicesPage";
import SocialMediaPage from "./pages/SocialMediaPage";
import CategoryPage from "./pages/CategoryPage";
import BlogPostPage from "./pages/BlogPostPage";
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
                      <Route path="/blog" element={<BlogPage />} />
                      <Route path="/web-stories" element={<WebStoriesPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/services" element={<ServicesPage />} />
                      <Route path="/social-media" element={<SocialMediaPage />} />
                      <Route path="/category/:categorySlug" element={<CategoryPage />} />
                      <Route path="/blog/:articleSlug" element={<BlogPostPage />} />
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
