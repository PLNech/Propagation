import './globals.css';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'propagation - et si tu contrôlais l\'information ?',
  description: 'un jeu sur l\'influence et ses zones d\'ombre. qui contrôle qui, vraiment ?',
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
  },
  openGraph: {
    title: 'propagation - contrôle la narrative avant qu\'ils te contrôlent',
    description: 'ce petit jeu incrémental cache peut-être plus qu\'il n\'y paraît... les règles sont pas stables ! fais tes propres recherches !',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'propagation - un jeu sur l\'influence et l\'information',
      }
    ],
    type: 'website',
    locale: 'fr_FR',
    url: 'https://propagation.vercel.app/',
    siteName: 'propagation',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'propagation - le jeu qui pose des questions',
    description: 'un jeu sur l\'information et le pouvoir. viens voir pourquoi tout le monde en parle... ou pas.',
    images: ['/og-image.jpg'],
  },
  themeColor: '#1a1f2e',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-900">
        {children}
      </body>
    </html>
  );
}