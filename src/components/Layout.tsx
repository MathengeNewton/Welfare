
import React from 'react';
import Link from 'next/link';
import TopNav from './TopNav';
import Image from 'next/image';

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/members', label: 'Members' },
  { href: '/locations', label: 'Locations' },
  { href: '/families', label: 'Families' },
  { href: '/contributions', label: 'Contributions' },
  { href: '/reports', label: 'Reports' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-pcea-white">
      <aside className="w-64 bg-gray-50 shadow-md p-6 flex flex-col min-h-screen">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/Screenshot from 2025-08-30 00-45-26.png"
            alt="Logo"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full border-4 border-pcea-gold bg-white object-cover"
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        </div>
        <nav className="flex-1 mt-2">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-lg text-pcea-blue hover:text-pcea-gold transition-colors"
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
