import { toggleSidebar } from "@/features/toggleSidebar/toggleSidebarSlice";
import { useDispatch } from "react-redux";
export const AdminHeader = ({ title }) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full flex justify-start items-center space-x-2 bg-gray-50 px-2 dark:bg-dark-light darkText py-2">
      <button
        aria-label="sidebar menu"
        onClick={() => dispatch(toggleSidebar())}
        className="lg:hidden"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
  );
};
