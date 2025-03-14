import './styles.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Propagation - Invitation Imprimable',
  description: 'Invitation officielle à rejoindre le monde des manipulateurs d\'information',
  metadataBase: new URL('https://propagation.vercel.app'), 
  openGraph: {
    title: 'Propagation - Invitation à Contrôler la Narrative',
    description: 'Rejoignez l\'élite des manipulateurs de l\'information à travers les âges',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Propagation - Invitation',
      }
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#1f2937',
};

export default function InvitationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-900 print:bg-white">
        {children}
      </body>
    </html>
  );
}