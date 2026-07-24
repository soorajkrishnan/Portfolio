import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sooraj Krishnan V S | Cloud Data Engineer',
  description: 'Data Engineer with 4+ years experience architecting Medallion pipelines, Azure Data Explorer, Apache Spark, AWS document parsers, and FastAPI automation.',
  keywords: [
    'Sooraj Krishnan V S',
    'Data Engineer',
    'Cloud Data Engineer',
    'Azure Data Explorer',
    'Medallion Architecture',
    'Apache Spark',
    'Databricks',
    'FastAPI',
    'KQL',
    'AWS Step Functions'
  ],
  authors: [{ name: 'Sooraj Krishnan V S' }],
  openGraph: {
    title: 'Sooraj Krishnan V S | Cloud Data Engineer Portfolio',
    description: 'Walk through Sooraj Krishnan V S\'s data engineering journey: Medallion architecture, real-time event streaming, dynamic API generation, and ML topic modeling.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#1A1F2E] text-[#F5F0E8] antialiased selection:bg-[#D4A853] selection:text-[#1A1F2E]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
