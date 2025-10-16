import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="text-center max-w-md px-6">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
            <svg
              className="w-10 h-10 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
            403
          </h1>
          <h2 className="text-2xl font-semibold mb-3">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You don&apos;t have permission to access this page. Admin access is required.
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/" className="block">
            <Button className="w-full">
              Go to Homepage
            </Button>
          </Link>
          <Link href="/auth" className="block">
            <Button variant="outline" className="w-full">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
