export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <head />
      <body>{children}</body>
    </html>
  );
}
