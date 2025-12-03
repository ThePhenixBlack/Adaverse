// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adaverse",
  description: "Visualisation des projets Ada Tech School",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-background text-foreground min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}