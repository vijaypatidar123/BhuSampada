import "./globals.css";

export const metadata = {
  title: "BhuSampada",
  description: "Local rebuild of the BhuSampada real-estate marketplace.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
