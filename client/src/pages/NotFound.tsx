import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-black dark:text-white mb-4">404</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Page not found. The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
