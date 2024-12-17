import { Link } from "react-router-dom";

const NotFoundScreen = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
        <p className="mb-8 text-2xl text-gray-600">Oops! Page not found.</p>
        <Link
          to="/"
          className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Trở về trang chủ
        </Link>
      </div>
    </>
  );
};

export default NotFoundScreen;
