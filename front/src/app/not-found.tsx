import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link href="/">
          <span className="inline-block px-6 py-3 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 transition-colors">
            Return to homepage
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
