'use client';

import React from 'react';
import Link from 'next/link';
import { Moon, Settings, Sun } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { useAppDispatch, useAppSelector } from '@/redux';
import { setIsDarkMode } from '@/redux/slices/globalSlice';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector((state) => state.globalReducer);
  const { user } = useAppSelector((state) => state.userReducer);

  const toggleDarkMode = () => dispatch(setIsDarkMode(!isDarkMode));

  return (
    <header className='flex h-16 shrink-0 items-center gap-2'>
      <div className='flex items-center justify-between gap-2 px-4 w-full'>
        {/* LEFT SIDE */}
        <div className='flex justify-between items-center gap-5'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mr-2 h-4' />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className='hidden md:block'>
                <BreadcrumbLink href='#'>
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='hidden md:block' />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* RIGHT SIDE */}
        <div className='flex justify-between items-center gap-5'>
          <div className='hidden md:flex justify-between items-center gap-5'>
            <div>
              <Button variant='ghost' size='icon' onClick={toggleDarkMode}>
                {isDarkMode ? (
                  <Sun className='cursor-pointer text-gray-500' />
                ) : (
                  <Moon className='cursor-pointer text-gray-500' />
                )}
              </Button>
            </div>

            <Separator orientation='vertical' className='mr-2 h-4' />

            <div className='flex items-center gap-3 cursor-pointer'>
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className='rounded-lg'>
                  {user?.name[0]}
                </AvatarFallback>
              </Avatar>
              <span className='text-lg'>{user?.name}</span>
            </div>
          </div>

          <Link href='/settings'>
            <Settings className='cursor-pointer text-gray-500' size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
