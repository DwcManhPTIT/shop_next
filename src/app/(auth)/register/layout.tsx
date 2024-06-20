export default function RELayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h2>{children}</h2>
    </div>
  );
}
