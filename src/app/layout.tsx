import "./globals.css";

// Root layout is a passthrough - locale layout handles HTML structure
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
