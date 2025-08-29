import React from 'react';
import Link from 'next/link';
import TopNav from './TopNav';

const navItems = [
  { href: '/members', label: 'Members' },
  { href: '/locations', label: 'Locations' },
  { href: '/families', label: 'Families' },
  { href: '/contributions', label: 'Contributions' },
  { href: '/reports', label: 'Reports' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-pcea-white">
      <aside className="w-64 bg-pcea-blue shadow-md p-6 flex flex-col min-h-screen">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://www.shutterstock.com/image-vector/science-cloud-computing-concept-based-600nw-2390397167.jpg"
            alt="Logo"
            className="w-20 h-20 rounded-full border-4 border-pcea-gold bg-white object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <nav className="flex-1 mt-2">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-lg text-pcea-white hover:text-pcea-gold transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col min-h-screen">
        <TopNav />
        <main className="flex-1 p-8 bg-pcea-white">{children}</main>
      </div>
    </div>
  );
}
