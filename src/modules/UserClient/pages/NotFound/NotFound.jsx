import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <section className="bg-white dark:bg-darkMode">
      <div className="container flex items-center px-6 py-32 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <h1 className="text-8xl font-bold text-blue-600">404</h1>
          <h2 className="mt-3 text-2xl font-semibold text-gray-800  md:text-3xl darkText">
            Page not found
          </h2>
          <p className="mt-4 text-gray-500 darkText">
            The page you are looking for doesn't exist. Here are some helpful
            links:
          </p>
          <div className="mt-6">
            <Link
              to={"/"}
              className="w-1/2 px-5 py-3 text-sm tracking-wide  text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:text-gray-300 font-semibold dark:bg-blue-800 dark:hover:bg-blue-900"
            >
              Take me back home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default NotFound;
