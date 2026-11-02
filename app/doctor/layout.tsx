import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctor Clinical Portal | Shashwat Hospital",
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

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
