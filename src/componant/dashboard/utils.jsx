import React from 'react';

export default function SideBar() {
  const openSidebar = () => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.setProperty('--SideNavigation-slideIn', '1');
    }
  };

  const closeSidebar = () => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.removeProperty('--SideNavigation-slideIn');
      document.body.style.removeProperty('overflow');
    }
  };

  const toggleSidebar = () => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const slideIn = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--SideNavigation-slideIn');
      if (slideIn) {
        closeSidebar();
      } else {
        openSidebar();
      }
    }
  };

  return (
    <div>
      <button onClick={openSidebar}>Open Sidebar</button>
      <button onClick={closeSidebar}>Close Sidebar</button>
      <button onClick={toggleSidebar}>Toggle Sidebar</button>
    </div>
  );
}