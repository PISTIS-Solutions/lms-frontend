import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grading",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
