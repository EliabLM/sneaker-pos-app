import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import StoreWrapper from './StoreWrapper';
import { Toaster } from '@/components/ui/toaster';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'SneakerPOS',
  description: 'Sistema punto de venta para sneakers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreWrapper>{children}</StoreWrapper>
        <Toaster />
      </body>
    </html>
  );
}
