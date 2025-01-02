'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  icon: React.ReactNode;
  title: string;
  href: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, title, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={`nav-item ${isActive ? 'active' : ''}`}
    >
      <span className="nav-icon">{icon}</span>
      <span className="nav-title">{title}</span>
    </Link>
  );
};

export default NavItem;