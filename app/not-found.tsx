import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1A1F2E] text-[#F5F0E8] p-4 text-center">
      <h1 className="text-4xl font-bold mb-4 text-[#D4A853]">404 - Page Not Found</h1>
      <p className="text-gray-300 mb-6 max-w-md">
        The requested page could not be found in Sooraj Krishnan V S&apos;s Data Engineering Portfolio.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-[#D4A853] text-[#1A1F2E] font-medium hover:bg-[#E8C878] transition-colors"
      >
        Back to Portfolio
      </Link>
    </div>
  );
}
