import { Geist, Geist_Mono } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-josefin",
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "CVForge — AI Resume Builder",
    template: "%s | CVForge",
  },
  description:
    "CVForge is an AI-powered resume builder that scans your resume, checks it against the job description, and helps you beat the ATS to get hired faster.",
  applicationName: "CVForge",
  keywords: [
    "AI resume builder",
    "ATS resume checker",
    "free resume template",
    "resume optimizer",
    "job application helper",
    "CVForge",
  ],
  authors: [{ name: "Aman Nakoti" }],
  creator: "Aman Nakoti",
  openGraph: {
    title: "CVForge — AI Resume Builder",
    description:
      "Beat the ATS and get hired faster. AI scans your resume, finds missing keywords, and gives actionable feedback.",
    url: appUrl,
    siteName: "CVForge",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CVForge — AI Resume Builder",
    description:
      "Beat the ATS and get hired faster with AI-powered resume analysis.",
  },
  icons: {
    icon: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#021F81",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CVForge",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: appUrl,
  description:
    "AI-powered resume builder that scans resumes against job descriptions to help you beat ATS systems and get hired.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  author: {
    "@type": "Person",
    name: "Aman Nakoti",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${josefin.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}