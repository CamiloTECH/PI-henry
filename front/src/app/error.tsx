"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">500 - Error</h1>
        <p className="text-gray-600 mb-8">
          An error occurred, refresh the page
        </p>

        <span
          className="inline-block px-6 py-3 cursor-pointer bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 transition-colors"
          onClick={reset}
        >
          Refresh
        </span>
      </div>
    </div>
  );
}
