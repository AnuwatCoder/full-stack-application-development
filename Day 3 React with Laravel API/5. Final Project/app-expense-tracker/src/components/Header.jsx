import { logout } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link
            to=""
            href="https://flowbite.com"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Expense Tracker System
            </span>
          </Link>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <button
              onClick={handleLogout}
              className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
