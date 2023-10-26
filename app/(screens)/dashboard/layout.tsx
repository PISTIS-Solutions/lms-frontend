import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="en">
      <body>{children}</body>
    </div>
  );
}
