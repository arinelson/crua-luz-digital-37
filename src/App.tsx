
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
import { InitializeData } from "./components/InitializeData";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminCreatePost from "./pages/admin/AdminCreatePost";
import AdminEditPost from "./pages/admin/AdminEditPost";
import AdminWebStories from "./pages/admin/AdminWebStories";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <InitializeData />
          <Routes>
            {/* Admin routes */}
            <Route path="/admin" element={
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </TooltipProvider>
            } />
            <Route path="/admin/posts" element={
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <AdminLayout>
                  <AdminPosts />
                </AdminLayout>
              </TooltipProvider>
            } />
            <Route path="/admin/posts/create" element={
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <AdminLayout>
                  <AdminCreatePost />
                </AdminLayout>
              </TooltipProvider>
            } />
            <Route path="/admin/posts/edit/:postId" element={
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <AdminLayout>
                  <AdminEditPost />
                </AdminLayout>
              </TooltipProvider>
            } />
            <Route path="/admin/web-stories" element={
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <AdminLayout>
                  <AdminWebStories />
                </AdminLayout>
              </TooltipProvider>
            } />
            
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
