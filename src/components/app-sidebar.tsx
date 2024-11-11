'use client';

import Link from 'next/link';
import * as React from 'react';
import {
  BadgePercent,
  Barcode,
  Bot,
  Command,
  Frame,
  LayoutDashboard,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Users,
  Warehouse,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
// import { NavProjects } from '@/components/nav-projects';
// import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const data = {
  user: {
    name: 'Eliab López',
    email: 'eliablopez@hotmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Ventas',
      url: '#',
      icon: BadgePercent,
    },
    {
      title: 'Inventario',
      url: '#',
      icon: Warehouse,
    },
    {
      title: 'Productos',
      url: '#',
      icon: Barcode,
    },
    {
      title: 'Usuarios',
      url: '#',
      icon: Users,
    },
    {
      title: 'Parametrización',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Locales',
          url: '#',
        },
        {
          title: 'Marcas',
          url: '#',
        },
        {
          title: 'Categorías',
          url: '#',
        },
        {
          title: 'Métodos de pago',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy,
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send,
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant='inset' collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href='/'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  <Command className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>SneakerPOS</span>
                  <span className='truncate text-xs'>System</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        {/* <NavSecondary items={data.navSecondary} className='mt-auto' /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
