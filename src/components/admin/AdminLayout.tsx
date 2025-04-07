
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, Video, LogOut } from 'lucide-react';

type AdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Gerenciamento de conteúdo</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-1">
            <li>
              <Link 
                to="/admin" 
                className={`flex items-center px-4 py-2 rounded-md ${isActive('/admin') && !isActive('/admin/posts') && !isActive('/admin/web-stories') ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              >
                <Home className="mr-2 h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/posts" 
                className={`flex items-center px-4 py-2 rounded-md ${isActive('/admin/posts') ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              >
                <FileText className="mr-2 h-5 w-5" />
                <span>Posts</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/web-stories" 
                className={`flex items-center px-4 py-2 rounded-md ${isActive('/admin/web-stories') ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
              >
                <Video className="mr-2 h-5 w-5" />
                <span>Web Stories</span>
              </Link>
            </li>
          </ul>
          
          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Link 
              to="/"
              className="flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
            >
              <LogOut className="mr-2 h-5 w-5" />
              <span>Sair para o site</span>
            </Link>
          </div>
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
