import { isRouteErrorResponse } from "react-router";

export default function CatchAll() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-4">
          The page you're looking for doesn't exist.
        </p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Go back home
        </a>
      </div>
    </main>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  if (isRouteErrorResponse(error)) {
    return (
      <main className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            {error.status} - {error.statusText}
          </h1>
          <p className="text-gray-600 mb-4">{error.data}</p>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            Go back home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-600 mb-4">An unexpected error occurred.</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Go back home
        </a>
      </div>
    </main>
  );
}
