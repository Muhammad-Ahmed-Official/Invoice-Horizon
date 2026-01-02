'use client';

import { Home, FileText, Users, Settings, LucideLogOut, Power } from 'lucide-react';
import { useAuth } from "@/redux/authProvider";
import { asyncHandlerFront } from "@/utils/asyncHandler";
import toast from "react-hot-toast";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import logo from "../../../public/logo2.png"
import Image from 'next/image';
import { useMutation } from '@apollo/client/react';
import { LOGOUT_MUTATION } from '@/graphql/auth';

const navigation = [
  { name: 'Dashboard', href: '/home', icon: Home },
  { name: 'Invoices', href: '/invoice', icon: FileText },
  { name: 'Clients', href: '/client', icon: Users },
  { name: 'Settings', href: '/setting', icon: Settings },
];

export default function Sidebar() {
  const { setUser } = useAuth();
  const pathname = usePathname();

  const [logoutMutation] = useMutation(LOGOUT_MUTATION)

  const handleLogout = async () => {
    await asyncHandlerFront(
      async () => {
        await logoutMutation()
        setUser(null);
      },
      (error) => toast.error(error?.message)
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed top-0 left-0 h-screen w-68 flex-col bg-black text-foreground">
        {/* LOGO */}
        <div className="flex h-20 items-center border-b border-border px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl ">
              <Image src={logo} alt='logo' height={40} />
            </div>
            <div>
              <span className="text-[18px] font-bold text-gradient-gold">Invoice Horizon</span>
              <p className="text-xs text-muted-foreground">Ignite your business flow</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-6">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300',
                  isActive
                    ? 'bg-gradient-gold text-primary-foreground shadow-glow'
                    : 'text-muted-foreground hover:bg-accent/10 hover:text-cream'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 transition',
                    isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-gold'
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <Button
            onClick={handleLogout}
            className="w-full shadow-none bg-destructive text-destructive-foreground hover:bg-red-400">
            <LucideLogOut className="mr-2 h-5 w-5" /> Logout
          </Button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
     <div className="fixed bottom-0 left-0 right-0 z-50  flex items-center justify-between md:hidden bg-gradient-dark rounded-t-lg border-t border-gray-700 shadow-lg px-4 py-2">
  {/* Navigation Items */}
  <div className="flex flex-1 justify-around">
    {navigation.map((item) => {
      const isActive = pathname === item.href;
      return (
        <Link
          key={item.name}
          href={item.href}
          className="flex flex-col items-center justify-center text-xs font-medium transition-colors duration-200"
        >
          <item.icon
            className={cn(
              'h-6 w-6 mb-1 transition-colors',
              isActive ? 'text-gold' : 'text-muted-foreground'
            )}
          />
          <span className={cn(isActive ? 'text-gold' : 'text-muted-foreground')}>
            {item.name}
          </span>
        </Link>
      );
    })}
  </div>

  {/* Logout Button */}
  <Button
    onClick={handleLogout}
    variant="ghost"
    className="flex flex-col items-center justify-center text-xs text-red-500 hover:text-red-400 transition-colors"
  >
    <Power className="h-6 w-6 mb-1" />
    Logout
  </Button>
</div>

    </>
  );
}
