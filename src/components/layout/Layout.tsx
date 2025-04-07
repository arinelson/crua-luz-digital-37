
import React, { useEffect, useState, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Progress } from "@/components/ui/progress";
import NewsletterPopup from '@/components/NewsletterPopup';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const isBlogPost = location.pathname.includes('/blog/');

  // Reset scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle scroll progress for the reading progress bar
  useEffect(() => {
    if (!isBlogPost) return;

    let rafId: number;
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Use requestAnimationFrame for smooth performance
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
        
        // Set scrolling state for animation optimizations
        setIsScrolling(true);
        
        // Clear previous timeout
        clearTimeout(timeout);
        
        // Set a timeout to clear the scrolling state
        timeout = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      });
    };

    // Add event listener
    window.addEventListener('scroll', handleScroll);

    // Remove event listener and cancel animations on cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      clearTimeout(timeout);
    };
  }, [isBlogPost]);

  return (
    <>
      {/* Reading progress bar - only shown on blog post pages */}
      {isBlogPost && (
        <Progress 
          value={scrollProgress}
          className="fixed top-0 left-0 right-0 z-50 h-1 rounded-none bg-transparent" 
        />
      )}
      
      <div className="flex flex-col min-h-screen">
        <Header />
        <Suspense fallback={<div className="flex-grow flex items-center justify-center">Loading...</div>}>
          <main className="flex-grow">
            {children}
          </main>
        </Suspense>
        <Footer />
      </div>

      {/* Newsletter Popup */}
      <NewsletterPopup />
    </>
  );
};

export default Layout;
