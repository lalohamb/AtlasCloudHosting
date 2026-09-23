import Link from 'next/link';
import { LayoutDashboard, FolderOpen, AppWindow, Package, Rocket, Database, Globe, CreditCard, Settings } from 'lucide-react';
import AtlasLogo from '@/components/atlas-logo';

const navItems = [
  { href: '/dashboard',              label: 'Overview',     icon: LayoutDashboard },
  { href: '/dashboard/projects',     label: 'Projects',     icon: FolderOpen },
  { href: '/dashboard/applications', label: 'Applications', icon: AppWindow },
  { href: '/dashboard/products',     label: 'Products',     icon: Package },
  { href: '/dashboard/deployments',  label: 'Deployments',  icon: Rocket },
  { href: '/dashboard/databases',    label: 'Databases',    icon: Database },
  { href: '/dashboard/domains',      label: 'Domains',      icon: Globe },
  { href: '/dashboard/billing',      label: 'Billing',      icon: CreditCard },
  { href: '/dashboard/settings',     label: 'Settings',     icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen pt-16">
      {/* Sidebar */}
      <aside className="w-64 bg-space-blue border-r border-white/10 flex-shrink-0 hidden md:flex flex-col">
        <div className="p-4 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7"><AtlasLogo /></div>
            <span className="text-sm font-bold text-white">Atlas Cloud</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-soft-silver/70 hover:text-white hover:bg-white/5 transition-colors text-sm"
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-soft-silver/40">Atlas Cloud Dashboard</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-space-blue">
        {children}
      </main>
    </div>
  );
}
