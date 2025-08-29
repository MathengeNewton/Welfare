import React from 'react';
import Link from 'next/link';

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
        <h1 className="text-2xl font-bold mb-8 text-pcea-gold">Welfare Dashboard</h1>
        <nav className="flex-1">
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
      <main className="flex-1 p-8 bg-pcea-white">{children}</main>
    </div>
  );
}
