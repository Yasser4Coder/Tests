import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">Welcome!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Your React Router v7 app is running successfully
        </p>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-green-600 font-semibold">
            ✅ Deployment successful!
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This page is being served by React Router v7
          </p>
        </div>
      </div>
    </main>
  );
}
