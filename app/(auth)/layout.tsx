
import "../globals.css";
export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex p-4 justify-center items-center shadow-md">{children}</div>;
}
