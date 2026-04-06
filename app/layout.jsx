import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'HonestNeed - Coming Soon | Support Your Community',
  description: 'See good, do good. Join a movement where people help each other. Launching April 1, 2026. Become a founding sponsor today.',
  keywords: ['community', 'help', 'support', 'crowdfunding', 'sponsorship', 'nonprofit'],
  authors: [{ name: 'HonestNeed' }],
  openGraph: {
    title: 'HonestNeed - Coming Soon',
    description: 'Join thousands building a community that helps each other.',
    type: 'website',
    url: 'https://honestneed.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HonestNeed - Coming Soon',
    description: 'See good, do good. Join the movement.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#6366F1" />
      </head>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
