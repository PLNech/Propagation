import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Propagation - Un Jeu Incrémental de Manipulation Sociale',
  description: 'Un jeu éducatif explorant les mécanismes de propagation des fausses croyances',
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