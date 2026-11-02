import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Care Portal | Shashwat Hospital",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
