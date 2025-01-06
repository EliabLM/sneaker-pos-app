'use client';

import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const TableHeader = ({ title, subtitle, children }: Props) => {
  return (
    <section className='flex items-center'>
      <div className='w-full max-w-screen-xl px-4 mx-auto lg:px-12'>
        <div className='relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg'>
          <div className='flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4'>
            <div>
              <h5 className='mr-3 font-semibold dark:text-white'>{title}</h5>
              <p className='text-gray-500 dark:text-gray-400'>{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableHeader;
