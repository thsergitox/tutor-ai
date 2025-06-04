'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';

interface HeaderProps {
  onMobileNavToggle?: () => void; // For chat page left sidebar
  isChatPage?: boolean;
  // isLeftSidebarMobileOpen?: boolean; // To change hamburger icon to X if sidebar is open
}

export default function Header({ 
  onMobileNavToggle,
  isChatPage 
  // isLeftSidebarMobileOpen 
}: HeaderProps) {
  const [isLocalMenuOpen, setIsLocalMenuOpen] = useState(false); // For regular nav dropdown

  const navigationItems = [
    { name: 'Practicar', href: '/chat/practice' },
    { name: 'Lecciones', href: '/lessons' },
    { name: 'Progreso', href: '/dashboard' },
    { name: 'Comunidad', href: '/community' },
  ];

  const handleMobileMenuClick = () => {
    if (isChatPage && onMobileNavToggle) {
      onMobileNavToggle(); // Toggle chat-specific left sidebar
    } else {
      setIsLocalMenuOpen(!isLocalMenuOpen); // Toggle regular header dropdown menu
    }
  };

  // Determine which icon to show for mobile menu button
  // let showXIcon = isChatPage ? isLeftSidebarMobileOpen : isLocalMenuOpen;
  // For now, let ChatLayout directly control the icon for LeftSidebar via its own state passed to LeftSidebar
  // Header's X icon will only relate to its own dropdown for non-chat pages.
  // If on chat page, the hamburger icon will trigger the LeftSidebar, which has its own X or overlay to close.

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold" style={{ color: '#2A6CC8' }}>
                TutorAI
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-brand-primary px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                André Pacheco
              </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={handleMobileMenuClick}
              className="text-gray-700 hover:text-brand-primary p-2"
            >
              {/* Icon logic: If on chat page, always show Menu (hamburger) because LeftSidebar has its own close control. 
                  If not on chat page, toggle Menu/X based on local dropdown. */}
              {(isChatPage ? false : isLocalMenuOpen) ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown (Only for non-chat pages) */}
        {!isChatPage && isLocalMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-brand-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
                  onClick={() => {
                    setIsLocalMenuOpen(false); // Close dropdown on link click
                  }}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center px-3 py-2">
                  <div className="w-8 h-8 bg-brand-secondary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="ml-3 text-base font-medium text-gray-700">
                    André Pacheco
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 