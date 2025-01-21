import { toggleSidebar } from "@/features/toggleSidebar/toggleSidebarSlice";
import { useAppDispatch } from "@/hooks";
import { logout } from "@/services/auth/auth";
import { Icons } from "@/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
export const Sidebar = ({
  menus,
  profile_percentage,
  first_name,
  middle_name,
  last_name,
  email,
  applicationTotal,
  tourTotal,
  notMovedInTotal,
  workOrderTotal,
}) => {
  const [width, setWidth] = useState(window.innerWidth);
  const SidebarToggle = useDispatch();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className={`${
        isOpen
          ? "fixed inset-0  bg-gray-800 bg-opacity-75 transition-opacity duration-300 z-40 opacity-100 pointer-events-auto"
          : "lg:w-[20%] min-h-screen hidden lg:block py-10 space-y-5 bg-gray-50 px-8 rounded dark:bg-dark-light darkText"
      } `}
      onClick={() => {
        if (isOpen) {
          SidebarToggle(toggleSidebar());
        }
      }}
    >
      <div
        className={`${
          isOpen
            ? "fixed inset-0 bg-white sm:w-80 w-full shadow-lg transform dark:bg-dark-light darkText translate-x-0 transition-transform duration-300 scroll-hide overflow-y-scroll scrollbar-hide"
            : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pt-[100px] p-7 lg:p-0 lg:pt-0">
          <button
            onClick={() => SidebarToggle(toggleSidebar())}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 mt-[80px] lg:hidden"
          >
            <Icons.Close className="text-4xl" />
          </button>
          <div className="space-x-3 ">
            {/* <img className="w-[40px]" src={Avatar} alt="avatar" /> */}
            <div className="space-y-2 text-base xl:text-base lg:text-xs">
              {first_name && (
                <h5 className="font-medium">
                  {first_name} {last_name}
                </h5>
              )}
              {/* <h5 className="text-xs font-light">Id: 453211</h5> */}
              <p className="px-0 xl:text-sm text-xs font-medium overflow-hidden overflow-ellipsis whitespace-normal break-words xl:break-normal">
                {email}
              </p>
              {profile_percentage >= 0 ? (
                <div className="flex justify-start items-center space-x-2 w-full text-xs xl:text-sm">
                  <span>Profile Completed:</span>
                  <span className="font-medium">{profile_percentage}%</span>
                </div>
              ) : null}
            </div>
          </div>
          <hr className="w-full mx-auto border-t-2 border-gray-300 my-6 dark:border-gray-800" />
          <ul className="flex flex-col gap-3 text-base">
            {menus.map((menu) => {
              {
                return (
                  <li
                    key={menu.label}
                    className={` ${
                      location.pathname === menu.path ? "text-blue-600" : ""
                    }`}
                    onClick={() => {
                      if (width <= 1024) {
                        SidebarToggle(toggleSidebar());
                      } else {
                        null;
                      }
                    }}
                  >
                    <NavLink key={menu.label} to={menu.path}>
                      <div className=" flex items-center gap-3 xl:text-base lg:text-xs text-base pb-2">
                        {menu.icon} {/* Render icon */}
                        {menu.label}{" "}
                        {tourTotal > 0 &&
                          menu.path === "/propertyadmin/tour" && (
                            <span className="bg-red-600 px-2 py-1 text-white rounded-full text-xs xl:text-sm">
                              {tourTotal}
                            </span>
                          )}
                        {applicationTotal > 0 &&
                          menu.path === "/propertyadmin/applications" && (
                            <span className="bg-red-600 px-2 py-1 text-white rounded-full text-xs xl:text-sm">
                              {applicationTotal}
                            </span>
                          )}
                        {notMovedInTotal > 0 &&
                          menu.path === "/propertyadmin/residents" && (
                            <span className="bg-red-600 px-2 py-1 text-white rounded-full text-xs xl:text-sm">
                              {notMovedInTotal}
                            </span>
                          )}
                        {workOrderTotal > 0 &&
                          menu.path === "/propertyadmin/workorder" && (
                            <span className="bg-red-600 px-2 py-1 text-white rounded-full text-xs xl:text-sm">
                              {workOrderTotal}
                            </span>
                          )}
                      </div>
                      <hr className="dark:border-gray-700" />
                    </NavLink>
                  </li>
                );
              }
            })}
          </ul>
          <p>
            <button
              className="w-full pt-4 "
              onClick={() => {
                Swal.fire({
                  title: "Are You Sure?",
                  showDenyButton: true,
                  confirmButtonText: "Ok",
                  denyButtonText: `Cancel`,
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    dispatch(logout());
                  }
                });
              }}
            >
              <div className=" flex items-center gap-3 xl:text-base text-base lg:text-xs pb-2">
                <span>
                  <Icons.logout className="w-5 h-5" />
                </span>
                Logout
              </div>
              <hr className="dark:border-gray-700" />
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
